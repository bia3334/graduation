const fs = require('fs');
const path = require('path');

const letterPath = path.join(__dirname, '..', 'letter.html');
const chungPath = path.join(__dirname, '..', 'guests', 'chung.html');

const letterContent = fs.readFileSync(letterPath, 'utf8');

// Trích xuất khối font chữ nhúng
const fontMarker = '<!-- Font chữ nhúng (rất dài) — ĐỪNG SỬA -->';
const fontStartIndex = letterContent.indexOf(fontMarker);
if (fontStartIndex === -1) {
  console.error('Không tìm thấy khối font trong letter.html');
  process.exit(1);
}
const fontBlock = letterContent.substring(fontStartIndex);

// Thiết kế template cho chung.html
const template = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Thiệp mời tốt nghiệp</title>
</head>
<body style="margin:0">

<!-- ════════════════════════════════════════════════════════════════
     ✏️  CÁCH SỬA THIỆP NÀY
     · Mọi câu chữ nằm ngay trong trang bên dưới — thấy chữ nào,
       sửa thẳng chữ đó, lưu file, mở lại trong trình duyệt là xong.
     · Lá thư chung: tìm chữ "✉️ VIẾT THƯ Ở ĐÂY" ở gần cuối trang.
     · Phần <style> và <script> phía dưới là máy móc — không cần đụng.
     ════════════════════════════════════════════════════════════════ -->

<script>
/* ── CÀI ĐẶT ─────────────────────────────────────────────── */
// Danh sách ngày sinh của khách mời thiết kế riêng (để chặn không cho vào trang chung)
const CHAN_DANH_SACH = [
  '18022003', // chan-joong.html
  '05122003', // minh-thu.html
  '30101975', // me.html
  '01011973'  // ba.html
];

// Lời báo lỗi ở màn nhập ngày sinh:
const LOI_CHUA_DU  = 'Hãy nhập đủ ngày · tháng · năm, ví dụ 05/09/2003.';
const LOI_KHONG_CO = 'Ngày này không tồn tại — bạn kiểm tra lại nhé!';
const LOI_SAI      = 'Ngày sinh của bạn có thiệp thiết kế riêng. Hãy dùng trang chính để mở nhé!';
</script>

<div id="sky" aria-hidden="true"></div>

