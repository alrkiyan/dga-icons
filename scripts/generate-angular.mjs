import { readdir, mkdir, writeFile, stat } from 'fs/promises';
import { join, resolve } from 'path';
import { toPascalCase, ALL_STYLES, DEFAULT_STYLE } from './utils.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const ICONS_DIR = join(ROOT, 'icons');
const ANGULAR_ROOT = join(ROOT, 'packages', 'angular');
const ANGULAR_SRC = join(ANGULAR_ROOT, 'src');

// ng-packagr only discovers secondary entry points in directories at the package
// root, so each non-default style lives in packages/angular/<style>/ rather than
// under src/.
const PACKAGE_NAME = '@dga-icons/angular';

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
    : join(ANGULAR_ROOT, style, 'icons');

  await mkdir(outDir, { recursive: true });

  const iconNames = [];

  for (const file of files) {
    const iconName = file.replace('.svg', '');
    const coreName = toPascalCase(iconName);
    const componentName = coreName + 'Icon';

    const coreImportPath = isDefault
      ? `@dga-icons/core`
      : `@dga-icons/core/${style}`;

    const source = generateComponentSource(
      componentName,
      coreName,
      iconName,
      coreImportPath,
      isDefault
    );

    await writeFile(join(outDir, `${componentName}.ts`), source);
    iconNames.push({ iconName, componentName });
  }

  const indexDir = isDefault ? ANGULAR_SRC : join(ANGULAR_ROOT, style);
  const indexContent = generateBarrelIndex(iconNames, isDefault);
  
  // For Angular APF, primary entry is public-api.ts
  const indexFileName = 'public-api.ts';
  await writeFile(join(indexDir, indexFileName), indexContent);

  // ng-packagr discovers secondary entry points by globbing for ng-package.json
  if (!isDefault) {
    await writeFile(
      join(indexDir, 'ng-package.json'),
      JSON.stringify({ lib: { entryFile: 'public-api.ts' } }, null, 2) + '\n'
    );
  }
}

function generateComponentSource(
  componentName,
  coreName,
  iconName,
  coreImportPath,
  isDefault
) {
  // Secondary entry points reach the shared directive through the primary entry
  // point's package name; a relative path would duplicate it in every bundle.
  const baseIconPath = isDefault ? '../base-icon' : PACKAGE_NAME;

  return `import { Component, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { ${coreName} as iconData } from '${coreImportPath}';
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
