import { defineConfig } from 'tsup';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const srcDir = join(__dirname, 'src');

function getEntryPoints() {
  const entries = {
    index: 'src/index.ts'
  };
  
  try {
    const files = readdirSync(srcDir);
    for (const file of files) {
      const fullPath = join(srcDir, file);
      if (statSync(fullPath).isDirectory()) {
        try {
          if (statSync(join(fullPath, 'index.ts')).isFile()) {
            entries[`${file}/index`] = `src/${file}/index.ts`;
          }
        } catch (e) {
          // ignore
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return entries;
}

export default defineConfig({
  entry: getEntryPoints(),
  format: ['cjs', 'esm'],
  dts: false,
  clean: true,
  sourcemap: false,
  splitting: true,
  treeshake: true,
  external: ['react', 'react-native', 'react-native-svg', '@dga-icons/core'],
  outDir: 'dist',
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.js' : '.cjs',
    };
  },
  esbuildOptions(options, context) {
    if (context.format === 'cjs') {
      options.outdir = 'dist/cjs';
    } else {
      options.outdir = 'dist/esm';
    }
  }
});
