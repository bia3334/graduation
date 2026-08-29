const fs = require('fs');
const path = require('path');

const fontsCssPath = path.join(__dirname, '..', 'scratch', 'minh_thu_2_vietnam_fonts.css');
const fontsCss = fs.readFileSync(fontsCssPath, 'utf8');

const htmlContent = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Thiệp mời tốt nghiệp · Minh Thư</title>
</head>
<body>

<!-- ════════════════════════════════════════════════════════════════
     ✏️ CÁCH SỬA THIỆP NÀY (minh-thu-2.html)
     · Mọi câu chữ nằm ngay trong trang bên dưới — thấy chữ nào,
       sửa thẳng chữ đó, lưu file, mở lại trong trình duyệt là xong.
     · Ngày sinh để mở thiệp: sửa trong khối CÀI ĐẶT ngay dưới đây.
     · Lá thư riêng: tìm chữ "✉️ VIẾT THƯ Ở ĐÂY" ở gần cuối trang.
     · Phần <style> và <script> phía dưới là máy móc — không cần đụng.
     ════════════════════════════════════════════════════════════════ -->

<script>
/* ── CÀI ĐẶT ─────────────────────────────────────────────── */
const NGAY_SINH = '31/05/2003';  // Ngày sinh mở thiệp (dd/mm/yyyy)

// Lời báo lỗi ở màn nhập ngày sinh:
const LOI_CHUA_DU  = 'Hãy chọn đủ ngày · tháng · năm, ví dụ 31/05/2003.';
const LOI_KHONG_CO = 'Ngày này không tồn tại — bạn kiểm tra lại nhé!';
const LOI_SAI      = 'Ngày sinh chưa đúng rồi — bạn thử lại nhé!';
</script>

<!-- Nền trời hiệu ứng biểu tượng toán học & dữ liệu -->
<div id="sky" aria-hidden="true"></div>

<!-- ══ MÀN KHÓA — nhập ngày sinh để mở thiệp ══ -->
<main id="gate">
  <div class="gate-card" id="gate-card">
    <div class="math-decoration" aria-hidden="true">
      <span>∫</span><span>π</span><span>σ</span><span>∑</span><span>∞</span>
    </div>
    <div class="crest">GRAD · ’26</div>
    <p class="eyebrow">MATH & DATA SCIENCE EDITION</p>
    <h1>Thiệp mời ngày tốt nghiệp</h1>
    <p class="gate-seal" id="gate-seal">Nhập ngày sinh của bạn để mở thiệp.</p>

    <!-- Chế độ xem thư riêng từ letter.html (?m=31052003) -->
    <div id="letter-mode" hidden>
      <p class="lm-greeting">Thư này dành riêng cho <strong>Minh Thư</strong></p>
      <button type="button" class="btn-open" id="lm-open">Mở xem thiệp</button>
    </div>

    <!-- Form nhập ngày sinh -->
    <form class="gate-form" id="gate-form">
      <label>Ngày sinh của bạn</label>
      <div class="dob-selects">
        <div class="custom-select" id="dob-day" data-value="" tabindex="0">
          <div class="select-trigger"><span>Ngày</span></div>
          <div class="select-options">
            <div class="option" data-value="01">01</div><div class="option" data-value="02">02</div>
            <div class="option" data-value="03">03</div><div class="option" data-value="04">04</div>
            <div class="option" data-value="05">05</div><div class="option" data-value="06">06</div>
            <div class="option" data-value="07">07</div><div class="option" data-value="08">08</div>
            <div class="option" data-value="09">09</div><div class="option" data-value="10">10</div>
            <div class="option" data-value="11">11</div><div class="option" data-value="12">12</div>
            <div class="option" data-value="13">13</div><div class="option" data-value="14">14</div>
            <div class="option" data-value="15">15</div><div class="option" data-value="16">16</div>
            <div class="option" data-value="17">17</div><div class="option" data-value="18">18</div>
            <div class="option" data-value="19">19</div><div class="option" data-value="20">20</div>
            <div class="option" data-value="21">21</div><div class="option" data-value="22">22</div>
            <div class="option" data-value="23">23</div><div class="option" data-value="24">24</div>
            <div class="option" data-value="25">25</div><div class="option" data-value="26">26</div>
            <div class="option" data-value="27">27</div><div class="option" data-value="28">28</div>
            <div class="option" data-value="29">29</div><div class="option" data-value="30">30</div>
            <div class="option" data-value="31">31</div>
          </div>
        </div>
        <span class="dob-sep">/</span>
        <div class="custom-select" id="dob-month" data-value="" tabindex="0">
          <div class="select-trigger"><span>Tháng</span></div>
          <div class="select-options">
            <div class="option" data-value="01">01</div><div class="option" data-value="02">02</div>
            <div class="option" data-value="03">03</div><div class="option" data-value="04">04</div>
            <div class="option" data-value="05">05</div><div class="option" data-value="06">06</div>
            <div class="option" data-value="07">07</div><div class="option" data-value="08">08</div>
            <div class="option" data-value="09">09</div><div class="option" data-value="10">10</div>
            <div class="option" data-value="11">11</div><div class="option" data-value="12">12</div>
          </div>
        </div>
        <span class="dob-sep">/</span>
        <div class="custom-select" id="dob-year" data-value="" tabindex="0">
          <div class="select-trigger"><span>Năm</span></div>
          <div class="select-options">
            <div class="option" data-value="1995">1995</div><div class="option" data-value="1996">1996</div>
            <div class="option" data-value="1997">1997</div><div class="option" data-value="1998">1998</div>
            <div class="option" data-value="1999">1999</div><div class="option" data-value="2000">2000</div>
            <div class="option" data-value="2001">2001</div><div class="option" data-value="2002">2002</div>
            <div class="option" data-value="2003">2003</div><div class="option" data-value="2004">2004</div>
            <div class="option" data-value="2005">2005</div><div class="option" data-value="2006">2006</div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn-open">Mở thiệp ngay</button>
    </form>
    <p class="gate-error" id="gate-error" role="alert"></p>
  </div>
