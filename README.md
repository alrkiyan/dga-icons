<div align="center">
  <img src="assets/header_v01.png" alt="DGA Icons Header" width="100%" />

  <br />

  [![Website](https://img.shields.io/badge/Website-Explore_Icons-success.svg?style=flat-square)](https://rumanagency.github.io/dga-icons/)
  [![npm version](https://img.shields.io/npm/v/@dga-icons/react.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/react)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
  [![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by/4.0/)
  [![Figma](https://img.shields.io/badge/Figma-Community-pink.svg?style=flat-square&logo=figma)](https://www.figma.com/community/file/1392269191144731080)
  [![Updated](https://img.shields.io/badge/Updated-28%2F3%2F2026-green.svg?style=flat-square)](#)

  **A comprehensive, fully tree-shakable React icon library with 4,354 beautifully crafted icons across 9 distinct styles.**

  ### 🌐 [Explore & Search All Icons Here](https://rumanagency.github.io/dga-icons/)
</div>

---

## 📦 Packages

| Package | Version | Links |
| :--- | :--- | :--- |
| <img src="assets/packages_logos/react.svg" width="24" height="24" valign="middle" /> **React** | [![npm](https://img.shields.io/npm/v/@dga-icons/react.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/react) | [Source](https://github.com/rumanagency/dga-icons/tree/main/packages/react) |
| <img src="assets/packages_logos/vue.svg" width="24" height="24" valign="middle" /> **Vue** | [![npm](https://img.shields.io/npm/v/@dga-icons/vue.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/vue) | [Source](https://github.com/rumanagency/dga-icons/tree/main/packages/vue) |
| <img src="assets/packages_logos/svelte.svg" width="24" height="24" valign="middle" /> **Svelte** | SOON | SOON |
| <img src="assets/packages_logos/solid.svg" width="24" height="24" valign="middle" /> **Solid** | SOON | SOON |
| <img src="assets/packages_logos/preact.svg" width="24" height="24" valign="middle" /> **Preact** | SOON | SOON |
| <img src="assets/packages_logos/angular.svg" width="24" height="24" valign="middle" /> **Angular** | SOON | SOON |
| <img src="assets/packages_logos/react-native.svg" width="24" height="24" valign="middle" /> **React Native** | SOON | SOON |
| <img src="assets/packages_logos/astro.svg" width="24" height="24" valign="middle" /> **Astro** | SOON | SOON |
| <img src="assets/packages_logos/js.svg" width="24" height="24" valign="middle" /> **Vanilla JS** | [![npm](https://img.shields.io/npm/v/@dga-icons/js.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/js) | [Source](https://github.com/rumanagency/dga-icons/tree/main/packages/js) |
| <img src="assets/packages_logos/svg.svg" width="24" height="24" valign="middle" /> **Raw SVG** | SOON | SOON |

---

## 🚀 Features

- **Massive Collection**: 4,354 unique icons for almost every use case.
- **9 Distinct Styles**: `stroke-rounded` (default), `solid-rounded`, `bulk-rounded`, `duotone-rounded`, `twotone-rounded`, and more.
- **Zero Overhead**: Fully tree-shakable (ESM). You only bundle the icons you actually import.
- **Customizable**: Control `size`, `color`, and `strokeWidth` easily via React props.
- **TypeScript First**: Full type safety and autocompletion for a flawless developer experience.

## 📦 Installation

Install the library using your favorite package manager:

```bash
# React
npm install @dga-icons/react

# Vue
npm install @dga-icons/vue

# Vanilla JS
npm install @dga-icons/js
```

## 💻 Usage

### Usage with React

By default, importing from `@dga-icons/react` gives you the `stroke-rounded` style.

```tsx
import { Home01, ShoppingCart01 } from '@dga-icons/react';
import { Camera } from '@dga-icons/react/solid-rounded'; // using a different style

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

### Usage with Vue

By default, importing from `@dga-icons/vue` gives you the `stroke-rounded` style.

```vue
<script setup>
import { Home01, ShoppingCart01 } from '@dga-icons/vue';
import { Camera } from '@dga-icons/vue/solid-rounded'; // using a different style
</script>

<template>
  <div style="display: flex; gap: 16px;">
    <Home01 />
    <ShoppingCart01 :size="32" color="blue" :strokeWidth="2" />
    <Camera />
  </div>
</template>
```

### Usage with Vanilla JS

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

---

## 🤝 Credits & Acknowledgements

This library was made possible by the incredible design work of the **Digital Government Authority (DGA)** and the development efforts of **Ruman Agency**.

<div align="center">
  <a href="https://dga.gov.sa">
    <img src="assets/DGA_logo.png" alt="DGA Logo" height="80" style="margin: 0 20px;" />
  </a>
  <a href="https://ruman.sa">
    <img src="assets/Ruman_logo.svg" alt="Ruman Agency Logo" height="80" style="margin: 0 20px;" />
  </a>
</div>

<br/>

* **DGA هيئة الحكومة الرقمية**: [https://dga.gov.sa](https://dga.gov.sa)
* **Ruman Agency وكالة رمان**: [https://ruman.sa](https://ruman.sa)
* **Original Figma File الملف الأصلي للأيقونات**: [Figma Community](https://www.figma.com/community/file/1392269191144731080)

<div align="center">
  <h3>صنع بـ ❤️ صالح <br/> Made by Saleh</h3>
  <p><i>Updated: 28/3/2026</i></p>
</div>

---

## 📄 License

This repository uses dual-licensing based on the type of resource:

* **Source Code (`MIT`)**: All scripts, React components, and build tools are licensed under the **[MIT License](LICENSE)** to ensure legal protection and easy integration by other developers.
* **Assets & Documentation (`CC BY 4.0`)**: All documentation, original SVGs, images, visual assets, and textual content are licensed under **[Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/)**.
