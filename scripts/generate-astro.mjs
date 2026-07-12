import { readdir, mkdir, writeFile, stat } from 'fs/promises';
import { join, resolve } from 'path';
import { toPascalCase, ALL_STYLES, DEFAULT_STYLE } from './utils.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const ICONS_DIR = join(ROOT, 'icons');
const ASTRO_SRC = join(ROOT, 'packages', 'astro', 'src');

async function main() {
  console.log('🚀  Generating @dga-icons/astro source files...\n');

  const startTime = Date.now();

  await generateForStyle(DEFAULT_STYLE, true);

  for (const style of ALL_STYLES) {
    if (style !== DEFAULT_STYLE) {
      await generateForStyle(style, false);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✅ @dga-icons/astro generation complete in ${elapsed}s`);
}

async function generateForStyle(style, isDefault) {
  const styleDir = join(ICONS_DIR, style);

  try {
    await stat(styleDir);
  } catch {
    console.log(`  ⚠️  Skipping ${style} — directory not found`);
    return;
  }

  const files = (await readdir(styleDir)).filter((f) => f.endsWith('.svg'));
  console.log(`  🚀  ${style}: ${files.length} components`);

  const outDir = isDefault
    ? join(ASTRO_SRC, 'icons')
    : join(ASTRO_SRC, style, 'icons');

  await mkdir(outDir, { recursive: true });

  const iconNames = [];

  for (const file of files) {
    const iconName = file.replace('.svg', '');
    const componentName = toPascalCase(iconName);

    const coreImportPath = isDefault
      ? `@dga-icons/core`
      : `@dga-icons/core/${style}`;

    const source = generateComponentSource(
      componentName,
      iconName,
      coreImportPath
    );

    await writeFile(join(outDir, `${componentName}.astro`), source);
    iconNames.push({ iconName, componentName });
  }

  const indexDir = isDefault ? ASTRO_SRC : join(ASTRO_SRC, style);
  const indexContent = generateBarrelIndex(iconNames, isDefault);
  await writeFile(join(indexDir, 'index.ts'), indexContent);
}

function generateComponentSource(
  componentName,
  iconName,
  coreImportPath
) {
  return `---
import { ${componentName} as iconData } from '${coreImportPath}';

interface Props {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  class?: string;
  [key: string]: any;
}

const {
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  absoluteStrokeWidth,
  class: className,
  ...rest
} = Astro.props;

const sw = absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth;

const children = iconData
  .map(([tag, attrs]) => {
    const attrStr = Object.entries(attrs)
      .map(([k, v]) => {
        const kebab = k.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        return \`\${kebab}="\${v}"\`;
      })
      .join(' ');
    return \`<\${tag} \${attrStr}/>\`;
  })
  .join('');

const cls = ['dga-icon', 'dga-icon-${iconName}', className].filter(Boolean).join(' ');
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width={sw}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={cls}
  {...rest}
  set:html={children}
/>
`;
}

function generateBarrelIndex(iconNames, isDefault) {
  const lines = [];

  if (isDefault) {
    lines.push("export type { IconNode } from '@dga-icons/core';");
    lines.push("export interface IconProps { size?: number | string; color?: string; strokeWidth?: number | string; absoluteStrokeWidth?: boolean; class?: string; [key: string]: any; }");
    lines.push('');
  }

  for (const { componentName } of iconNames) {
    lines.push(
      `export { default as ${componentName} } from './icons/${componentName}.astro';`
    );
  }

  lines.push('');
  return lines.join('\n');
}

main().catch((err) => {
  console.error('❌ Generation failed:', err);
  process.exit(1);
});