</main>

<!-- ══ THIỆP MỜI CHÍNH — Hiện sau khi mở khóa ══ -->
<main id="invite" hidden>

  <!-- Lời chào & Hero Header -->
  <header class="hero reveal">
    <div class="math-badge">
      <span class="badge-icon">ƒ(x)</span>
      <span class="badge-text">DATA SCIENCE & MATHEMATICS</span>
    </div>
    <p class="eyebrow">Trân trọng kính mời</p>
    <h1 class="hero-name">Gửi Minh Thư</h1>
    <p class="hero-sub">Nhà Khoa Học Dữ Liệu Tương Lai · Hồng Pastel Edition</p>
    <p class="hero-desc">Một cột mốc rực rỡ sắp bắt đầu. Ngày lễ tốt nghiệp của mình sẽ ngập tràn niềm vui và trọn vẹn hơn bao giờ hết khi có Thư cùng xuất hiện!</p>
  </header>

  <!-- Cảnh 1: Mạng Nơ-ron & Đường Hồi Quy Tương Quan (Data Science Scatter Plot) -->
  <section class="scene reveal" aria-label="Biểu đồ tương quan dữ liệu">
    <div class="scene-title-group">
      <span class="scene-tag">SCENE 01 · DATA INSIGHTS</span>
      <h2>Mô Hình Hồi Quy & Điểm Tọa Độ Tương Lai</h2>
      <p class="scene-sub">Mọi tập dữ liệu cuộc sống đều hội tụ về một hàm số tối ưu: Nỗ lực không ngừng tạo nên thành quả rực rỡ.</p>
    </div>

    <div class="chart-container">
      <svg class="data-chart-svg" viewBox="0 0 600 300" aria-hidden="true">
        <!-- Lưới tọa độ graph paper -->
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(244, 114, 182, 0.15)" stroke-width="1.2"/>
          </pattern>
          <linearGradient id="curve-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#F472B6" />
            <stop offset="50%" stop-color="#EC4899" />
            <stop offset="100%" stop-color="#38BDF8" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" rx="16" />

        <!-- Trục tọa độ X & Y -->
        <line x1="50" y1="260" x2="560" y2="260" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
        <line x1="50" y1="40" x2="50" y2="260" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>

        <text x="560" y="282" fill="#64748B" font-size="11" font-weight="600" font-family="'Space Grotesk', sans-serif">Thời Gian (t) →</text>
        <text x="18" y="30" fill="#64748B" font-size="11" font-weight="600" font-family="'Space Grotesk', sans-serif">Tri Thức (y) ↑</text>

        <!-- Các điểm dữ liệu Scatter Plot (Nơ-ron dữ liệu) -->
        <g class="data-nodes">
          <circle cx="90" cy="230" r="6" class="node-dot" />
          <circle cx="140" cy="210" r="7" class="node-dot" />
          <circle cx="190" cy="180" r="6" class="node-dot" />
          <circle cx="250" cy="155" r="8" class="node-dot" />
          <circle cx="310" cy="130" r="6" class="node-dot" />
          <circle cx="370" cy="100" r="7" class="node-dot" />
          <circle cx="440" cy="75" r="8" class="node-dot" />
          <circle cx="510" cy="55" r="9" class="node-dot highlight" />
        </g>

        <!-- Đường cong hồi quy Sigmoid Trend Line -->
        <path id="trend-line" d="M 60 250 Q 200 230 300 130 T 540 50" fill="none" stroke="url(#curve-grad)" stroke-width="4" stroke-linecap="round" />

        <!-- Thẻ Data Callout -->
        <g class="chart-tag" transform="translate(415, 25)">
          <rect width="140" height="40" rx="8" fill="rgba(255, 255, 255, 0.95)" stroke="#F472B6" stroke-width="1.5"/>
          <text x="12" y="17" fill="#3B1F2B" font-size="10" font-weight="700" font-family="'Space Grotesk', sans-serif">OPTIMAL MODEL</text>
          <text x="12" y="30" fill="#EC4899" font-size="10" font-weight="600" font-family="'Space Grotesk', sans-serif">Accuracy: 99.9%</text>
        </g>
      </svg>
    </div>
    
    <div class="insight-cards">
      <div class="insight-card">
        <span class="ins-code">corr(Thư, Math)</span>
        <span class="ins-val">+1.0</span>
        <p class="ins-desc">Sự tương quan hoàn hảo giữa niềm đam mê toán học và những bước tiến dài.</p>
      </div>
      <div class="insight-card">
        <span class="ins-code">loss_function</span>
        <span class="ins-val">→ 0.00</span>
        <p class="ins-desc">Mọi khó khăn thức đêm chạy code đều được tối ưu hóa thành kinh nghiệm quý giá.</p>
      </div>
    </div>
  </section>

  <!-- Cảnh 2: Xoắn Ốc Fibonacci & Các Phương Trình Tốt Nghiệp (Clean Visual Formula Rendering) -->
  <section class="scene reveal" aria-label="Phương trình toán học và xoắn ốc Fibonacci">
    <div class="scene-title-group">
      <span class="scene-tag">SCENE 02 · MATHEMATICAL BEAUTY</span>
      <h2>Vẻ Đẹp Vĩnh Cửu Của Toán Học</h2>
      <p class="scene-sub">Vòng xoắn Fibonacci tượng trưng cho sự tăng trưởng tự nhiên, chuẩn mực và cân bằng.</p>
    </div>

    <div class="fibonacci-layout">
      <!-- SVG Xoắn Ốc Fibonacci -->
      <div class="fibo-box">
        <svg class="fibo-svg" viewBox="0 0 300 200" aria-hidden="true">
          <!-- Hình chữ nhật tỷ lệ vàng -->
          <rect x="10" y="10" width="280" height="180" fill="none" stroke="#F472B6" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>
          <line x1="180" y1="10" x2="180" y2="190" stroke="#F472B6" stroke-width="1" opacity="0.4"/>
          <line x1="180" y1="120" x2="290" y2="120" stroke="#F472B6" stroke-width="1" opacity="0.4"/>
          <line x1="235" y1="120" x2="235" y2="190" stroke="#F472B6" stroke-width="1" opacity="0.4"/>

          <!-- Đường xoắn ốc vàng Fibonacci -->
          <path class="fibo-spiral" d="M 10 190 A 180 180 0 0 1 180 10 A 110 110 0 0 1 290 120 A 70 70 0 0 1 235 190 A 45 45 0 0 1 180 150" fill="none" stroke="#EC4899" stroke-width="3" stroke-linecap="round"/>
          <circle cx="210" cy="140" r="4" fill="#38BDF8" />
        </svg>
        <p class="fibo-cap">Tỷ lệ vàng <strong>φ ≈ 1.618033...</strong> — Sự hoàn hảo trong từng bước tiến.</p>
      </div>

      <!-- Khối các phương trình hạnh phúc (Render Visual Natively) -->
      <div class="eq-grid">
        <div class="eq-card">
          <div class="eq-head">Tích Phân Tốt Nghiệp</div>
          <div class="math-render-box">
            <div class="math-formula">
              <span class="integral-sym">∫</span>
              <div class="int-bounds">
                <span class="bound-top">Melbourne</span>
                <span class="bound-bot">TP. Hồ Chí Minh</span>
              </div>
              <span class="expr">[ Tri Thức(t) · dt ]</span>
              <span class="equal">=</span>
              <span class="result">Tương Lai Rực Rỡ</span>
            </div>
          </div>
          <p class="eq-note">Tích lũy từng ngày học tập để gặt hái trái ngọt tại Melbourne.</p>
        </div>

        <div class="eq-card">
          <div class="eq-head">Hàm Số Tăng Trưởng Hạn Mức</div>
          <div class="math-render-box">
            <div class="math-formula">
              <div class="limit-sym-box">
                <span class="lim-txt">lim</span>
                <span class="lim-sub">t ➔ ∞</span>
              </div>
              <span class="expr">[ Hạnh Phúc(t) ]</span>
              <span class="equal">=</span>
              <span class="result">Cực Đại ∞</span>
            </div>
          </div>
          <p class="eq-note">Niềm vui và sự kiên trì không bị giới hạn bởi bất kỳ tiệm cận nào.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Cảnh 3: Vé Máy Bay Data Terminal (SGN → MEL) -->
  <section class="scene reveal" aria-label="Vé máy bay tốt nghiệp">
    <div class="scene-title-group">
      <span class="scene-tag">SCENE 03 · BOARDING PASS</span>
      <h2>Vé Máy Bay Tốt Nghiệp · SGN ➔ MEL</h2>
      <p class="scene-sub">Hành trình cất cánh đưa Minh Thư đến với giảng đường Monash University Clayton!</p>
    </div>

    <div class="boarding-card">
      <div class="card-top">
        <div class="air-brand">GRADUATION AIRLINES · DATA SCIENCE CLASS</div>
        <div class="flight-no">FLIGHT: GRAD-2026</div>
      </div>

      <div class="card-body">
        <div class="route-display">
          <div class="city">
            <span class="code">SGN</span>
            <span class="name">TP. Hồ Chí Minh</span>
          </div>
          <div class="flight-icon">
            <svg viewBox="0 0 24 24" class="plane-svg" aria-hidden="true">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#EC4899"/>
            </svg>
            <div class="route-line"></div>
          </div>
          <div class="city align-right">
            <span class="code">MEL</span>
            <span class="name">Melbourne</span>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="lbl">Hành khách:</span>
            <span class="val highlight">Minh Thư</span>
          </div>
          <div class="info-item">
            <span class="lbl">Số ghế:</span>
            <span class="val">DATA-01 (VIP)</span>
          </div>
          <div class="info-item">
            <span class="lbl">Điểm đến:</span>
            <span class="val">Monash University - Clayton</span>
          </div>
          <div class="info-item">
            <span class="lbl">Thời gian:</span>
            <span class="val tag-badge">Sẽ cập nhật</span>
          </div>
          <div class="info-item full">
            <span class="lbl">Trạng thái mô hình:</span>
            <span class="val status-ok">● MODEL_OPTIMIZED & READY FOR TAKE OFF</span>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <span class="bar-code">||||||| |||| |||||||| |||||| |||||||||||| ||||||</span>
        <span class="ticket-seal">ĐÃ CHECK-IN</span>
      </div>
    </div>
  </section>

  <!-- Cảnh 4: Thư Riêng Gửi Minh Thư -->
  <section class="scene reveal" aria-label="Bức thư riêng">
    <div class="scene-title-group">
      <span class="scene-tag">SCENE 04 · PERSONAL LETTER</span>
      <h2>Gửi Tới Minh Thư</h2>
    </div>

    <div class="letter-paper">
      <div class="letter-header">
        <span class="stamp-icon">✉️</span>
        <h3>Bức Thư Nhỏ Ngày Tốt Nghiệp</h3>
      </div>
      
      <!-- ✉️ VIẾT THƯ Ở ĐÂY: Chủ nhà sửa nội dung bức thư bên dưới -->
      <div class="letter-content">
        <p class="placeholder">
          Gửi Minh Thư,<br><br>
          Cảm ơn Thư vì đã luôn là một người bạn tuyệt vời với niềm đam mê toán học và khoa học dữ liệu tràn đầy năng lượng! Hành trình tốt nghiệp đại học lần này là minh chứng rõ ràng nhất cho những nỗ lực không ngừng nghỉ của Thư.<br><br>
          Chúc Thư sẽ luôn giữ vững ngọn lửa đam mê, chinh phục mọi mô hình dữ liệu phức tạp nhất, và đạt được thật nhiều thành công rực rỡ tại Melbourne sắp tới! Nhất định phải đến chia vui cùng mình trong ngày tốt nghiệp nhé!
        </p>
      </div>

      <div class="letter-sign">
        <p>Thân ái,</p>
        <p class="sign-name">Người bạn của Thư</p>
      </div>
    </div>
  </section>

  <!-- Cảnh 5: Thông Tin Sự Kiện & Địa Điểm -->
  <section class="scene reveal" aria-label="Thông tin chi tiết lễ tốt nghiệp">
    <div class="event-card">
      <div class="event-head">
        <span class="event-icon">🎓</span>
        <h2>Thông Tin Lễ Tốt Nghiệp</h2>
      </div>

      <div class="event-details">
        <div class="detail-row">
          <span class="dt-icon">📍</span>
          <div class="dt-text">
            <strong>Địa điểm tổ chức:</strong>
            <p>Monash University - Clayton Campus, Melbourne (Úc)</p>
          </div>
        </div>
        <div class="detail-row">
          <span class="dt-icon">📅</span>
          <div class="dt-text">
            <strong>Thời gian cử hành:</strong>
            <p><span class="badge-time">Sẽ cập nhật</span> (Chủ nhà sẽ thông báo mốc giờ chính xác nhất)</p>
          </div>
        </div>
        <div class="detail-row">
          <span class="dt-icon">✨</span>
          <div class="dt-text">
            <strong>Sự có mặt của bạn:</strong>
            <p>Là món quà và niềm hạnh phúc lớn nhất của mình trong mốc kỷ niệm đáng nhớ này!</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <p>GRADUATION 2026 · THIỆP MỜI DÀNH RIÊNG CHO MINH THƯ</p>
    <p class="foot-sub">Designed with Math & Data Science Passion in Pastel Pink 🌸</p>
  </footer>

