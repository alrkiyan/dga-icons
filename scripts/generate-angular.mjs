import { readdir, mkdir, writeFile, stat } from 'fs/promises';
import { join, resolve } from 'path';
import { toPascalCase, ALL_STYLES, DEFAULT_STYLE } from './utils.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const ICONS_DIR = join(ROOT, 'icons');
const ANGULAR_SRC = join(ROOT, 'packages', 'angular', 'src');

async function main() {
  console.log('🔺  Generating @dga-icons/angular source files...\n');

  const startTime = Date.now();

  await generateForStyle(DEFAULT_STYLE, true);

  for (const style of ALL_STYLES) {
    if (style !== DEFAULT_STYLE) {
      await generateForStyle(style, false);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✅ @dga-icons/angular generation complete in ${elapsed}s`);
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
  console.log(`  🔺  ${style}: ${files.length} components`);

  const outDir = isDefault
    ? join(ANGULAR_SRC, 'icons')
    : join(ANGULAR_SRC, style, 'icons');

  await mkdir(outDir, { recursive: true });

  const iconNames = [];

  for (const file of files) {
    const iconName = file.replace('.svg', '');
    const componentName = toPascalCase(iconName) + 'Icon';

    const coreImportPath = isDefault
      ? `@dga-icons/core`
      : `@dga-icons/core/${style}`;

    const source = generateComponentSource(
      componentName,
      iconName,
      coreImportPath,
      isDefault
    );

    await writeFile(join(outDir, `${componentName}.ts`), source);
    iconNames.push({ iconName, componentName });
  }

  const indexDir = isDefault ? ANGULAR_SRC : join(ANGULAR_SRC, style);
  const indexContent = generateBarrelIndex(iconNames, isDefault);
  
  // For Angular APF, primary entry is public-api.ts
  const indexFileName = 'public-api.ts';
  await writeFile(join(indexDir, indexFileName), indexContent);

  // If it's a secondary entry point, create package.json for ng-packagr
  if (!isDefault) {
    await writeFile(
      join(indexDir, 'package.json'),
      JSON.stringify({ ngPackage: { lib: { entryFile: 'public-api.ts' } } }, null, 2)
    );
  }
}

function generateComponentSource(
  componentName,
  iconName,
  coreImportPath,
  isDefault
) {
  const baseIconPath = isDefault ? '../base-icon' : '../../base-icon';

  return `import { Component, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { ${componentName.replace('Icon', '')} as iconData } from '${coreImportPath}';
import { DgaBaseIcon } from '${baseIconPath}';

@Component({
  selector: 'dga-${iconName}',
  standalone: true,
  template: ''
})
export class ${componentName} extends DgaBaseIcon {
  protected override iconName = '${iconName}';
  protected override iconData = iconData;
  
  constructor(el: ElementRef, renderer: Renderer2, @Inject(PLATFORM_ID) platformId: Object) {
    super(el, renderer, platformId);
  }
}
`;
}

function generateBarrelIndex(iconNames, isDefault) {
  const lines = [];

  if (isDefault) {
    lines.push("export * from './base-icon';");
  }

  for (const { componentName } of iconNames) {
    lines.push(
      `export * from './icons/${componentName}';`
    );
  }

  lines.push('');
  return lines.join('\n');
}

main().catch((err) => {
  console.error('❌ Generation failed:', err);
  process.exit(1);
});
