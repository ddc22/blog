---
title: 'WordPress.com Plans Page Redesign'
description: A conversion-optimized component system for WordPress.com's plans selection and purchase flow, leading to significant improvements in user experience and business metrics.
publishDate: 'Nov 22 2021'
seo:
  image:
    src: '/wordpress-plans-pricing-grid.jpg'
    alt: WordPress.com plans page interface
---

![Project preview](/wordpress-plans-pricing-grid.jpg)

**Project Overview:**
As part of the WordPress.com Growth team at Automattic, I led the redesign of the plans page—a critical conversion point where users select and purchase WordPress.com subscriptions. This project involved creating a component-based UI system that could accommodate high-velocity product changes while providing a clear, user-friendly experience.

## Objectives

1. Create a more intuitive plans selection interface to improve conversion rates
2. Develop a flexible component architecture that could adapt to frequent product changes
3. Reduce support tickets related to plan selection confusion
4. Implement data-driven optimization through A/B testing

## Features

1. **Component-Based UI System:**
   - Architected an intent-based React/Redux component system that separated presentation from business logic
   - Created reusable components that could be easily reconfigured as plans and features changed
   - Implemented Emotion CSS-in-JS for styled components with consistent theming

2. **Dynamic Plan Comparison:**
   - Developed interactive comparison tools that highlighted differences between plan tiers
   - Created visual indicators for recommended plans based on user needs
   - Implemented feature tooltips and expandable sections for detailed information

3. **Optimized Purchase Flow:**
   - Streamlined the steps between plan selection and checkout
   - Added contextual upsell opportunities based on user selection patterns
   - Implemented form validation and error prevention to reduce purchase friction

4. **A/B Testing Framework:**
   - Created a system for testing variations of page layouts, copy, and pricing presentation
   - Integrated analytics to measure impact on conversion rates and user engagement
   - Established a process for rolling out successful variants to all users

## Technology Stack

- **Frontend:** ReactJS, Redux for state management
- **Styling:** Emotion CSS-in-JS
- **Testing:** Jest, React Testing Library
- **Analytics:** Custom event tracking and funnel analysis

## Outcome

The redesigned plans page significantly improved the user experience and business metrics, leading to a 47% improvement in purchase conversions and a 50% reduction in support tickets related to plan selection. The component architecture proved highly adaptable, allowing the team to quickly implement product changes and optimization insights without major refactoring.