</main>

<!-- ══ KỊCH BẢN INTERACTION & JS LOGIC ══ -->
<script>
(function () {
  const normDob = s => String(s).replace(/\\D/g, '');

  const daySel = document.getElementById('dob-day');
  const monthSel = document.getElementById('dob-month');
  const yearSel = document.getElementById('dob-year');
  const form = document.getElementById('gate-form');
  const card = document.getElementById('gate-card');
  const errEl = document.getElementById('gate-error');
  const gate = document.getElementById('gate');
  const invite = document.getElementById('invite');
  const sky = document.getElementById('sky');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Custom Select Setup
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
    if (dob !== normDob(NGAY_SINH)) return fail(LOI_SAI);
    openInvite();
  });

  function openInvite() {
    gate.classList.add('leaving');
    setTimeout(() => {
      gate.remove();
      invite.hidden = false;
      window.scrollTo(0, 0);
      watchReveals();
      if (!reduceMotion) { confettiBurst(); spawnFloatingMath(); }
    }, 600);
  }

  // Handle ?m=31052003 parameter for Letter Mode
  const autoDob = new URLSearchParams(location.search).get('m');
  const letterMode = document.getElementById('letter-mode');
  const letterOpen = document.getElementById('lm-open');
  if (autoDob && normDob(autoDob) === normDob(NGAY_SINH)) {
    form.style.display = 'none';
    document.getElementById('gate-seal').style.display = 'none';
    letterMode.hidden = false;
  }
  if (letterOpen) letterOpen.addEventListener('click', openInvite);

  function watchReveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('inview');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  function confettiBurst() {
    const colors = ['#F472B6', '#EC4899', '#38BDF8', '#F59E0B', '#C084FC'];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.backgroundColor = colors[i % colors.length];
      c.style.animationDuration = (2.2 + Math.random() * 1.8) + 's';
      c.style.animationDelay = Math.random() * 0.4 + 's';
      sky.appendChild(c);
      setTimeout(() => c.remove(), 4500);
    }
  }

  function spawnFloatingMath() {
    const symbols = ['∫', '∑', 'π', '∞', 'σ', 'λ', 'f(x)', 'Δ', 'Rⁿ', '101'];
    for (let i = 0; i < 20; i++) {
      const el = document.createElement('span');
      el.className = 'floating-symbol';
      el.textContent = symbols[i % symbols.length];
      el.style.left = Math.random() * 95 + 'vw';
      el.style.animationDuration = (12 + Math.random() * 14) + 's';
      el.style.animationDelay = (-Math.random() * 20) + 's';
      el.style.fontSize = (14 + Math.random() * 16) + 'px';
      sky.appendChild(el);
    }
  }

})();
</script>

