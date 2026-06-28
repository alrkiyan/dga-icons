<div align="center">
  <img src="assets/header_v01.png" alt="DGA Icons Header" width="100%" />

  <br />

  [![npm version](https://img.shields.io/npm/v/@dga-icons/react.svg?style=flat-square)](https://www.npmjs.com/package/@dga-icons/react)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
  [![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by/4.0/)
  [![Figma](https://img.shields.io/badge/Figma-Community-pink.svg?style=flat-square&logo=figma)](https://www.figma.com/community/file/1392269191144731080)
  [![Updated](https://img.shields.io/badge/Updated-28%2F3%2F2026-green.svg?style=flat-square)](#)

  **A comprehensive, fully tree-shakable React icon library with 4,354 beautifully crafted icons across 9 distinct styles.**
</div>

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
npm install @dga-icons/react
# or
yarn add @dga-icons/react
# or
pnpm add @dga-icons/react
```

## 💻 Usage

### Basic Usage

By default, importing from `@dga-icons/react` gives you the `stroke-rounded` style.

```tsx
import { Home01, ShoppingCart01 } from '@dga-icons/react';

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Home01 />
      {/* Customize size, color, and stroke width */}
      <ShoppingCart01 size={32} color="blue" strokeWidth={2} />
    </div>
  );
}
```

### Using Different Styles

You can easily use any of the other 8 styles by appending the style name to the import path. Every style has the exact same 4,354 icons!

```tsx
// Solid Rounded
import { Camera } from '@dga-icons/react/solid-rounded';

// Duotone
import { User } from '@dga-icons/react/duotone-rounded';

// Bulk
import { Settings } from '@dga-icons/react/bulk-rounded';
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
