import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat, writeFile, mkdir, copyFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exportRoot = path.join(root, 'out');
const mime = { '.html':'text/html; charset=utf-8', '.js':'application/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.ttf':'font/ttf', '.woff2':'font/woff2', '.txt':'text/plain', '.pdf':'application/pdf' };
await stat(path.join(exportRoot, 'investor-brief/index.html')).catch(() => { throw new Error('Run npm run build before generating the investor PDF.'); });
const server = createServer(async (request, response) => {
  try {
    let file = path.resolve(exportRoot, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
    if (file !== exportRoot && !file.startsWith(exportRoot + path.sep)) { response.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    response.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    response.end(await readFile(file));
  } catch { response.writeHead(404).end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' }), headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/investor-brief/`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(image => image.decode())); });
  await page.emulateMedia({ media: 'print' });
  const layout = await page.locator('.document-page').evaluateAll(pages => pages.map((page, index) => {
    const flow = page.querySelector('.doc-flow').getBoundingClientRect();
    const footer = page.querySelector('.doc-footer').getBoundingClientRect();
    return { page: index + 1, availableGap: Math.round(footer.top - flow.bottom), width: Math.round(page.getBoundingClientRect().width) };
  }));
  if (layout.length !== 7 || layout.some(page => page.availableGap < 12) || errors.length) {
    throw new Error('PDF layout check failed: ' + JSON.stringify({ layout, errors }));
  }
  const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true, outline: true, displayHeaderFooter: false });
  const pageCount = (pdf.toString('latin1').match(/\/Type\s*\/Page\b/g) || []).length;
  if (pageCount !== 7) throw new Error(`Expected 7 PDF pages; found ${pageCount}.`);
  const output = path.join(root, 'public/Rina-Investor-Overview.pdf');
  await writeFile(output + '.tmp', pdf); await rename(output + '.tmp', output);
  await mkdir(path.join(root, 'investor-materials'), { recursive: true });
  await copyFile(output, path.join(root, 'investor-materials/Rina-Investor-Brief.pdf'));
  await copyFile(output, path.join(exportRoot, 'Rina-Investor-Overview.pdf'));
  console.log(`Created ${pageCount}-page investor PDF (${Math.round(pdf.length / 1024)} KB).`);
  console.log('All pages fit without clipping:', JSON.stringify(layout));
} finally { if (browser) await browser.close(); await new Promise(resolve => server.close(resolve)); }
