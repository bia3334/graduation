// Tải font cho trang của chị Thy (Tiệm tạp hoá Thy) — latin + vietnamese,
// nhúng base64 để trang chạy offline. Ghi ra scratch/thy-fonts.css
const fs = require('fs');
const path = require('path');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const CSS_URL = 'https://fonts.googleapis.com/css2'
  + '?family=Baloo+2:wght@700;800'
  + '&family=Quicksand:wght@400;600;700'
  + '&family=Roboto+Mono:wght@400;700'
  + '&display=swap';

async function main() {
  const res = await fetch(CSS_URL, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error('CSS fetch failed: ' + res.status);
  const css = await res.text();

  const blocks = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g)];
  const wanted = blocks.filter(b => b[1] === 'latin' || b[1] === 'vietnamese');
  let out = '';
  for (const [, subset, body] of wanted) {
    const fam = (body.match(/font-family:\s*'([^']+)'/) || [])[1];
    const wt  = (body.match(/font-weight:\s*(\d+)/) || [])[1];
    const url = body.match(/url\((https:[^)]+\.woff2)\)/)[1];
    const fres = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!fres.ok) throw new Error('font fetch failed: ' + url);
    const buf = Buffer.from(await fres.arrayBuffer());
    const b64 = buf.toString('base64');
    const inlined = body.replace(/src:\s*url\([^)]+\)\s*format\(['"]woff2['"]\)/,
      `src: url(data:font/woff2;base64,${b64}) format('woff2')`);
    out += `/* ${fam} ${wt} — ${subset} */\n@font-face {${inlined}}\n`;
    console.log(fam, wt, subset, (buf.length / 1024).toFixed(1) + ' KB');
  }
  const dest = path.join(__dirname, '..', 'scratch', 'thy-fonts.css');
  fs.writeFileSync(dest, out);
  console.log('→ scratch/thy-fonts.css', (out.length / 1024).toFixed(0), 'KB');
}
main().catch(e => { console.error(e); process.exit(1); });
