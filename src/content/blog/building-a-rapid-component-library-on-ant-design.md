---
title: Building a Rapid Component Library on Ant Design
excerpt: How to leverage Ant Design while maintaining control over your codebase. A practical pattern using atomic design, wrapper components, and ESLint enforcement that scales with your team.
publishDate: 'Jan 10 2026'
tags:
  - React
  - Ant Design
  - Architecture
  - Frontend
seo:
  image:
    src: '/ant-design-library.jpg'
    alt: Component library architecture diagram
---

When building a frontend for an enterprise product, you face a classic tradeoff: build your own component library from scratch (slow, expensive) or adopt an existing one like Ant Design (fast, but you lose control). After mentoring 10+ developers and scaling a frontend team, I've landed on a pattern that gives you the best of both worlds.

## The Core Pattern

The idea is simple: never import Ant Design directly in feature code. Instead, create a thin wrapper layer using atomic design principles:

```
@av/components/
├── atoms/
│   ├── Alert/
│   ├── Button/
│   ├── Card/
│   ├── Input/
│   ├── Modal/
│   └── Select/
├── molecules/
│   ├── DatePicker/
│   ├── Dropdown/
│   └── Descriptions/
└── organisms/
    └── ...
```

Each component either wraps the Ant Design equivalent with customizations, or simply re-exports it unchanged.

## Why Wrap Components?

Wrapping gives you several advantages:

1. **Theming control** - Apply consistent styling via Ant Design's theme tokens without touching feature code
2. **Validation integration** - Inject form validation, error handling, or accessibility features in one place
3. **Future-proofing** - Swap out Ant Design later without rewriting your entire app
4. **AI-generated code quality** - When AI tools generate code, they'll use your wrapped components if you enforce imports correctly

## Example: A Wrapped TextArea Component

Here's a real wrapped component using `antd-style` for theming:

```tsx
// @av/components/atoms/input/TextArea.tsx
import TextArea, { type TextAreaProps as AntdTextAreaProps } from "antd/lib/input/TextArea";
import { createStyles } from "antd-style";

import type { AvE2EProps } from "@av/components/types";

type TextAreaProps = AntdTextAreaProps & AvE2EProps;

const useStyles = createStyles(({ css, token }) => ({
  textArea: css`
    &:hover {
      border-color: ${token.colorLinkHover};
    }
    &:active {
      border-color: ${token.colorLinkActive};
    }
  `,
}));

export function CustomTextArea(props: TextAreaProps) {
  const { testIdPrefix, ...rest } = props;
  const { styles } = useStyles();

  return (
    <TextArea
      className={styles.textArea}
      data-testid={testIdPrefix + "-text-area-input"}
      {...rest}
    />
  );
}
```

This pattern gives you:
- **Custom styling** using Ant Design's theme tokens (`token.colorLinkHover`)
- **E2E test support** via a consistent `testIdPrefix` prop
- **Type safety** by extending the original Ant Design props

For components that don't need customization yet, just re-export:

```tsx
// @av/components/atoms/Alert/index.tsx
export { Alert, type AlertProps } from 'antd';
```

This lets you add customizations later without changing any imports in feature code.

## Enforcing the Pattern with ESLint

The pattern only works if you enforce it. Use ESLint's `no-restricted-imports` rule to block direct Ant Design imports:

```js
// eslint-restricted-imports.js
export const CUSTOM_COMPONENTS = {
  Alert: { from: "antd", to: "@av/components/atoms/Alert" },
  Button: { from: "antd", to: "@av/components/atoms/Button" },
  Card: { from: "antd", to: "@av/components/atoms/Card" },
  Form: { from: "antd", to: "@av/components/atoms/Form" },
  Input: { from: "antd", to: "@av/components/atoms/input/Input" },
  Modal: { from: "antd", to: "@av/components/atoms/Modal" },
  Select: { from: "antd", to: "@av/components/atoms/Select" },
  DatePicker: { from: "antd", to: "@av/components/molecules/DatePicker" },
  Dropdown: { from: "antd", to: "@av/components/molecules/Dropdown" },
  // ... add more as needed
};

const ruleTemplate = {
  customComponent: (importName, fromLibrary, customPath) => ({
    name: fromLibrary,
    importNames: [importName],
    message: `
🚫 Don't import ${importName} from '${fromLibrary}'!

❌ Wrong: import { ${importName} } from '${fromLibrary}';
✅ Correct: import { ${importName} } from '${customPath}';

💡 Use our custom ${importName} component with consistent styling and theming.`,
  }),
};

export function getRestrictedImportRules() {
  return Object.entries(CUSTOM_COMPONENTS).map(([componentName, config]) =>
    ruleTemplate.customComponent(componentName, config.from, config.to)
  );
}
```

Then in your ESLint config:

```js
// eslint.config.js
import { getRestrictedImportRules } from './eslint-restricted-imports.js';

export default [
  {
    rules: {
      'no-restricted-imports': ['error', {
        paths: getRestrictedImportRules(),
      }],
    },
  },
];
```

When someone tries to import directly from Ant Design, they get a clear error with the correct path:

```
❌ Wrong: import { Select } from 'antd';
✅ Correct: import { Select } from '@av/components/atoms/Select';
```

## Extending the Pattern

Once you have the infrastructure, you can enforce other conventions too:

```js
// Enforce custom dayjs with plugins
export const LIBRARY_RESTRICTIONS = {
  dayjs: { from: "dayjs", to: "@av/config/extended-dayjs" },
};

// Enforce custom test utils
export const TESTING_LIBRARY_IMPORTS = {
  render: "@av/tooling/testing/test-utils",
};

// Block React default imports
export const REACT_RESTRICTIONS = {
  react: {
    restrictDefaultImport: true,
    message: "Import React using named imports instead of default import",
  },
};
```

## Why This Worked for Us

- **Team moved fast** - Developers used familiar Ant Design patterns without learning a new API
- **Consistent styling** - Theme changes propagate automatically via Ant Design's token system
- **Better AI code** - Copilot and other tools learned to use our wrapped imports
- **Multi-module ready** - The component library became a shared package across multiple apps

The key insight is that you don't need to reinvent the wheel. You just need a thin abstraction layer and the discipline to enforce it. ESLint does the enforcement for you.
