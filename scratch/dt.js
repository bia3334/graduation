// Xem trang ở bề ngang điện thoại thật bằng iframe (Chrome không cho cửa sổ hẹp hơn ~500px)
// node scratch/dt.js <rộng> <cao mỗi cột> <số cột>
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const src = fs.readFileSync('guests/thy.html', 'utf8');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BS = String.fromCharCode(92);
const rong = +process.argv[2] || 390, cao = +process.argv[3] || 1300, cot = +process.argv[4] || 4;
const mo = '<style>#gate{display:none!important}#roi{display:none}</style>'
  + '<script>document.getElementById("invite").hidden=false;'
  + 'document.querySelectorAll(".reveal").forEach(function(e){e.classList.add("inview")});</script>';

let khung = '<!doctype html><meta charset="utf-8"><body style="margin:0;background:#555;display:flex;gap:8px">';
for (let i = 0; i < cot; i++) {
  const f = path.resolve('scratch/dt-' + rong + '-' + i + '.html');
  fs.writeFileSync(f, src.replace('</body>', mo + '<style>html{margin-top:-' + (i * cao) + 'px}</style></body>'));
  khung += '<iframe src="dt-' + rong + '-' + i + '.html" style="width:' + rong + 'px;height:' + cao + 'px;border:0"></iframe>';
}
khung += '</body>';
const h = path.resolve('scratch/dt-khung.html');
fs.writeFileSync(h, khung);

const out = path.resolve('scratch/dt-' + rong + '.png');
try { fs.unlinkSync(out); } catch (e) {}
execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--screenshot=' + out,
  '--window-size=' + (cot * (rong + 8) + 8) + ',' + cao, '--virtual-time-budget=6000',
  'file:///' + h.split(BS).join('/')], { stdio: 'ignore' });
console.log(out);
