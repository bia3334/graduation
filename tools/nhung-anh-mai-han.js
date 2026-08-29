// Nhúng 3 tấm ảnh có sẵn ở thư mục gốc vào guests/mai-han.html dưới dạng
// data URI, gom trong một khối <style> riêng ở cuối file ("ẢNH NHÚNG").
// Chạy lại được nhiều lần: lần sau sẽ thay khối cũ chứ không nhân đôi.
//   node tools/nhung-anh-mai-han.js
const fs = require('fs');
const path = require('path');

const goc = path.join(__dirname, '..');
const trang = path.join(goc, 'guests', 'mai-han.html');

const ANH = [
  { lop: 'anh-meo-1', file: 'cat-cat-meme.webp',              kieu: 'image/webp', ti: '1 / 1' },
  { lop: 'anh-meo-2', file: 'dancing-cat-dance.webp',         kieu: 'image/webp', ti: '1 / 1' },
  { lop: 'anh-kirby', file: 'Dance Nintendo GIF by Kéké.gif', kieu: 'image/gif',  ti: '4 / 3' },
];

const MO = '<!-- ══════════ ẢNH NHÚNG (rất dài) — ĐỪNG SỬA ══════════ -->';
const DONG = '<!-- ══════════ HẾT ẢNH NHÚNG ══════════ -->';

let css = '';
for (const a of ANH) {
  const buf = fs.readFileSync(path.join(goc, a.file));
  css += `.${a.lop}{\n  aspect-ratio: ${a.ti};\n  background-image: url(data:${a.kieu};base64,${buf.toString('base64')});\n}\n`;
  console.log(a.file, '→', a.lop, (buf.length / 1024).toFixed(0) + ' KB');
}

const khoi = `${MO}\n<style>\n${css}</style>\n${DONG}`;

let html = fs.readFileSync(trang, 'utf8');
const cu = new RegExp(MO.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + DONG.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

if (cu.test(html)) {
  html = html.replace(cu, khoi);
  console.log('Đã thay khối ảnh cũ.');
} else {
  const moc = '<!-- ══════════ FONT CHỮ NHÚNG';
  const i = html.indexOf(moc);
  if (i < 0) throw new Error('Không tìm thấy chỗ chèn (khối font ở cuối file).');
  html = html.slice(0, i) + khoi + '\n\n' + html.slice(i);
  console.log('Đã chèn khối ảnh mới.');
}

fs.writeFileSync(trang, html);
console.log('mai-han.html:', (fs.statSync(trang).size / 1024).toFixed(0), 'KB');
