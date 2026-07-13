import { defineConfig } from 'tsup';
import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Find all style subdirectories that have been generated
const stylesWithContent = [];
const srcDir = join(import.meta.dirname, 'src');

try {
  for (const entry of readdirSync(srcDir)) {
    const entryPath = join(srcDir, entry);
    if (
      statSync(entryPath).isDirectory() &&
      entry !== 'icons' &&
      !entry.startsWith('.') &&
      existsSync(join(entryPath, 'index.ts'))
    ) {
      stylesWithContent.push(entry);
    }
  }
} catch {
  // src dir might not exist yet
}

// Build entry points: main index + each style's index
const entry = {
  index: 'src/index.ts',
};

for (const style of stylesWithContent) {
  entry[`${style}/index`] = `src/${style}/index.ts`;
}

const external = ['vue', '@dga-icons/core'];

export default defineConfig([
  {
    entry,
    format: ['esm'],
    dts: true,
    splitting: true,
    treeshake: true,
    outDir: 'dist/esm',
    clean: true,
    external,
  },
  {
    entry: { index: 'src/index.ts' },
    format: ['cjs'],
    dts: true,
    outDir: 'dist/cjs',
    external,
  },
]);
