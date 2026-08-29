// Thử luồng thật: letter.html + ngày sinh 16/12/2000 → phải nhảy sang guests/thy.html
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const src = fs.readFileSync('letter.html', 'utf8');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BS = String.fromCharCode(92);

const js = '<script>window.addEventListener("load",function(){'
  + 'document.getElementById("dob-day").dataset.value="16";'
  + 'document.getElementById("dob-month").dataset.value="12";'
  + 'document.getElementById("dob-year").dataset.value="2000";'
  + 'document.getElementById("gate-form").dispatchEvent(new Event("submit",{cancelable:true}));'
  + '});</script>';

// đặt file thử ngay cạnh letter.html để đường dẫn guests/... còn đúng
const f = path.resolve('thu-letter-tam.html');
fs.writeFileSync(f, src.replace('</body>', js + '</body>'));
const out = path.resolve('scratch/thu-letter.png');
try { fs.unlinkSync(out); } catch (e) {}
execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--screenshot=' + out,
  '--window-size=700,760', '--virtual-time-budget=8000',
  'file:///' + f.split(BS).join('/')], { stdio: 'ignore' });
console.log(out);