<!-- ══ GIANT EMBEDDED FONTS & MAIN CSS STYLES — ĐỪNG SỬA ══ -->
<style>
/* Reset & Base Variables */
:root {
  --bg-gradient: linear-gradient(135deg, #FFF5F7 0%, #FFEBF0 50%, #FFF0F5 100%);
  --card-bg: rgba(255, 255, 255, 0.88);
  --card-border: rgba(244, 114, 182, 0.25);
  --pink-primary: #F472B6;
  --pink-deep: #EC4899;
  --text-dark: #2D1520;
  --text-muted: #6B4656;
  --cyan-accent: #38BDF8;
  --purple-accent: #C084FC;
  --font-sans: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Space Grotesk', -apple-system, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background: var(--bg-gradient);
  color: var(--text-dark);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Sky Background Container */
#sky {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.floating-symbol {
  position: absolute;
  top: 105vh;
  font-family: var(--font-mono);
  color: rgba(236, 72, 153, 0.22);
  font-weight: 600;
  user-select: none;
  animation: floatUp linear infinite;
}

@keyframes floatUp {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-115vh) rotate(360deg); opacity: 0; }
}

.confetti-piece {
  position: absolute;
  top: -20px;
  width: 8px;
  height: 14px;
  border-radius: 3px;
  opacity: 0.85;
  animation: dropConfetti linear forwards;
}

