// Optional asset preparation tool using the workspace backend's existing Sharp installation.
const path = require('node:path');
const fs = require('node:fs/promises');
const sharp = require('../../backend/node_modules/sharp');
const directory = path.resolve(__dirname, '../public/screenshots');
(async () => {
  const files = (await fs.readdir(directory)).filter(name => name.endsWith('.png'));
  await Promise.all(files.flatMap(name => [sharp(path.join(directory, name)).webp({ quality: 92 }).toFile(path.join(directory, name.replace(/\.png$/, '.webp'))), sharp(path.join(directory, name)).jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(directory, name.replace(/\.png$/, '.jpg')))]));
  console.log(`Optimized ${files.length} app screenshots.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
