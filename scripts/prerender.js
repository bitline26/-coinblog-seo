import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const { posts } = await import('../src/data/posts.js');

const routes = [
  '/',
  ...posts.map(p => `/post/${p.slug}`),
];

const template = fs.readFileSync(path.resolve(rootDir, 'dist/index.html'), 'utf-8');
const { render } = await import('../dist/server/entry-server.js');

for (const route of routes) {
  try {
    const { html: appHtml, helmet } = render(route);

    let headTags = '';
    if (helmet) {
      headTags += helmet.title?.toString() ?? '';
      headTags += helmet.meta?.toString() ?? '';
      headTags += helmet.link?.toString() ?? '';
      headTags += helmet.script?.toString() ?? '';
    }

    const html = template
      .replace('<!--app-head-->', headTags)
      .replace('<!--app-html-->', appHtml);

    let outPath;
    if (route === '/') {
      outPath = path.resolve(rootDir, 'dist/index.html');
    } else {
      const dir = path.resolve(rootDir, `dist${route}`);
      fs.mkdirSync(dir, { recursive: true });
      outPath = path.resolve(dir, 'index.html');
    }

    fs.writeFileSync(outPath, html);
    console.log(`✓ ${route}`);
  } catch (e) {
    console.error(`✗ ${route}:`, e.message);
  }
}

console.log('\nPre-rendering done!');