<!-- ══ MÀN KHÓA — nhập ngày sinh để mở thiệp ══ -->
<main id="gate">
  <div class="gate-card" id="gate-card">
    <div class="crest">’26</div>
    <p class="eyebrow">Lễ tốt nghiệp · 2026</p>
    <h1>Thiệp mời ngày tốt nghiệp</h1>
    <p class="gate-seal" id="gate-seal">Nhập ngày sinh của bạn để mở thiệp.</p>
    
    <form class="gate-form" id="gate-form">
      <label>Ngày sinh của bạn</label>
      <div class="dob-selects">
        <div class="custom-select" id="dob-day" data-value="" tabindex="0">
          <div class="select-trigger"><span>Ngày</span></div>
          <div class="select-options">
            \${Array.from({length: 31}, (_, i) => {
              const v = String(i + 1).padStart(2, '0');
              return \`<div class="option" data-value="\${v}">\${v}</div>\`;
            }).join('\\n            ')}
          </div>
        </div>
        <span class="dob-sep">/</span>
        <div class="custom-select" id="dob-month" data-value="" tabindex="0">
          <div class="select-trigger"><span>Tháng</span></div>
          <div class="select-options">
            \${Array.from({length: 12}, (_, i) => {
              const v = String(i + 1).padStart(2, '0');
              return \`<div class="option" data-value="\${v}">\${v}</div>\`;
            }).join('\\n            ')}
          </div>
        </div>
        <span class="dob-sep">/</span>
        <div class="custom-select" id="dob-year" data-value="" tabindex="0">
          <div class="select-trigger"><span>Năm</span></div>
          <div class="select-options">
            \${Array.from({length: 39}, (_, i) => {
              const v = String(1970 + i);
              return \`<div class="option" data-value="\${v}">\${v}</div>\`;
            }).join('\\n            ')}
          </div>
        </div>
      </div>
      <br>
      <button type="submit">Mở thiệp</button>
      <p id="gate-error" role="alert" aria-live="polite"></p>
    </form>

    <!-- Chế độ "thư dành riêng" — chỉ hiện khi đến từ letter.html với ?m= hợp lệ -->
    <div id="letter-mode" hidden>
      <p class="gate-seal">Thư mời tốt nghiệp dành riêng cho bạn.</p>
      <div class="gate-form"><button type="button" id="lm-open">Mở xem</button></div>
    </div>
  </div>
</main>

<!-- ══ THIỆP — hiện ra sau khi mở khóa ══ -->
<main id="invite" hidden>
  <!-- Lời chào đầu trang -->
  <header class="hero reveal">
    <p class="eyebrow">Thiệp mời tốt nghiệp</p>
    <h1 class="script">Thân gửi bạn</h1>
    <p class="fullname">Khách quý của tôi</p>
    <p class="hero-line">Sự hiện diện của bạn sẽ làm ngày tốt nghiệp của mình thêm phần trọn vẹn và ý nghĩa.</p>
  </header>

  <!-- Section Hành trình Bay (Máy bay giấy bay qua mây) -->
  <section class="moment flight-path reveal">
    <div class="decor-container">
      <svg class="flight-svg" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Đường bay nét đứt -->
        <path id="path-line" d="M30,170 C100,100 150,50 200,100 C250,150 300,80 370,30" stroke="var(--accent)" stroke-width="2" stroke-dasharray="6,6"/>
        <!-- Máy bay giấy -->
        <g class="paper-plane" id="plane-group">
          <polygon points="0,0 -15,5 -10,-5" fill="var(--accent)"/>
          <polygon points="0,0 -10,-5 -5,-2" fill="var(--accent-deep)"/>
        </g>
      </svg>
      <div class="city-label sgn">Sài Gòn (SGN)</div>
      <div class="city-label mel">Melbourne (MEL)</div>
    </div>
    <div class="moment-caption">Hành trình vượt đại dương đến lễ tốt nghiệp tại Monash University.</div>
  </section>

  <!-- Vé mời thiết kế phong cách vé máy bay cổ điển -->
  <section class="boarding-pass reveal" aria-label="Vé mời tốt nghiệp">
    <div class="ticket-header">
      <div class="brand">GRAD·26 LUXURY AIRLINES</div>
      <div class="ticket-title">THẺ LÊN MÁY BAY / BOARDING PASS</div>
      <div class="ticket-copy">Liên 2: Giao hành khách (Hạng VIP)</div>
    </div>
    
    <div class="ticket-body">
      <!-- Con dấu đỏ ĐÃ SOÁT VÉ -->
      <div class="stamp" aria-hidden="true">
        <span>GRAD·26<br>WELCOME</span>
      </div>

      <div class="ticket-info">
        <div class="ticket-row no-border">
          <span class="label">Mã vé (No.):</span>
          <span class="value serial" id="ticket-serial">2026-CHUNG</span>
        </div>
        <div class="ticket-row">
          <span class="label">Khách mời:</span>
          <span class="value name">Khách Quý</span>
        </div>
        <div class="ticket-row">
          <span class="label">Tuyến bay:</span>
          <span class="value route-text">Sài Gòn ➔ Melbourne (MEL)</span>
        </div>
        <div class="ticket-grid">
          <div>
            <span class="label">Địa điểm:</span>
            <span class="value block">Monash University</span>
            <span class="value-sub">Clayton Campus, Melbourne</span>
          </div>
          <div>
            <span class="label">Thời gian:</span>
            <span class="value block">Sẽ cập nhật</span>
            <span class="value-sub">Năm tốt nghiệp: 2026</span>
          </div>
        </div>
      </div>
    </div>
    <div class="ticket-footer">
      <span>Chúc bạn có một chuyến đi tuyệt vời!</span>
    </div>
  </section>

  <!-- Section Lời Nhắn / Thư Tay -->
  <section class="letter-section reveal">
    <div class="letter-paper">
      <div class="letter-crest">✉</div>
      <h2>Thư gửi bạn</h2>
      
      <div class="letter-content">
        <!-- ✉️ VIẾT THƯ Ở ĐÂY -->
        <p class="placeholder">Cảm ơn bạn rất nhiều vì đã luôn là một phần ý nghĩa trong hành trình trưởng thành của mình. Lễ tốt nghiệp này đánh dấu một cột mốc quan trọng, và niềm vui ấy sẽ trọn vẹn hơn rất nhiều nếu có bạn ở đó cùng mình lưu lại những kỷ niệm đẹp tại Melbourne. Hy vọng sớm được đón bạn tại xứ sở chuột túi!</p>
      </div>
      
      <div class="letter-signature">
        <p class="sig-title">Thân ái,</p>
        <p class="sig-name">Chủ nhân bữa tiệc</p>
      </div>
    </div>
  </section>

  <!-- Thông tin chi tiết sự kiện -->
  <footer class="event-details reveal">
    <div class="detail-card">
      <h3>THÔNG TIN LỄ TỐT NGHIỆP</h3>
      <div class="detail-item">
        <strong>Địa điểm:</strong> Monash University (Clayton Campus), Melbourne, Australia.
      </div>
      <div class="detail-item">
        <strong>Thời gian:</strong> Sẽ cập nhật ngay khi ban tổ chức xác nhận lịch chính thức.
      </div>
      <p class="thank-you">Rất mong được gặp bạn!</p>
    </div>
  </footer>
</main>

<style>
:root {
  color-scheme: light;
  --serif: 'Cormorant', Georgia, 'Times New Roman', serif;
  --sans: 'Segoe UI', system-ui, -apple-system, sans-serif;

  /* Bảng màu trung tính giấy ấm và vàng đồng */
  --ground: #FBF6F1;
  --ground-2: #F3E9DE;
  --card: #FFFEFC;
  --ink: #45363E;
  --ink-soft: #857078;
  --accent: #A98A50;
  --accent-deep: #86672F;
  --line: #E6D7C9;
  --red-stamp: #B83A38;
}

* { box-sizing: border-box; }
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-family: var(--sans);
  color: var(--ink);
  background:
    radial-gradient(1100px 600px at 85% -10%, var(--ground-2), transparent 60%),
    radial-gradient(900px 700px at -10% 100%, var(--ground-2), transparent 55%),
    var(--ground);
  background-attachment: fixed;
  overflow-x: hidden;
}

/* Base style cho Màn khóa (Gate) */
#gate {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 5vw, 2.5rem);
}
.gate-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: clamp(1.5rem, 6vw, 3rem);
  width: 100%;
  max-width: 460px;
  text-align: center;
  box-shadow: 
    0 10px 30px -10px rgba(69, 54, 62, 0.08),
    0 1px 3px rgba(69, 54, 62, 0.03);
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.gate-card.leaving {
  opacity: 0;
  transform: translateY(-50px);
  transition: opacity 0.5s, transform 0.5s;
}
.gate-card.shake {
  animation: gateShake 0.5s ease-in-out;
}
@keyframes gateShake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}

.crest {
  font-family: var(--serif);
  font-size: 2.2rem;
  font-style: italic;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 0.5rem;
}
.eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent-deep);
  margin: 0 0 1rem;
}
h1 {
  font-family: var(--serif);
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  font-weight: 600;
  margin: 0 0 1rem;
  line-height: 1.25;
}
h1.script {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  color: var(--accent-deep);
}
.gate-seal {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 2rem;
}

.gate-form label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-soft);
  margin-bottom: 0.75rem;
}
.dob-selects {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.dob-sep {
  color: var(--line);
  font-size: 1.2rem;
}

/* Custom Select */
.custom-select {
  position: relative;
  width: 90px;
  height: 42px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 6px;
  font-size: 0.95rem;
  text-align: left;
  outline: none;
  cursor: pointer;
  user-select: none;
}
#dob-year.custom-select {
  width: 110px;
}
.custom-select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(169, 138, 80, 0.15);
}
.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.8rem;
  height: 100%;
}
.select-trigger::after {
  content: '';
  width: 0; height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid var(--ink-soft);
  margin-left: 4px;
  transition: transform 0.2s ease;
}
.custom-select.open .select-trigger::after {
  transform: rotate(180deg);
}
.select-options {
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
  box-shadow: 0 4px 12px rgba(69, 54, 62, 0.08);
}
.custom-select.open .select-options {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.option {
  padding: 0.6rem 0.8rem;
  transition: background 0.15s, color 0.15s;
}
.option:hover {
  background: var(--ground-2);
}
.option.selected {
  background: var(--accent);
  color: #fff;
}

button {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 2rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  letter-spacing: 0.05em;
}
button:hover {
  background: var(--accent-deep);
}
button:active {
  transform: scale(0.98);
}

#gate-error {
  color: #c94b4b;
  font-size: 0.85rem;
  margin-top: 1rem;
  min-height: 1.2rem;
}

/* Màn thiệp mời (Invite) */
#invite {
  max-width: 600px;
  margin: 0 auto;
  padding: clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem) 6rem;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 8vw, 4rem);
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000), 
              transform 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000);
}
.reveal.inview {
  opacity: 1;
  transform: translateY(0);
}

/* Sky container for animation */
#sky {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  pointer-events: none;
  z-index: 999;
  overflow: hidden;
}

/* Confetti & Petals */
.confetti {
  position: absolute;
  width: 6px; height: 12px;
  background: var(--c);
  opacity: 0.8;
  left: var(--x);
  top: -20px;
  transform: rotate(var(--r));
  animation: fall var(--d) linear forwards;
}
@keyframes fall {
  to {
    top: 105vh;
    transform: translateY(0) rotate(720deg);
  }
}

.petal {
  position: absolute;
  width: 14px; height: 9px;
  background: var(--accent);
  border-radius: 50% 0 50% 50%;
  opacity: 0.3;
  left: var(--x);
  top: -20px;
  transform: rotate(45deg);
  animation: petalFall var(--d) linear infinite;
  animation-delay: var(--delay);
}
@keyframes petalFall {
  0% { top: -20px; transform: translateX(0) rotate(0deg); }
  50% { transform: translateX(80px) rotate(180deg); }
  100% { top: 105vh; transform: translateX(-40px) rotate(360deg); }
}

/* Header Hero */
.hero {
  text-align: center;
  padding: 2rem 0;
}
.fullname {
  font-size: 1.2rem;
  letter-spacing: 0.05em;
  color: var(--ink-soft);
  margin: 0.5rem 0 1.5rem;
}
.hero-line {
  font-family: var(--serif);
  font-size: clamp(1.15rem, 3.5vw, 1.35rem);
  line-height: 1.6;
  max-width: 460px;
  margin: 0 auto;
}

/* Flight Path Scene */
.moment.flight-path {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}
.decor-container {
  position: relative;
  height: 180px;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px dashed var(--line);
}
.flight-svg {
  width: 100%;
  height: 100%;
}
.city-label {
  position: absolute;
  bottom: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--accent-deep);
}
.city-label.sgn { left: 10px; }
.city-label.mel { right: 10px; }
.moment-caption {
  font-size: 0.8rem;
  color: var(--ink-soft);
  margin-top: 1rem;
  font-style: italic;
}
.paper-plane {
  offset-path: path("M30,170 C100,100 150,50 200,100 C250,150 300,80 370,30");
  offset-rotate: auto 180deg;
  animation: flyAlongPath 8s linear infinite;
}
@keyframes flyAlongPath {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}

/* Boarding Pass */
.boarding-pass {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 8px 24px -8px rgba(169, 138, 80, 0.12);
  overflow: hidden;
  position: relative;
}
.ticket-header {
  background: var(--ground-2);
  padding: 1rem 1.5rem;
  border-bottom: 1px dashed var(--line);
}
.brand {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  font-weight: 600;
  color: var(--accent-deep);
}
.ticket-title {
  font-family: var(--serif);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.25rem 0;
}
.ticket-copy {
  font-size: 0.6rem;
  color: var(--ink-soft);
}
.ticket-body {
  padding: 1.5rem;
  position: relative;
}
.ticket-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.ticket-row {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--ground-2);
  padding-top: 0.5rem;
}
.ticket-row.no-border {
  border: none;
  padding: 0;
}
.ticket-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  border-top: 1px solid var(--ground-2);
  padding-top: 0.75rem;
}
.label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ink-soft);
  display: block;
  margin-bottom: 0.2rem;
}
.value {
  font-weight: 600;
  font-size: 0.95rem;
}
.value.serial {
  font-family: monospace;
  color: var(--accent-deep);
}
.value.block {
  display: block;
}
.value-sub {
  font-size: 0.75rem;
  color: var(--ink-soft);
}
.ticket-footer {
  background: var(--ground-2);
  padding: 0.75rem 1.5rem;
  font-size: 0.75rem;
  text-align: center;
  border-top: 1px solid var(--line);
  color: var(--accent-deep);
  font-weight: 600;
}
.stamp {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 80px; height: 80px;
  border: 2px solid var(--red-stamp);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-15deg);
  opacity: 0.75;
  color: var(--red-stamp);
  font-size: 0.55rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

/* Thư Tay (Letter Section) */
.letter-section {
  padding: 1rem 0;
}
.letter-paper {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: clamp(2rem, 8vw, 3.5rem);
  box-shadow: 
    0 15px 35px -15px rgba(69, 54, 62, 0.05),
    0 1px 3px rgba(69, 54, 62, 0.02);
  position: relative;
}
.letter-paper::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 4px;
  background: repeating-linear-gradient(90deg, var(--accent), var(--accent) 15px, var(--accent-deep) 15px, var(--accent-deep) 30px);
  border-radius: 8px 8px 0 0;
}
.letter-crest {
  font-size: 1.8rem;
  color: var(--accent);
  text-align: center;
  margin-bottom: 1rem;
}
.letter-paper h2 {
  font-family: var(--serif);
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 0 0 2rem;
}
.letter-content {
  font-family: var(--serif);
  font-size: clamp(1.1rem, 3.5vw, 1.25rem);
  line-height: 1.7;
  color: var(--ink);
}
.letter-content p {
  margin: 0 0 1.5rem;
}
.letter-content p.placeholder {
  color: var(--ink-soft);
  font-style: italic;
}
.letter-signature {
  margin-top: 3rem;
  text-align: right;
  font-family: var(--serif);
}
.sig-title {
  font-style: italic;
  margin-bottom: 0.5rem;
  color: var(--ink-soft);
}
.sig-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--accent-deep);
  margin: 0;
}

/* Event Details Footer */
.event-details {
  margin-top: 2rem;
}
.detail-card {
  background: var(--ground-2);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
}
.detail-card h3 {
  font-family: var(--serif);
  font-size: 1.2rem;
  letter-spacing: 0.1em;
  margin: 0 0 1.5rem;
  color: var(--accent-deep);
}
.detail-item {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}
.thank-you {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.2rem;
  margin-top: 2rem;
  color: var(--accent-deep);
}

@media (max-width: 480px) {
  .dob-selects {
    gap: 0.25rem;
  }
  .custom-select {
    width: 80px;
    font-size: 0.85rem;
  }
  #dob-year.custom-select {
    width: 95px;
  }
  .select-trigger {
    padding: 0 0.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  .paper-plane {
    animation: none !important;
    offset-distance: 80% !important;
  }
  .petal, .confetti {
    display: none !important;
  }
}
</style>

<script>
(() => {
  const normDob = s => s.replace(/[^0-9]/g, '');

  const gate = document.getElementById('gate');
  const card = document.getElementById('gate-card');
  const form = document.getElementById('gate-form');
  const errEl = document.getElementById('gate-error');
  const invite = document.getElementById('invite');
  const sky = document.getElementById('sky');

  const daySel = document.getElementById('dob-day');
  const monthSel = document.getElementById('dob-month');
  const yearSel = document.getElementById('dob-year');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Xử lý custom select
  document.querySelectorAll('.custom-select').forEach(select => {
    const trigger = select.querySelector('.select-trigger');
    const options = select.querySelectorAll('.option');

    trigger.addEventListener('click', (ev) => {
      ev.stopPropagation();
      document.querySelectorAll('.custom-select').forEach(s => {
        if (s !== select) s.classList.remove('open');
      });
      select.classList.toggle('open');
    });

    select.addEventListener('keydown', (ev) => {
      if (ev.key === ' ' || ev.key === 'Enter') {
        ev.preventDefault();
        trigger.click();
      } else if (ev.key === 'Escape') {
        select.classList.remove('open');
      }
    });

    options.forEach(opt => {
      opt.addEventListener('click', (ev) => {
        ev.stopPropagation();
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        trigger.querySelector('span').textContent = opt.textContent;
        select.dataset.value = opt.getAttribute('data-value');
        select.classList.remove('open');
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select').forEach(s => s.classList.remove('open'));
  });

  const getDobValue = () => {
    const day = daySel.dataset.value || '';
    const month = monthSel.dataset.value || '';
    const year = yearSel.dataset.value || '';
    if (!day || !month || !year) return '';
    return day + month + year;
  };

  function fail(msg) {
    errEl.textContent = msg;
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
  }

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const dob = getDobValue();
    if (dob.length !== 8) return fail(LOI_CHUA_DU);
    
    const day = +dob.slice(0, 2), month = +dob.slice(2, 4);
    if (day < 1 || day > 31 || month < 1 || month > 12) return fail(LOI_KHONG_CO);

    // Chặn nếu là ngày sinh của khách mời thiết kế riêng
    if (CHAN_DANH_SACH.includes(dob)) return fail(LOI_SAI);

    openInvite();
  });

  function openInvite() {
    card.classList.add('leaving');
    setTimeout(() => {
      gate.remove();
      invite.hidden = false;
      window.scrollTo(0, 0);
      watchReveals();
      if (!reduceMotion) { confettiBurst(); startPetals(); }
    }, 620);
  }

  function watchReveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('inview');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  function confettiBurst() {
    const colors = ['--accent', '--accent-deep', '--line', '--ground-2'];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.setProperty('--x', Math.random() * 100 + 'vw');
      c.style.setProperty('--d', (1.8 + Math.random() * 1.6) + 's');
      c.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
      c.style.setProperty('--c', "var(" + colors[i % colors.length] + ")");
      c.style.animationDelay = Math.random() * 0.4 + 's';
      sky.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }
  }

  function startPetals() {
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.style.setProperty('--x', Math.random() * 100 + 'vw');
      p.style.setProperty('--s', 8 + Math.random() * 10);
      p.style.setProperty('--d', (8 + Math.random() * 8) + 's');
      p.style.setProperty('--delay', (-Math.random() * 16) + 's');
      sky.appendChild(p);
    }
  }

  // Hỗ trợ letter-mode (?m=...)
  const autoDob = new URLSearchParams(location.search).get('m');
  const letterMode = document.getElementById('letter-mode');
  const letterOpen = document.getElementById('lm-open');
  if (autoDob && autoDob.length === 8 && !CHAN_DANH_SACH.includes(normDob(autoDob))) {
    form.style.display = 'none';
    document.getElementById('gate-seal').style.display = 'none';
    letterMode.hidden = false;
  }
  letterOpen.addEventListener('click', openInvite);

})();
</script>

${fontBlock}
</body>
</html>`;

fs.writeFileSync(chungPath, template, 'utf8');
console.log('Đã tạo thành công guests/chung.html với font nhúng.');
