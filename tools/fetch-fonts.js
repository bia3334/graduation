// Downloads Google Fonts (latin + vietnamese subsets) and writes fonts.css
// with base64 data-URI @font-face rules, so the invite page is self-contained.
const fs = require('fs');
const path = require('path');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap';

async function main() {
  const res = await fetch(CSS_URL, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error('CSS fetch failed: ' + res.status);
  const css = await res.text();

  // Split into blocks: /* subset */ @font-face { ... }
  const blocks = [...css.matchAll(/\/\*\s*(\w+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g)];
  const wanted = blocks.filter(b => b[1] === 'latin' || b[1] === 'vietnamese');
  let out = '';
  for (const [, subset, body] of wanted) {
    const url = body.match(/url\((https:[^)]+\.woff2)\)/)[1];
    const fres = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!fres.ok) throw new Error('font fetch failed: ' + url);
    const buf = Buffer.from(await fres.arrayBuffer());
    const b64 = buf.toString('base64');
    const inlined = body.replace(/src:\s*url\([^)]+\)\s*format\(['"]woff2['"]\)/,
      `src: url(data:font/woff2;base64,${b64}) format('woff2')`);
    out += `/* ${subset} */\n@font-face {${inlined}}\n`;
    console.log(subset, url.split('/').pop(), (buf.length / 1024).toFixed(1) + ' KB');
  }
  fs.writeFileSync(path.join(__dirname, '..', 'fonts.css'), out);
  console.log('fonts.css written:', (out.length / 1024).toFixed(0), 'KB total');
}
main().catch(e => { console.error(e); process.exit(1); });