@keyframes dropConfetti {
  to { transform: translateY(105vh) rotate(720deg); opacity: 0; }
}

/* ══ GATE SCREEN ══ */
#gate {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: var(--bg-gradient);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

#gate.leaving {
  opacity: 0;
  transform: scale(0.96);
  pointer-events: none;
}

.gate-card {
  position: relative;
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  max-width: 440px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(244, 114, 182, 0.15);
}

.gate-card.shake {
  animation: shake 0.45s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-10px); }
  40%, 80% { transform: translateX(10px); }
}

.math-decoration {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 1.25rem;
  color: var(--pink-deep);
  opacity: 0.6;
  margin-bottom: 0.75rem;
}

.crest {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--pink-deep);
  margin-bottom: 0.25rem;
}

.eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.gate-card h1 {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.gate-seal {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 1.75rem;
}

.gate-form label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.75rem;
  text-align: left;
}

/* Custom Select Controls */
.dob-selects {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.custom-select {
  position: relative;
  flex: 1;
}

.select-trigger {
  background: #FFF;
  border: 1.5px solid var(--card-border);
  border-radius: 12px;
  padding: 0.65rem 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.custom-select:hover .select-trigger,
.custom-select.open .select-trigger {
  border-color: var(--pink-deep);
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15);
}

.select-options {
  position: absolute;
  top: calc(100% + 6px);
  left: 0; right: 0;
  max-height: 180px;
  overflow-y: auto;
  background: #FFF;
  border: 1px solid var(--card-border);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  display: none;
  z-index: 50;
}

.custom-select.open .select-options {
  display: block;
}

.option {
  padding: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s ease;
}

.option:hover, .option.selected {
  background: #FFEBF0;
  color: var(--pink-deep);
  font-weight: 700;
}

.dob-sep {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: var(--text-muted);
}

.btn-open {
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--pink-primary), var(--pink-deep));
  color: #FFF;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(236, 72, 153, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-open:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(236, 72, 153, 0.4);
}

