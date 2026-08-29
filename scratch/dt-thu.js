// Chụp riêng phần lá thư của một trang khách ở bề ngang điện thoại
// node scratch/dt-thu.js <slug> <selector-tiêu-đề-thư> [rộng] [cao]
//   vd: node scratch/dt-thu.js thy "#tieu-de-thu" 390 1500
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const slug = process.argv[2] || 'thy', sel = process.argv[3] || '#tieu-de-thu';
const rong = +process.argv[4] || 390, cao = +process.argv[5] || 1500;
const src = fs.readFileSync('guests/' + slug + '.html', 'utf8');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BS = String.fromCharCode(92);
const mo = '<style>#gate,#cong,#khoa,.gate{display:none!important}#roi,#canvas-roi{display:none}html{scroll-behavior:auto}</style>'
  + '<script>var inv=document.getElementById("invite")||document.querySelector("main");if(inv){inv.hidden=false;inv.removeAttribute("hidden");}'
  + 'document.body.classList.add("mo","da-mo","unlocked","open");'
  + 'document.querySelectorAll(".reveal,.canh,.khoi,.khung,.qs,.hien").forEach(function(e){e.classList.add("inview","in","show","hien-ra","da-hien","visible")});'
  + 'setTimeout(function(){var t=document.querySelector(' + JSON.stringify(sel) + ');if(!t)return;'
  + 'var y=t.getBoundingClientRect().top+window.scrollY-40;document.documentElement.style.marginTop=(-y)+"px";},400);</script>';

const f = path.resolve('scratch/dt-thu-' + slug + '.html');
fs.writeFileSync(f, src.replace('</body>', mo + '</body>'));
const h = path.resolve('scratch/dt-thu-khung-' + slug + '.html');
fs.writeFileSync(h, '<!doctype html><meta charset="utf-8"><body style="margin:0;background:#555">'
  + '<iframe src="dt-thu-' + slug + '.html" style="width:' + rong + 'px;height:' + cao + 'px;border:0"></iframe></body>');

const out = path.resolve('scratch/dt-thu-' + slug + '.png');
try { fs.unlinkSync(out); } catch (e) {}
execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--screenshot=' + out,
  '--window-size=' + (rong + 16) + ',' + cao, '--virtual-time-budget=8000',
  'file:///' + h.split(BS).join('/')], { stdio: 'ignore' });
console.log(out);
