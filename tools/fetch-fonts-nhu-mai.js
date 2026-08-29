// Tải font Google (subset latin + vietnamese) cho trang guests/nhu-mai.html
// và ghi ra scratch/nhu-mai-fonts.css với @font-face dạng base64 data-URI,
// để trang thiệp tự chứa hoàn toàn (không gọi mạng).
//
// KHÔNG đụng tới tools/fetch-fonts.js hay fonts.css ở thư mục gốc.
const fs = require('fs');
const path = require('path');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..600;1,400..500&family=Manrope:wght@400..800&display=swap';

async function main() {
  const res = await fetch(CSS_URL, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error('CSS fetch failed: ' + res.status);
  const css = await res.text();

  // Tách thành từng khối: /* subset */ @font-face { ... }
  const blocks = [...css.matchAll(/\/\*\s*(\w+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g)];
  const wanted = blocks.filter(b => b[1] === 'latin' || b[1] === 'vietnamese');
  if (!wanted.length) throw new Error('không tìm thấy subset latin/vietnamese');

  let out = '';
  let total = 0;
  for (const [, subset, body] of wanted) {
    const url = body.match(/url\((https:[^)]+\.woff2)\)/)[1];
    const fam = (body.match(/font-family:\s*'([^']+)'/) || [, '?'])[1];
    const style = (body.match(/font-style:\s*(\w+)/) || [, 'normal'])[1];
    const fres = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!fres.ok) throw new Error('font fetch failed: ' + url);
    const buf = Buffer.from(await fres.arrayBuffer());
    const b64 = buf.toString('base64');
    const inlined = body.replace(/src:\s*url\([^)]+\)\s*format\(['"]woff2['"]\)/,
      `src: url(data:font/woff2;base64,${b64}) format('woff2')`);
    out += `/* ${fam} ${style} — ${subset} */\n@font-face {${inlined}}\n`;
    total += buf.length;
    console.log(fam, style, subset, (buf.length / 1024).toFixed(1) + ' KB');
  }

  const dir = path.join(__dirname, '..', 'scratch');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'nhu-mai-fonts.css'), out);
  console.log('scratch/nhu-mai-fonts.css:', (out.length / 1024).toFixed(0), 'KB (woff2 gốc', (total / 1024).toFixed(0), 'KB)');
}
main().catch(e => { console.error(e); process.exit(1); });
