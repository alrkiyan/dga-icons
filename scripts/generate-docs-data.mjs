import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const iconsDir = join(rootDir, 'icons');
const docsDataDir = join(rootDir, 'docs', 'data');

import { toPascalCase } from './utils.mjs';

async function generateDocsData() {
  await mkdir(docsDataDir, { recursive: true });

  // Load metadata for tags and categories
  const metadataRaw = await readFile(join(iconsDir, 'metadata.json'), 'utf-8');
  const metadata = JSON.parse(metadataRaw);

  const stylesRaw = await readFile(join(iconsDir, 'styles.json'), 'utf-8');
  const stylesObj = JSON.parse(stylesRaw);
  const styles = stylesObj.styles.map(s => s.directory);

  console.log(`Generating docs data for ${styles.length} styles...`);

  // We will generate one JSON file per style to keep payload size small (~2MB each)
  for (const style of styles) {
    const styleDir = join(iconsDir, style);
    let files;
    try {
      files = await readdir(styleDir);
    } catch (err) {
      console.warn(`⚠️ Style directory missing: ${style}`);
      continue;
    }

    const svgFiles = files.filter(f => f.endsWith('.svg'));
    const iconsData = [];

    for (const file of svgFiles) {
      const originalName = file.replace('.svg', '');
      const reactName = toPascalCase(originalName);
      
      const svgContent = await readFile(join(styleDir, file), 'utf-8');
      
      // Clean SVG for embedding: remove XML declaration and format smartly
      let cleanSvg = svgContent
        .replace(/<\?xml.*?\?>/, '') // Remove xml declaration
        .replace(/<!--.*?-->/g, '') // Remove comments
        .trim();
        
      // Ensure it has width="1em" height="1em" for easy CSS scaling
      cleanSvg = cleanSvg.replace(/<svg([^>]*)>/, (match, attrs) => {
        let newAttrs = attrs
          .replace(/width="[^"]*"/, '')
          .replace(/height="[^"]*"/, '');
        return `<svg width="1em" height="1em" ${newAttrs}>`;
      });

      const iconMeta = metadata[originalName] || {};

      iconsData.push({
        name: reactName,
        originalName: originalName,
        category: iconMeta.category || 'Uncategorized',
        tags: iconMeta.tags || [],
        svg: cleanSvg
      });
    }

    // Sort alphabetically
    iconsData.sort((a, b) => a.name.localeCompare(b.name));

    await writeFile(
      join(docsDataDir, `${style}.json`),
      JSON.stringify(iconsData)
    );
    
    console.log(`✅ Generated ${style}.json (${iconsData.length} icons)`);
  }

  // Generate a master meta file with just names and tags (for global search if needed)
  // or just write the styles list.
  await writeFile(
    join(docsDataDir, 'meta.json'),
    JSON.stringify({ styles })
  );
  console.log('✅ Generated meta.json');
}

generateDocsData().catch(console.error);
