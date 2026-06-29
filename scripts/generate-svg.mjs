import { cp, rm } from 'fs/promises';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const ICONS_DIR = join(ROOT, 'icons');
const SVG_PKG_DIR = join(ROOT, 'packages', 'svg', 'icons');

async function main() {
  console.log('🎨  Generating @dga-icons/svg source files...\n');

  const startTime = Date.now();

  // Clean the target directory first
  await rm(SVG_PKG_DIR, { recursive: true, force: true });

  // Simply copy the entire icons directory to the svg package
  await cp(ICONS_DIR, SVG_PKG_DIR, { recursive: true });

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✅ @dga-icons/svg generation complete in ${elapsed}s`);
}

main().catch((err) => {
  console.error('❌ Generation failed:', err);
  process.exit(1);
});
