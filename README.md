# RHOAI UXD Prototypes

## Introduction

This repository contains code-based UX prototypes that are used to inform future experiences we build for Red Hat OpenShift AI (RHOAI).

This project is built with **Vite**, **React**, **TypeScript**, and **PatternFly** components, providing a modern development experience with fast hot module replacement and optimized production builds.

## Notes

* This repo contains internal-only context and forward-looking roadmap items and should not be cloned to GitHub or other public locations.
* In a future release (TBD) we may switch to using the real RHOAI Dashboard codebase [here](https://github.com/opendatahub-io/odh-dashboard) instead.

## Quick-start

```bash
git clone <repository-url>
cd rhoai-feature-stores
npm install
npm run dev
```

## Development scripts

```sh
# Install development/build dependencies
npm install

# Start the development server (Vite)
npm run dev

# Run a production build (outputs to "dist" dir)
npm run build

# Preview production build locally
npm run preview

# Run the linter
npm run lint
```

## Configurations

* [TypeScript Config](./tsconfig.json)
* [Vite Config](./vite.config.ts)
* [Editor Config](./.editorconfig) (if present)

## Asset imports

### Raster images

You can import images directly in your React components:

```js
import imgSrc from './assets/images/example.png';
<img src={imgSrc} alt="Example" />
```

### Vector images (SVG)

Vite supports importing SVG files directly:

```js
import logo from './assets/images/logo.svg';
<img src={logo} alt="Logo" />
```

You can also inline SVG content if needed.

## Code quality tools

* To keep our code formatting in check, we use [prettier](https://github.com/prettier/prettier)
* To ensure code styles remain consistent, we use [eslint](https://eslint.org/)
* For TypeScript type checking, we use the TypeScript compiler

## Environment configuration

This project uses Vite's built-in environment variable support. Create a `.env` file in the root directory with your key-value pairs:

```sh
VITE_API_URL=http://api.example.com
VITE_FEATURE_FLAG=true
```

With that in place, you can use the values in your code like `console.log(import.meta.env.VITE_API_URL);`

**Note:** Environment variables must be prefixed with `VITE_` to be exposed to client-side code.

## Prototype Appearance Configuration

The prototype supports configurable appearance settings to prepare it for different contexts (e.g., user research, demos). Create a `.env` file in the root directory with the following options:

```sh
# Use generic "AI Platform" text instead of branded logo
VITE_GENERIC_LOGO=true

# Hide the orange "UXD PROTOTYPE" banner
VITE_PROTOTYPE_BAR=false

# Set default fidelity mode
VITE_DEFAULT_FIDELITY=low
```

### Available Options:

**VITE_GENERIC_LOGO**
- `true`: Shows "AI Platform" as text (generic, unbranded)
- `false` (default): Shows the branded product logo

**VITE_PROTOTYPE_BAR**
- `true` (default): Shows the orange "UXD PROTOTYPE" banner with fidelity controls
- `false`: Hides the banner completely

**VITE_DEFAULT_FIDELITY**
- `high` (default): Starts with high fidelity mode
- `low`: Starts with low fidelity mode
- Note: URL query parameter `?fidelity=low` or `?fidelity=high` will override this setting

You can use these independently or together depending on your needs:
- For user research: Set `VITE_GENERIC_LOGO=true`, `VITE_PROTOTYPE_BAR=false`, and optionally `VITE_DEFAULT_FIDELITY=low`
- For internal demos: Keep defaults or customize as needed

## Designer setup

[Video Here]

[Instructions Here]
