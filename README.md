<div align="center">
  <img src="assets/header_v01.png" alt="DGA Icons Header" width="100%" />

  <br />

  [![Website](https://img.shields.io/badge/Website-Explore_Icons-success.svg?style=flat-square)](https://alrkiyan.github.io/dga-icons/)
  [![npm version](https://img.shields.io/npm/v/@dga-icons/react.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/react)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
  [![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by/4.0/)
  [![Figma](https://img.shields.io/badge/Figma-Community-pink.svg?style=flat-square&logo=figma)](https://www.figma.com/community/file/1392269191144731080)
  [![Updated](https://img.shields.io/badge/Updated-14%2F7%2F2026-green.svg?style=flat-square)](#)

  **A comprehensive, fully tree-shakable icon library with 4,354 beautifully crafted icons across 9 distinct styles — for React, Vue, Svelte, Solid, Preact, React Native, Astro, and vanilla JS.**

  ### 🌐 [Explore & Search All Icons Here](https://alrkiyan.github.io/dga-icons/)
</div>

---

## 📦 Packages

| Package | Version | Links |
| :--- | :--- | :--- |
| <img src="assets/packages_logos/react.svg" width="24" height="24" valign="middle" /> **React** | [![npm](https://img.shields.io/npm/v/@dga-icons/react.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/react) | [Source](https://github.com/alrkiyan/dga-icons/tree/main/packages/react) |
| <img src="assets/packages_logos/vue.svg" width="24" height="24" valign="middle" /> **Vue** | [![npm](https://img.shields.io/npm/v/@dga-icons/vue.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/vue) | [Source](https://github.com/alrkiyan/dga-icons/tree/main/packages/vue) |
| <img src="assets/packages_logos/svelte.svg" width="24" height="24" valign="middle" /> **Svelte** | [![npm](https://img.shields.io/npm/v/@dga-icons/svelte.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/svelte) | [Source](https://github.com/alrkiyan/dga-icons/tree/main/packages/svelte) |
| <img src="assets/packages_logos/solid.svg" width="24" height="24" valign="middle" /> **Solid** | [![npm](https://img.shields.io/npm/v/@dga-icons/solid.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/solid) | [Source](https://github.com/alrkiyan/dga-icons/tree/main/packages/solid) |
| <img src="assets/packages_logos/preact.svg" width="24" height="24" valign="middle" /> **Preact** | [![npm](https://img.shields.io/npm/v/@dga-icons/preact.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/preact) | [Source](https://github.com/alrkiyan/dga-icons/tree/main/packages/preact) |
| <img src="assets/packages_logos/react-native.svg" width="24" height="24" valign="middle" /> **React Native** | [![npm](https://img.shields.io/npm/v/@dga-icons/react-native.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/react-native) | [Source](https://github.com/alrkiyan/dga-icons/tree/main/packages/react-native) |
| <img src="assets/packages_logos/astro.svg" width="24" height="24" valign="middle" /> **Astro** | [![npm](https://img.shields.io/npm/v/@dga-icons/astro.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/astro) | [Source](https://github.com/alrkiyan/dga-icons/tree/main/packages/astro) |
| <img src="assets/packages_logos/js.svg" width="24" height="24" valign="middle" /> **Vanilla JS** | [![npm](https://img.shields.io/npm/v/@dga-icons/js.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/js) | [Source](https://github.com/alrkiyan/dga-icons/tree/main/packages/js) |
| <img src="assets/packages_logos/svg.svg" width="24" height="24" valign="middle" /> **Raw SVG** | [![npm](https://img.shields.io/npm/v/@dga-icons/svg.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/svg) | [Source](https://github.com/alrkiyan/dga-icons/tree/main/packages/svg) |

---

## 🚀 Features

- **Massive Collection**: 4,354 unique icons for almost every use case.
- **9 Distinct Styles**: `stroke-rounded` (default), `solid-rounded`, `bulk-rounded`, `duotone-rounded`, `twotone-rounded`, and more.
- **Zero Overhead**: Fully tree-shakable (ESM). You only bundle the icons you actually import.
- **Customizable**: Control `size`, `color`, and `strokeWidth` easily via React props.
- **TypeScript First**: Full type safety and autocompletion for a flawless developer experience.

## 📦 Installation

> **Install 0.1.1 or newer.** 0.1.0 cannot be installed at all — its manifest kept
> an internal `workspace:*` dependency, so npm rejects it with `EUNSUPPORTEDPROTOCOL`.

Install the library using your favorite package manager:

```bash
# React
npm install @dga-icons/react

# Vue
npm install @dga-icons/vue

# Svelte
npm install @dga-icons/svelte

# Solid
npm install @dga-icons/solid

# Preact
npm install @dga-icons/preact

# React Native
npm install @dga-icons/react-native react-native-svg

# Astro
npm install @dga-icons/astro

# Vanilla JS
npm install @dga-icons/js

# Raw SVG
npm install @dga-icons/svg
```

## 💻 Usage

By default, importing from any framework package gives you the `stroke-rounded` style. You can import other styles by appending the style name (e.g., `@dga-icons/react/solid-rounded`).

### React

```tsx
import { Home01, ShoppingCart01 } from '@dga-icons/react';
import { Camera } from '@dga-icons/react/solid-rounded';

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Home01 />
      <ShoppingCart01 size={32} color="blue" strokeWidth={2} />
      <Camera />
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { Home01, ShoppingCart01 } from '@dga-icons/vue';
import { Camera } from '@dga-icons/vue/solid-rounded';
</script>

<template>
  <div style="display: flex; gap: 16px;">
    <Home01 />
    <ShoppingCart01 :size="32" color="blue" :strokeWidth="2" />
    <Camera />
  </div>
</template>
```

### Svelte

```svelte
<script>
import { Home01, ShoppingCart01 } from '@dga-icons/svelte';
import { Camera } from '@dga-icons/svelte/solid-rounded';
</script>

<!-- Using Svelte action (recommended for reactivity) -->
<div use:Home01></div>
<div use:ShoppingCart01={{ size: 32, color: 'blue' }}></div>

<!-- Or using the {@html} block -->
<div>
  {@html Camera({ size: 24 })}
</div>
```

### Solid JS

```tsx
import { Home01, ShoppingCart01 } from '@dga-icons/solid';
import { Camera } from '@dga-icons/solid/solid-rounded';

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Home01 />
      <ShoppingCart01 size={32} color="blue" strokeWidth={2} />
      <Camera />
    </div>
  );
}
```

### Preact

```tsx
import { Home01, ShoppingCart01 } from '@dga-icons/preact';
import { Camera } from '@dga-icons/preact/solid-rounded';

export function App() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Home01 />
      <ShoppingCart01 size={32} color="blue" strokeWidth={2} />
      <Camera />
    </div>
  );
}
```

### React Native

```tsx
import { View } from 'react-native';
import { Home01, ShoppingCart01 } from '@dga-icons/react-native';
import { Camera } from '@dga-icons/react-native/solid-rounded';

export default function App() {
  return (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <Home01 color="black" />
      <ShoppingCart01 size={32} color="blue" strokeWidth={2} />
      <Camera />
    </View>
  );
}
```

### Astro

```astro
---
import { Home01, ShoppingCart01 } from '@dga-icons/astro';
import { Camera } from '@dga-icons/astro/solid-rounded';
---

<div style="display: flex; gap: 16px;">
  <Home01 />
  <ShoppingCart01 size={32} color="blue" strokeWidth={2} />
  <Camera />
</div>
```

### Vanilla JS

The Vanilla JS package exposes factory functions that return ready-to-mount `SVGElement` nodes.

```javascript
import { Home01, ShoppingCart01 } from '@dga-icons/js';
import { Camera } from '@dga-icons/js/solid-rounded';

// 1. Generate elements
const homeIcon = Home01();
const cartIcon = ShoppingCart01({ size: 32, color: 'blue', strokeWidth: 2 });
const cameraIcon = Camera();

// 2. Append to DOM
document.body.appendChild(homeIcon);
document.body.appendChild(cartIcon);
document.body.appendChild(cameraIcon);
```

### Raw SVG

The `@dga-icons/svg` package simply contains all the `.svg` files organized by style. You can use them directly in bundlers like Webpack/Vite or copy them using build scripts.

```javascript
// Example using Vite's static asset import
import homeIconPath from '@dga-icons/svg/stroke-rounded/home-01.svg';

const img = document.createElement('img');
img.src = homeIconPath;
```

---

## 🛠️ Development

```bash
pnpm install
pnpm generate       # regenerate every package's sources from icons/
pnpm build          # build all packages (serial — see below)
pnpm verify:packs   # assert every package is installable before releasing
```

`pnpm build` runs one package at a time on purpose. Type generation spans 4,354
icons across 9 styles per package, and parallel workers each take a multi-GB heap
— enough to get a 16 GB CI runner OOM-killed. Expect roughly 40 minutes for a
full build.

### Releasing

Bump the version in every `packages/*/package.json`, then push to `main`. The
workflow builds, runs `verify:packs`, and publishes whatever version is not on
the registry yet. It needs an `NPM_TOKEN` repository secret.

**Publish with `pnpm publish`, never `npm publish`.** Packages depend on
`@dga-icons/core` via `workspace:^`, and only pnpm rewrites that to a real version
range at pack time. `npm publish` ships the literal `workspace:^` and the package
becomes impossible to install — that is exactly what happened to 0.1.0.
`verify:packs` exists to catch this, and CI will not publish if it fails.

---

## 🤝 Credits & Acknowledgements

This library was made possible by the incredible design work of the **Digital Government Authority (DGA)**. The library itself — the packages, build tooling, and documentation — is developed and maintained by **Saleh Alrkiyan**.

<div align="center">
  <a href="https://dga.gov.sa">
    <img src="assets/DGA_logo.png" alt="DGA Logo" height="80" style="margin: 0 20px;" />
  </a>
  <a href="https://isaleh.dev">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="assets/saleh-logo-inverse.svg" />
      <img src="assets/saleh-logo-ink.svg" alt="Saleh Alrkiyan Logo" height="60" style="margin: 0 20px;" />
    </picture>
  </a>
</div>

<br/>

* **DGA هيئة الحكومة الرقمية**: [https://dga.gov.sa](https://dga.gov.sa)
* **Saleh Alrkiyan صالح الركيان**: [https://isaleh.dev](https://isaleh.dev)
* **Original Figma File الملف الأصلي للأيقونات**: [Figma Community](https://www.figma.com/community/file/1392269191144731080)

<div align="center">
  <h3>صنع بـ ❤️ صالح الركيان <br/> Made by Saleh Alrkiyan</h3>
  <p><i>Updated: 14/7/2026</i></p>
</div>

---

## 📄 License

This repository uses dual-licensing based on the type of resource:

* **Source Code (`MIT`)**: All scripts, React components, and build tools are licensed under the **[MIT License](LICENSE)** to ensure legal protection and easy integration by other developers.
* **Assets & Documentation (`CC BY 4.0`)**: All documentation, original SVGs, images, visual assets, and textual content are licensed under **[Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/)**.