.gate-error {
  font-size: 0.85rem;
  color: #E11D48;
  margin-top: 1rem;
  min-height: 1.25rem;
  font-weight: 600;
}

#letter-mode {
  margin-bottom: 1.5rem;
}

.lm-greeting {
  font-size: 1.1rem;
  color: var(--text-dark);
  margin-bottom: 1.25rem;
}

/* ══ MAIN INVITE CONTENT ══ */
#invite {
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 0 auto;
  padding: 3rem 1.25rem 5rem;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.inview {
  opacity: 1;
  transform: translateY(0);
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 3rem 1.5rem;
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--card-border);
  border-radius: 28px;
  box-shadow: 0 15px 35px rgba(244, 114, 182, 0.12);
  margin-bottom: 3rem;
}

.math-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #FFEBF0;
  border: 1px solid rgba(244, 114, 182, 0.3);
  border-radius: 20px;
  padding: 0.35rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--pink-deep);
  margin-bottom: 1.25rem;
}

.hero-name {
  font-size: clamp(2.2rem, 6vw, 3.2rem);
  font-weight: 800;
  color: var(--text-dark);
  line-height: 1.2;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #2D1520, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-sub {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--pink-deep);
  margin-bottom: 1.25rem;
}

.hero-desc {
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 580px;
  margin: 0 auto;
}

