import fs from 'fs/promises';
import path from 'path';
import YAML from '../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/index.js';

const episodesDir = './src/content/episodes';
const files = await fs.readdir(episodesDir);

for (const file of files) {
  if (!file.endsWith('.md')) continue;
  const mdPath = path.join(episodesDir, file);
  const content = await fs.readFile(mdPath, 'utf-8');

  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    console.warn(`Skipping ${file}: no frontmatter`);
    continue;
  }

  const frontmatter = YAML.parse(match[1]);
  const body = match[2].trim();

  const data = {
    ...frontmatter,
    body,
  };

  const jsonFile = file.replace(/\.md$/, '.json');
  const jsonPath = path.join(episodesDir, jsonFile);
  await fs.writeFile(jsonPath, JSON.stringify(data, null, 2) + '\n');
  await fs.unlink(mdPath);
  console.log(`Converted ${file} -> ${jsonFile}`);
}
