// Đo kích thước thật trong Chrome headless (dump-dom rồi đọc <title>)
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const src = fs.readFileSync('guests/thy.html', 'utf8');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BS = String.fromCharCode(92);
const rong = +process.argv[2] || 390;
const moKhoa = process.argv[3] === 'mo';

const dochi = '<script>window.addEventListener("load",function(){'
  + (moKhoa ? 'document.getElementById("invite").hidden=false;'
    + 'document.querySelectorAll(".reveal").forEach(function(e){e.classList.add("inview")});' : '')
  + 'var d=document.documentElement,b=document.body,c=document.getElementById("gate-doc");'
  + 'var lm=document.getElementById("letter-mode");'
  + 'var r=c?c.getBoundingClientRect():{left:0,width:0};'
  + 'var rong=[];document.querySelectorAll("*").forEach(function(e){'
  + 'var x=e.getBoundingClientRect();if(x.right>d.clientWidth+1){rong.push(e.tagName+"."+e.className+"@"+Math.round(x.right))}});'
  + 'var box=document.createElement("div");box.setAttribute("style","position:fixed;left:0;top:0;z-index:99999;background:#000;color:#0f0;font:12px monospace;padding:6px;white-space:pre-wrap;max-width:100%");box.textContent="vp="+d.clientWidth+"|scroll="+d.scrollWidth+"|body="+b.scrollWidth'
  + '+"|the="+Math.round(r.left)+"→"+Math.round(r.width)'
  + '+"|letterMode="+(lm?getComputedStyle(lm).display:"?")'
  + '+"|tran="+rong.slice(0,6).join(", ");document.body.appendChild(box);});</script>';

const f = path.resolve('scratch/do.html');
fs.writeFileSync(f, src.replace('</body>', dochi + '</body>'));
const out = path.resolve('scratch/do-' + rong + (moKhoa ? '-mo' : '') + '.png');
try { fs.unlinkSync(out); } catch (e) {}
execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--screenshot=' + out,
  '--window-size=' + rong + ',260', '--virtual-time-budget=4000',
  'file:///' + f.split(BS).join('/')], { stdio: 'ignore' });
console.log(out);