/* Scenes Common Styles */
.scene {
  margin-bottom: 3.5rem;
}

.scene-title-group {
  margin-bottom: 1.5rem;
}

.scene-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--pink-deep);
  letter-spacing: 1.5px;
  display: block;
  margin-bottom: 0.25rem;
}

.scene-title-group h2 {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 0.35rem;
}

.scene-sub {
  font-size: 0.95rem;
  color: var(--text-muted);
}

/* Scene 1: Scatter Chart */
.chart-container {
  background: #FFF;
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 10px 25px rgba(244, 114, 182, 0.08);
  margin-bottom: 1.25rem;
}

.data-chart-svg {
  width: 100%;
  height: auto;
  display: block;
}

.node-dot {
  fill: var(--pink-primary);
  transition: r 0.3s ease;
}

.node-dot.highlight {
  fill: var(--cyan-accent);
  filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.6));
}

#trend-line {
  stroke-dasharray: 800;
  stroke-dashoffset: 800;
  animation: drawLine 2.5s ease forwards;
}

.reveal.inview #trend-line {
  stroke-dashoffset: 0;
}

@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}

.insight-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.insight-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 1.25rem;
}

.ins-code {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-muted);
  display: block;
}

.ins-val {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--pink-deep);
  margin-bottom: 0.35rem;
  display: block;
}

.ins-desc {
  font-size: 0.85rem;
  color: var(--text-dark);
}

/* Scene 2: Fibonacci & Math Formulas Visual Rendering */
.fibonacci-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .fibonacci-layout {
    grid-template-columns: 1fr 1fr;
  }
}

.fibo-box {
  background: #FFF;
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 1.25rem;
  text-align: center;
}

.fibo-svg {
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 0.5rem;
}

.fibo-spiral {
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
}

.reveal.inview .fibo-spiral {
  animation: drawSpiral 2s ease forwards;
}

@keyframes drawSpiral {
  to { stroke-dashoffset: 0; }
}

.fibo-cap {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.eq-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.eq-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 18px;
  padding: 1.25rem;
}

.eq-head {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--pink-deep);
  margin-bottom: 0.5rem;
}

/* Native Math Visual Formatting (No raw LaTeX code) */
.math-render-box {
  background: #FFF;
  border: 1px solid rgba(244, 114, 182, 0.2);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.math-formula {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-dark);
  flex-wrap: wrap;
  justify-content: center;
}

.integral-sym {
  font-size: 2.2rem;
  line-height: 1;
  color: var(--pink-deep);
  font-weight: 400;
}

.int-bounds {
  display: flex;
  flex-direction: column;
  font-size: 0.68rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--text-muted);
  margin-right: 0.25rem;
}

.int-bounds .bound-top { color: var(--pink-deep); }
.int-bounds .bound-bot { color: var(--text-dark); }

.lim-txt {
  font-weight: 800;
  color: var(--pink-deep);
  font-size: 1.1rem;
}

.lim-sub {
  font-size: 0.68rem;
  display: block;
  color: var(--text-muted);
}

.expr {
  font-family: var(--font-mono);
  color: var(--text-dark);
  font-size: 0.9rem;
}

.equal {
  color: var(--pink-deep);
  font-weight: 700;
}

