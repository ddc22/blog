# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog and portfolio website built with Astro.js, featuring a minimal design focused on technical content. The site is deployed at https://ddc-software.dev and showcases software engineering posts and projects.

## Architecture

- **Framework**: Astro.js with TypeScript
- **Styling**: Tailwind CSS v4 with custom typography plugin
- **Content Management**: Astro content collections with schema validation
- **Content Types**: Blog posts, project portfolio items, and static pages
- **Deployment**: Static site generation optimized for performance

### Key Directories

- `src/content/`: Content collections (blog/, projects/, pages/) with frontmatter schemas
- `src/data/site-config.ts`: Central site configuration including navigation, hero section, and social links
- `src/components/`: Reusable Astro components for UI elements
- `src/pages/`: File-based routing with dynamic pagination support
- `src/utils/`: Helper functions for data processing and common operations

### Content Collections Schema

The site uses strongly-typed content collections defined in `src/content.config.ts`:
- **Blog**: Posts with tags, featured status, SEO metadata
- **Projects**: Portfolio items with descriptions and publish dates  
- **Pages**: Static content pages (About, Contact, Terms)

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server at localhost:4321 |
| `npm run build` | Build production site to ./dist/ |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Content Management

- Blog posts are written in Markdown/MDX in `src/content/blog/`
- Project entries go in `src/content/projects/`
- All content requires proper frontmatter matching the schema in `content.config.ts`
- Images are stored in `public/` and referenced with absolute paths
- Site-wide configuration is centralized in `src/data/site-config.ts`

## Styling Architecture

- Uses Tailwind CSS v4 with Vite plugin integration
- Global styles in `src/styles/global.css`
- Dark/light mode toggle supported throughout
- Typography optimized with @tailwindcss/typography plugin
- Font loading via @fontsource-variable (Inter and Newsreader)