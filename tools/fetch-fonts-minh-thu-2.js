// Tải font Google (subset latin + vietnamese) cho trang guests/minh-thu-2.html
// và ghi ra scratch/minh-thu-2-fonts-moi.css với @font-face base64 data-URI,
// để trang thiệp hoàn toàn tự chứa (mở offline vẫn đúng font).
//
// Bộ chữ của concept "Đài quan sát dữ liệu":
//   · Fraunces      — chữ tiêu đề (serif quang học, mềm và có cá tính)
//   · Manrope       — chữ thân bài (sans hình học, sáng sủa)
//   · JetBrains Mono — chữ số / nhãn dữ liệu
//
// Chạy:  node tools/fetch-fonts-minh-thu-2.js
const fs = require('fs');
const path = require('path');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const CSS_URL = 'https://fonts.googleapis.com/css2'
  + '?family=Fraunces:opsz,wght@9..144,400;9..144,600'
  + '&family=Manrope:wght@400;500;700'
  + '&family=JetBrains+Mono:wght@500'
  + '&display=swap';

const OUT = path.join(__dirname, '..', 'scratch', 'minh-thu-2-fonts-moi.css');

async function main() {
  const res = await fetch(CSS_URL, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error('CSS fetch failed: ' + res.status);
  const css = await res.text();

  // Tách thành từng khối: /* subset */ @font-face { ... }
  const blocks = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g)];
  const wanted = blocks.filter(b => b[1] === 'latin' || b[1] === 'vietnamese');
  if (!wanted.length) throw new Error('Không tìm thấy khối latin/vietnamese nào.');

  // Font biến thiên (variable) của Google trả về CÙNG một file woff2 cho nhiều
  // cấp đậm khác nhau. Gộp lại thành 1 @font-face có dải font-weight để khỏi
  // nhúng trùng dữ liệu (giảm gần một nửa dung lượng).
  const groups = new Map();   // url -> { subset, body, weights: [] }
  for (const [, subset, body] of wanted) {
    const m = body.match(/url\((https:[^)]+\.woff2)\)/);
    if (!m) continue;
    const url = m[1];
    const wgt = +(body.match(/font-weight:\s*(\d+)/) || [, 400])[1];
    if (!groups.has(url)) groups.set(url, { subset, body, weights: [] });
    groups.get(url).weights.push(wgt);
  }

  let out = '';
  let total = 0;
  for (const [url, g] of groups) {
    const fres = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!fres.ok) throw new Error('font fetch failed: ' + url);
    const buf = Buffer.from(await fres.arrayBuffer());
    total += buf.length;
    const b64 = buf.toString('base64');
    const lo = Math.min(...g.weights), hi = Math.max(...g.weights);
    const wRule = lo === hi ? String(lo) : `${lo} ${hi}`;
    const inlined = g.body
      .replace(/font-weight:\s*[^;]+;/, `font-weight: ${wRule};`)
      .replace(/src:\s*url\([^)]+\)\s*format\(['"]woff2['"]\)/,
        `src: url(data:font/woff2;base64,${b64}) format('woff2')`);
    const fam = (g.body.match(/font-family:\s*'([^']+)'/) || [, '?'])[1];
    out += `/* ${fam} ${wRule} · ${g.subset} */\n@font-face {${inlined}}\n`;
    console.log(fam, wRule, g.subset, (buf.length / 1024).toFixed(1) + ' KB');
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out);
  console.log('Đã ghi', OUT, '—', (out.length / 1024).toFixed(0), 'KB (font gốc',
    (total / 1024).toFixed(0), 'KB)');
}
main().catch(e => { console.error(e); process.exit(1); });
