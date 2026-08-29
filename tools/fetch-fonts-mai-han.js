// Tải font Google (subset latin + vietnamese) cho trang guests/mai-han.html
// và ghi ra scratch/mai-han-fonts.css dưới dạng @font-face base64 data-URI,
// để trang thiệp hoàn toàn tự chứa (mở offline vẫn đúng font).
// KHÔNG đụng tới tools/fetch-fonts.js hay fonts.css ở thư mục gốc.
const fs = require('fs');
const path = require('path');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Nunito:wght@400;600;700&display=swap';
const OUT = path.join(__dirname, '..', 'scratch', 'mai-han-fonts.css');

async function main() {
  const res = await fetch(CSS_URL, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error('CSS fetch failed: ' + res.status);
  const css = await res.text();

  const blocks = [...css.matchAll(/\/\*\s*(\w+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g)];
  const wanted = blocks.filter(b => b[1] === 'latin' || b[1] === 'vietnamese');
  if (!wanted.length) throw new Error('Không tìm thấy subset latin/vietnamese');

  // Fraunces/Nunito là font biến thiên: nhiều khối @font-face trỏ về CÙNG một
  // file woff2. Gộp lại theo URL và cho font-weight thành một khoảng, để không
  // nhúng trùng cùng một font mấy lần (file thiệp nhẹ hơn nhiều).
  const byUrl = new Map();
  for (const [, subset, body] of wanted) {
    const url = body.match(/url\((https:[^)]+\.woff2)\)/)[1];
    const w = +(body.match(/font-weight:\s*(\d+)/) || [, 400])[1];
    if (!byUrl.has(url)) byUrl.set(url, { subset, body, min: w, max: w });
    else {
      const e = byUrl.get(url);
      e.min = Math.min(e.min, w);
      e.max = Math.max(e.max, w);
    }
  }

  let out = '';
  for (const [url, entry] of byUrl) {
    const subset = entry.subset;
    let body = entry.body;
    if (entry.min !== entry.max) {
      body = body.replace(/font-weight:\s*\d+/, `font-weight: ${entry.min} ${entry.max}`);
    }
    const fres = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!fres.ok) throw new Error('font fetch failed: ' + url);
    const buf = Buffer.from(await fres.arrayBuffer());
    const b64 = buf.toString('base64');
    const inlined = body.replace(/src:\s*url\([^)]+\)\s*format\(['"]woff2['"]\)/,
      `src: url(data:font/woff2;base64,${b64}) format('woff2')`);
    out += `/* ${subset} */\n@font-face {${inlined}}\n`;
    const fam = (body.match(/font-family:\s*'([^']+)'/) || [, '?'])[1];
    console.log(fam, subset, url.split('/').pop(), (buf.length / 1024).toFixed(1) + ' KB');
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out);
  console.log('scratch/mai-han-fonts.css:', (out.length / 1024).toFixed(0), 'KB');
}
main().catch(e => { console.error(e); process.exit(1); });
