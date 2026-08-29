// Thử cổng ngày sinh: nhập sai → báo lỗi; nhập đúng → mở thiệp.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const src = fs.readFileSync('guests/thy.html', 'utf8');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BS = String.fromCharCode(92);

function thu(ten, ngay) {
  const js = '<script>window.addEventListener("load",function(){'
    + 'var i=document.getElementById("dob");'
    + 'i.value="' + ngay + '";i.dispatchEvent(new Event("input"));'
    + 'document.getElementById("gate-form").dispatchEvent(new Event("submit",{cancelable:true}));'
    + 'setTimeout(function(){'
    + 'var g=document.getElementById("gate");'
    + 'var inv=document.getElementById("invite");'
    + 'var box=document.createElement("div");'
    + 'box.setAttribute("style","position:fixed;left:0;top:0;z-index:99999;background:#000;color:#0f0;font:13px monospace;padding:8px");'
    + 'box.textContent="' + ten + ' | conCongKhoa=" + (g?"co":"khong")'
    + ' + " | thiepHien=" + (inv.hidden?"khong":"co")'
    + ' + " | loi=" + (document.getElementById("gate-err")?document.getElementById("gate-err").textContent.slice(0,40):"-");'
    + 'document.body.appendChild(box);},1200);});</script>';
  const f = path.resolve('scratch/thu-' + ten + '.html');
  fs.writeFileSync(f, src.replace('</body>', js + '</body>'));
  const out = path.resolve('scratch/thu-' + ten + '.png');
  try { fs.unlinkSync(out); } catch (e) {}
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--screenshot=' + out,
    '--window-size=700,300', '--virtual-time-budget=6000',
    'file:///' + f.split(BS).join('/')], { stdio: 'ignore' });
  console.log(out);
}

thu('sai', '01/01/1999');
thu('dung', '16/12/2000');
