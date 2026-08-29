// Chụp riêng phần "Em gửi riêng chị" của thy.html ở bề ngang điện thoại
// node scratch/dt-thu.js <rộng> <cao>
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const src = fs.readFileSync('guests/thy.html', 'utf8');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BS = String.fromCharCode(92);
const rong = +process.argv[2] || 390, cao = +process.argv[3] || 1500;
const mo = '<style>#gate{display:none!important}#roi{display:none}html{scroll-behavior:auto}</style>'
  + '<script>document.getElementById("invite").hidden=false;'
  + 'document.querySelectorAll(".reveal").forEach(function(e){e.classList.add("inview")});'
  + 'setTimeout(function(){var t=document.getElementById("tieu-de-thu");'
  + 'var y=t.getBoundingClientRect().top+window.scrollY-40;document.documentElement.style.marginTop=(-y)+"px";},300);</script>';

const f = path.resolve('scratch/dt-thu-' + rong + '.html');
fs.writeFileSync(f, src.replace('</body>', mo + '</body>'));
const h = path.resolve('scratch/dt-thu-khung.html');
fs.writeFileSync(h, '<!doctype html><meta charset="utf-8"><body style="margin:0;background:#555">'
  + '<iframe src="dt-thu-' + rong + '.html" style="width:' + rong + 'px;height:' + cao + 'px;border:0"></iframe></body>');

const out = path.resolve('scratch/dt-thu-' + rong + '.png');
try { fs.unlinkSync(out); } catch (e) {}
execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--screenshot=' + out,
  '--window-size=' + (rong + 16) + ',' + cao, '--virtual-time-budget=8000',
  'file:///' + h.split(BS).join('/')], { stdio: 'ignore' });
console.log(out);