.result {
  background: #FFEBF0;
  color: var(--pink-deep);
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
}

.eq-note {
  font-size: 0.82rem;
  color: var(--text-muted);
}

/* Scene 3: Boarding Pass */
.boarding-card {
  background: #FFF;
  border: 1px solid var(--card-border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(244, 114, 182, 0.12);
}

.card-top {
  background: linear-gradient(135deg, var(--pink-primary), var(--pink-deep));
  color: #FFF;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
}

.card-body {
  padding: 1.75rem 1.5rem;
}

.route-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
}

.city .code {
  font-family: var(--font-mono);
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-dark);
  display: block;
  line-height: 1;
}

.city .name {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.city.align-right { text-align: right; }

.flight-icon {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 1rem;
}

.plane-svg {
  width: 28px;
  height: 28px;
  transform: rotate(90deg);
  margin-bottom: 0.25rem;
}

.route-line {
  width: 100%;
  height: 2px;
  background: repeating-linear-gradient(90deg, var(--pink-deep) 0 6px, transparent 6px 12px);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  border-top: 1px dashed var(--card-border);
  padding-top: 1.25rem;
}

.info-item.full { grid-column: 1 / -1; }

.info-item .lbl {
  font-size: 0.75rem;
  color: var(--text-muted);
  display: block;
}

.info-item .val {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-dark);
}

.info-item .val.highlight { color: var(--pink-deep); }
.status-ok { color: #10B981 !important; font-family: var(--font-mono); font-size: 0.85rem !important; }

.tag-badge {
  background: #FFEBF0;
  color: var(--pink-deep);
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  font-size: 0.85rem !important;
}

.card-footer {
  background: #FAF5F7;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--card-border);
}

.bar-code {
  font-family: monospace;
  letter-spacing: 2px;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.ticket-seal {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--pink-deep);
  border: 1.5px solid var(--pink-deep);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  transform: rotate(-5deg);
}

/* Scene 4: Personal Letter */
.letter-paper {
  background: #FFFDFE;
  border: 1px solid var(--card-border);
  border-radius: 24px;
  padding: 2rem 1.75rem;
  box-shadow: 0 10px 30px rgba(244, 114, 182, 0.1);
  position: relative;
}

.letter-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid #FFEBF0;
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
}

.letter-header h3 {
  font-size: 1.25rem;
  color: var(--text-dark);
}

.letter-content {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
}

.letter-content .placeholder {
  font-style: normal;
  color: var(--text-dark);
}

.letter-sign {
  text-align: right;
  font-size: 0.95rem;
  color: var(--text-muted);
}

.sign-name {
  font-weight: 700;
  color: var(--pink-deep);
}

/* Scene 5: Event Info */
.event-card {
  background: linear-gradient(135deg, #FFF 0%, #FFEBF0 100%);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  padding: 2rem 1.75rem;
}

.event-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.event-head h2 {
  font-size: 1.4rem;
  color: var(--text-dark);
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.detail-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.dt-icon {
  font-size: 1.4rem;
  line-height: 1;
}

.dt-text strong {
  display: block;
  font-size: 0.95rem;
  color: var(--text-dark);
}

.dt-text p {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.badge-time {
  background: var(--pink-deep);
  color: #FFF;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

/* Footer */
.footer {
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  padding-top: 2rem;
  border-top: 1px opacity 0.3 solid var(--card-border);
}

.foot-sub {
  margin-top: 0.25rem;
  font-size: 0.7rem;
  color: var(--pink-deep);
}

/* Mobile Responsiveness */
@media (max-width: 480px) {
  #invite { padding: 2rem 1rem 4rem; }
  .hero { padding: 2rem 1rem; }
  .gate-card { padding: 2rem 1.25rem; }
  .route-display { flex-direction: column; gap: 1rem; text-align: center; }
  .city.align-right { text-align: center; }
  .plane-svg { transform: rotate(180deg); }
}

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  #trend-line, .fibo-spiral { stroke-dashoffset: 0 !important; animation: none !important; }
  .floating-symbol, .confetti-piece { display: none; }
}

/* Embedded Fonts */
${fontsCss}
</style>

</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'guests', 'minh-thu-2.html'), htmlContent, 'utf8');
console.log('Successfully updated guests/minh-thu-2.html, size:', (htmlContent.length / 1024).toFixed(0), 'KB');
