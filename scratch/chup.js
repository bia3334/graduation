// Chụp ảnh trang thiệp bằng Chrome headless để tự kiểm tra bố cục.
// node scratch/chup.js <rộng> <cao> <số lát> <tên>
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const src = fs.readFileSync('guests/thy.html', 'utf8');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const khoa = process.argv[6] === 'khoa';
const mo = khoa ? '' : '<style>#gate{display:none!important}#roi{display:none}</style>'
  + '<script>document.getElementById("invite").hidden=false;'
  + 'document.querySelectorAll(".reveal").forEach(function(e){e.classList.add("inview")});</script>';
const [rong, cao, lat, ten] = [+process.argv[2], +process.argv[3], +process.argv[4], process.argv[5]];
const BS = String.fromCharCode(92);

// mỗi lát một file riêng, tránh Chrome đọc nhầm file của lát khác
const files = [];
for (let i = 0; i < lat; i++) {
  const f = path.resolve('scratch/prev-' + ten + '-' + i + '.html');
  fs.writeFileSync(f, src.replace('</body>',
    mo + '<style>html{margin-top:-' + (i * cao) + 'px}</style></body>'));
  files.push(f);
}

for (let i = 0; i < lat; i++) {
  const out = path.resolve('scratch/' + ten + '-' + i + '.png');
  try { fs.unlinkSync(out); } catch (e) {}
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--screenshot=' + out, '--window-size=' + rong + ',' + cao, '--virtual-time-budget=4000',
    'file:///' + files[i].split(BS).join('/')], { stdio: 'ignore' });
  console.log(out, fs.existsSync(out) ? (fs.statSync(out).size / 1024).toFixed(0) + ' KB' : 'CHUA CO');
}
