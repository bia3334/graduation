const fs = require('fs');
const path = require('path');

function getFontsCSS() {
  try {
    return fs.readFileSync(path.join(__dirname, '..', 'fonts.css'), 'utf8');
  } catch (e) {
    console.error('Warning: fonts.css not found, font face will be empty.', e);
    return '/* fonts.css not found */';
  }
}

const fontsCSS = getFontsCSS();

const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Lễ Tốt Nghiệp Monash - Cầu Truyền Hình Đặc Biệt Gửi Mẹ</title>
</head>
<body>

  <!-- CÀI ĐẶT: Các giá trị chủ nhà có thể sửa đổi bằng tay -->
  <script>
    // Ngày sinh của Mẹ (Định dạng: dd/mm/yyyy). Mẹ nhập đúng ngày sinh để mở khóa thiệp.
    const NGAY_SINH = '30/10/1975'; 

    // Các câu thông báo lỗi tiếng Việt
    const LOI_CHUA_DU = 'Mẹ yêu ơi, vui lòng chọn đầy đủ ngày, tháng và năm sinh nha!';
    const LOI_KHONG_CO = 'Ngày sinh này không tồn tại rồi Mẹ ơi, Mẹ kiểm tra lại nhé!';
    const LOI_SAI = 'Ngày sinh chưa chính xác rồi Mẹ ơi. Mẹ chọn lại nha! ❤️';
  </script>

  <!-- Màn khóa cổng chào (DOB Gate) -->
  <div id="gate" aria-label="Màn hình khóa xác nhận ngày sinh">
    <div class="gate-card" id="gate-card">
      <div class="gate-icon" aria-hidden="true">🎖️</div>
      <h2 class="gate-title">Cầu Truyền Hình Đặc Biệt</h2>
      <p class="gate-seal" id="gate-seal">Chào Mẹ yêu kính của con! Mẹ vui lòng chọn ngày sinh của Mẹ để kết nối tín hiệu nhé.</p>

      <form class="gate-form" id="gate-form">
        <label>Ngày sinh của Mẹ</label>
        <div class="dob-selects">
          <!-- Ngày -->
          <div class="custom-select" id="dob-day" data-value="" tabindex="0">
            <div class="select-trigger"><span>Ngày</span></div>
            <div class="select-options">
              ${Array.from({ length: 31 }, (_, i) => {
                const d = String(i + 1).padStart(2, '0');
                return `<div class="option" data-value="${d}">${d}</div>`;
              }).join('\n              ')}
            </div>
          </div>
          <span class="dob-sep">/</span>
          <!-- Tháng -->
          <div class="custom-select" id="dob-month" data-value="" tabindex="0">
            <div class="select-trigger"><span>Tháng</span></div>
            <div class="select-options">
              ${Array.from({ length: 12 }, (_, i) => {
                const m = String(i + 1).padStart(2, '0');
                return `<div class="option" data-value="${m}">${m}</div>`;
              }).join('\n              ')}
            </div>
          </div>
          <span class="dob-sep">/</span>
          <!-- Năm -->
          <div class="custom-select" id="dob-year" data-value="" tabindex="0">
            <div class="select-trigger"><span>Năm</span></div>
            <div class="select-options">
              ${Array.from({ length: 60 }, (_, i) => {
                const y = String(1945 + i);
                return `<div class="option" data-value="${y}">${y}</div>`;
              }).reverse().join('\n              ')}
            </div>
          </div>
        </div>

        <button type="submit">Kết Nối Tín Hiệu</button>
        <p id="gate-error" role="alert"></p>
      </form>
    </div>
  </div>

  <!-- Nội dung thiệp chính (Bị ẩn lúc đầu) -->
  <main id="invite" hidden>
    
    <!-- Tiêu đề mở đầu trang trọng và ấm cúng -->
    <header class="hero">
      <span class="script" aria-hidden="true">Gửi Mẹ yêu kính của con,</span>
      <h1>Lễ Tốt Nghiệp</h1>
      <p class="fullname">MONASH UNIVERSITY CLAYTON</p>
      <p class="hero-line">Tín hiệu phát sóng trực tiếp từ Melbourne gửi về điểm cầu Tổ Ấm Việt Nam.</p>
    </header>

    <!-- Vé mời cầu truyền hình thiết kế đặc sắc -->
    <section class="pass" aria-label="Vé mời cầu truyền hình">
      <div class="pass-main">
        <div class="pass-header">
          <div class="broadcast-brand">
            <span class="logo-icon">📡</span>
            <span>MONASH GRAD·26 SPECIAL LIVE</span>
          </div>
          <div class="class-badge">ĐẠI DIỆN DANH DỰ / HONORED MOTHER</div>
        </div>

        <div class="route">
          <div class="port">
            <span class="code">MEL</span>
            <span class="port-name">Monash Clayton</span>
          </div>
          <div class="route-path">
            <div class="route-line-inner"></div>
            <span class="pulse-icon">📡</span>
          </div>
          <div class="port right">
            <span class="code">VN</span>
            <span class="port-name">Tổ Ấm Yêu Thương</span>
          </div>
        </div>

        <dl class="pass-grid">
          <div class="wide">
            <dt>Khách mời danh dự / Honored Guest</dt>
            <dd class="guest-name">MẸ YÊU KÍNH - NỮ QUÂN NHÂN KIÊN TRUNG</dd>
          </div>
          <div>
            <dt>Chương trình / Show</dt>
            <dd>Lễ Tốt Nghiệp</dd>
          </div>
          <div>
            <dt>Điểm cầu / Station</dt>
            <dd>Trực Tiếp (Live)</dd>
          </div>
          <div>
            <dt>Đường truyền / Line</dt>
            <dd>Độc quyền (VIP)</dd>
          </div>
          <div>
            <dt>Ngày phát sóng / Date</dt>
            <dd>Sẽ cập nhật</dd>
          </div>
          <div>
            <dt>Giờ phát sóng / Time</dt>
            <dd>Sẽ cập nhật</dd>
          </div>
          <div class="wide">
            <dt>Điểm xuất phát / From</dt>
            <dd>Monash University - Clayton Campus, Melbourne</dd>
          </div>
        </dl>
      </div>

      <!-- Cuống vé kỷ niệm -->
      <div class="pass-stub">
        <div class="stub-header">
          <span>CUỐNG VÉ KỶ NIỆM / MEMORY STUB</span>
        </div>
        <div class="stub-route">
          <span class="stub-code">MEL</span>
          <span class="stub-arrow">➔</span>
          <span class="stub-code">VN</span>
        </div>
        <div class="stub-info">
          <div>
            <span class="stub-label">Khách mời:</span>
            <span class="stub-val">Mẹ yêu kính ❤️</span>
          </div>
          <div>
            <span class="stub-label">Nhiệm vụ:</span>
            <span class="stub-val">Quyết Thắng & Yêu Con</span>
          </div>
        </div>
        <div class="barcode-area">
          <div class="barcode"></div>
          <span class="barcode-num">MILITARY-MOTHER-GRAD2026</span>
        </div>
        <p class="stub-note">Mẹ không thể sang nước ngoài vì nhiệm vụ trên vai, nhưng con sẽ mang cả lễ tốt nghiệp về bên Mẹ!</p>
      </div>
    </section>

    <!-- Cảnh 1: Cầu truyền hình kết nối phương xa -->
    <section class="moment reveal" aria-label="Cầu truyền hình phương xa">
      <div class="broadcast-container">
        <svg class="signal-bridge" viewBox="0 0 600 240" aria-hidden="true">
          <!-- Đường truyền tín hiệu uốn lượn -->
          <path d="M 100,140 C 200,40 400,40 500,140" fill="none" stroke="var(--accent-gold)" stroke-width="2.5" stroke-dasharray="8 6" stroke-linecap="round" opacity="0.8"/>
          
          <!-- Điểm cầu Melbourne (Monash) -->
          <g class="station st-mel" transform="translate(100, 140)">
            <circle cx="0" cy="0" r="16" fill="var(--accent)" />
            <circle cx="0" cy="0" r="24" fill="none" stroke="var(--accent)" stroke-width="1.5" class="wave-ring" />
            <circle cx="0" cy="0" r="34" fill="none" stroke="var(--accent)" stroke-width="1" class="wave-ring-delayed" />
            <!-- Mũ tốt nghiệp nhỏ xinh vẽ vector -->
            <path d="M-10,-5 L0,-10 L10,-5 L0,0 Z" fill="var(--accent-gold)" />
            <path d="M-6,-2 L-6,4 C-6,6 6,6 6,4 L6,-2" fill="var(--accent-gold)" />
            <path d="M10,-5 L12,4 L11,4 Z" fill="var(--accent-gold)" />
            <text x="0" y="-38" text-anchor="middle" class="svg-label">Monash (MEL)</text>
          </g>

          <!-- Điểm cầu Việt Nam -->
          <g class="station st-vn" transform="translate(500, 140)">
            <circle cx="0" cy="0" r="16" fill="var(--accent-military)" />
            <circle cx="0" cy="0" r="24" fill="none" stroke="var(--accent-military)" stroke-width="1.5" class="wave-ring" />
            <circle cx="0" cy="0" r="34" fill="none" stroke="var(--accent-military)" stroke-width="1" class="wave-ring-delayed" />
            <!-- Ngôi sao quân kỳ lấp lánh vẽ vector -->
            <polygon points="0,-9 2.5,-3 8.5,-3 3.5,1 5.5,7 0,3.5 -5.5,7 -3.5,1 -8.5,-3 -2.5,-3" fill="var(--accent-gold)" />
            <text x="0" y="-38" text-anchor="middle" class="svg-label">Tổ Ấm (VN)</text>
          </g>

          <!-- Tín hiệu xung mạch truyền tải tình yêu -->
          <g class="signal-pulse">
            <!-- Hình quả tim đỏ chạy dọc đường truyền -->
            <path d="M0 3 C -4 -2, -8 1, 0 8 C 8 1, 4 -2, 0 3" fill="var(--accent)" transform="scale(1.6) translate(-2, -4)" />
          </g>
        </svg>
      </div>
      <p class="moment-cap">Khoảng cách địa lý không thể ngăn được nhịp đập tự hào từ Việt Nam hướng về Melbourne.</p>
    </section>

    <!-- Cảnh 2: Quân phục & Áo cử nhân kề bên chú mèo nhỏ -->
    <section class="moment reveal" aria-label="Bộ đồ quân phục và đồ cử nhân">
      <div class="cat-military-container">
        <svg class="cat-military-svg" viewBox="0 0 500 350" aria-hidden="true">
          <!-- Bát bóng đổ dưới đất -->
          <ellipse cx="250" cy="290" rx="190" ry="18" fill="var(--line)" opacity="0.45" />

          <!-- MÓC TREO + BỘ ĐỒ QUÂN NHÂN (Nữ quân nhân kiên trung) -->
          <g class="military-suit" transform="translate(140, 45)">
            <!-- Bóng đổ riêng -->
            <ellipse cx="0" cy="245" rx="55" ry="10" fill="#000" opacity="0.12" />
            
            <!-- Móc quần áo phía trên -->
            <path d="M-15,-20 Q0,-45 15,-20 Z" fill="none" stroke="var(--accent-gold)" stroke-width="2.5" />
            <path d="M0,-40 Q0,-55 10,-55" fill="none" stroke="var(--accent-gold)" stroke-width="2.5" stroke-linecap="round" />
            
            <!-- Quân mũ kê-pi đặt bên trên móc treo áo -->
            <g class="military-hat-on-suit" transform="translate(0, -60) scale(0.8)">
              <path d="M-55,20 C-55,-40 55,-40 55,20 C55,42 -55,42 -55,20 Z" fill="var(--accent-military)" stroke="var(--accent-military-deep)" stroke-width="2" />
              <path d="M-57,18 C-30,28 30,28 57,18 L55,28 C30,38 -30,38 -55,28 Z" fill="#20251F" />
              <circle cx="-50" cy="23" r="4" fill="var(--accent-gold)" />
              <circle cx="50" cy="23" r="4" fill="var(--accent-gold)" />
              <path d="M-48,27 C-30,48 30,48 48,27 C36,36 -36,36 -48,27 Z" fill="#121611" />
              <circle cx="0" cy="-6" r="10" fill="#CC2E2E" stroke="var(--accent-gold)" stroke-width="1" />
              <polygon points="0,-13 2.5,-7 8,-7 3.5,-3.5 5,-1.5 0,-4.5 -5,-1.5 -3.5,-3.5 -8,-7 -2.5,-7" fill="var(--accent-gold)" />
            </g>

            <!-- Thân áo khoác quân đội (Dark Olive Green) -->
            <!-- Cổ áo & Thân chính -->
            <path d="M-45,0 L45,0 L50,15 L52,80 L48,230 L-48,230 L-52,80 L-50,15 Z" fill="var(--accent-military)" stroke="var(--accent-military-deep)" stroke-width="2" />
            
            <!-- Cổ áo sơ mi xanh nhạt bên trong -->
            <polygon points="-12,0 -16,22 0,38 16,22 12,0" fill="#B4CBB7" />
            <!-- Cà vạt đen -->
            <polygon points="-4,22 4,22 6,65 0,72 -6,65" fill="#1C1E22" />
            
            <!-- Ve áo quân đội bẻ góc -->
            <polygon points="-12,0 -42,16 -24,42 -12,24" fill="var(--accent-military-deep)" stroke="var(--accent-military)" stroke-width="1" />
            <polygon points="12,0 42,16 24,42 12,24" fill="var(--accent-military-deep)" stroke="var(--accent-military)" stroke-width="1" />

            <!-- Cấp hiệu cổ áo (Cổ đỏ nhỏ thêu vàng) -->
            <!-- Trái -->
            <polygon points="-38,18 -30,22 -20,10 -28,6" fill="#CC2E2E" stroke="var(--accent-gold)" stroke-width="0.8" />
            <circle cx="-28" cy="14" r="2.5" fill="var(--accent-gold)" />
            <!-- Phải -->
            <polygon points="38,18 30,22 20,10 28,6" fill="#CC2E2E" stroke="var(--accent-gold)" stroke-width="0.8" />
            <circle cx="28" cy="14" r="2.5" fill="var(--accent-gold)" />

            <!-- CẤP HIỆU VAI (Quân hàm Thượng tá: 2 vạch ngang vàng ở cuối, 3 ngôi sao vàng dọc thẳng hàng) -->
            <!-- Epaulet Trái -->
            <g transform="translate(-46, -4) rotate(-10)">
              <!-- Thân quân hàm ngũ giác nhọn đầu -->
              <path d="M 0,0 L 10,6 L 10,42 L -10,42 L -10,6 Z" fill="var(--accent-gold)" stroke="#CC2E2E" stroke-width="1.8" />
              <!-- Cúc đồng thắt đầu quân hàm -->
              <circle cx="0" cy="5" r="2.8" fill="var(--accent-gold-light)" stroke="#8C6E33" stroke-width="0.5" />
              <!-- 3 Ngôi sao vàng dọc thẳng hàng -->
              <!-- Sao 1 (trên) -->
              <polygon points="0,11.8 0.85,14.1 3.1,14.1 1.25,15.4 1.9,17.6 0,16.2 -1.9,17.6 -1.25,15.4 -3.1,14.1 -0.85,14.1" fill="var(--accent-gold-light)" stroke="#8C6E33" stroke-width="0.5" />
              <!-- Sao 2 (giữa) -->
              <polygon points="0,19.8 0.85,22.1 3.1,22.1 1.25,23.4 1.9,25.6 0,24.2 -1.9,25.6 -1.25,23.4 -3.1,22.1 -0.85,22.1" fill="var(--accent-gold-light)" stroke="#8C6E33" stroke-width="0.5" />
              <!-- Sao 3 (dưới) -->
              <polygon points="0,27.8 0.85,30.1 3.1,30.1 1.25,31.4 1.9,33.6 0,32.2 -1.9,33.6 -1.25,31.4 -3.1,30.1 -0.85,30.1" fill="var(--accent-gold-light)" stroke="#8C6E33" stroke-width="0.5" />
              <!-- 2 vạch vàng ngang song song ở cuối quân hàm -->
              <rect x="-8" y="35" width="16" height="2" fill="var(--accent-gold-light)" stroke="#8C6E33" stroke-width="0.5" />
              <rect x="-8" y="38.5" width="16" height="2" fill="var(--accent-gold-light)" stroke="#8C6E33" stroke-width="0.5" />
            </g>
            
            <!-- Epaulet Phải -->
            <g transform="translate(46, -4) rotate(10)">
              <!-- Thân quân hàm ngũ giác nhọn đầu -->
              <path d="M 0,0 L 10,6 L 10,42 L -10,42 L -10,6 Z" fill="var(--accent-gold)" stroke="#CC2E2E" stroke-width="1.8" />
              <!-- Cúc đồng thắt đầu quân hàm -->
              <circle cx="0" cy="5" r="2.8" fill="var(--accent-gold-light)" stroke="#8C6E33" stroke-width="0.5" />
              <!-- 3 Ngôi sao vàng dọc thẳng hàng -->
              <!-- Sao 1 (trên) -->
              <polygon points="0,11.8 0.85,14.1 3.1,14.1 1.25,15.4 1.9,17.6 0,16.2 -1.9,17.6 -1.25,15.4 -3.1,14.1 -0.85,14.1" fill="var(--accent-gold-light)" stroke="#8C6E33" stroke-width="0.5" />
              <!-- Sao 2 (giữa) -->
              <polygon points="0,19.8 0.85,22.1 3.1,22.1 1.25,23.4 1.9,25.6 0,24.2 -1.9,25.6 -1.25,23.4 -3.1,22.1 -0.85,22.1" fill="var(--accent-gold-light)" stroke="#8C6E33" stroke-width="0.5" />
              <!-- Sao 3 (dưới) -->
              <polygon points="0,27.8 0.85,30.1 3.1,30.1 1.25,31.4 1.9,33.6 0,32.2 -1.9,33.6 -1.25,31.4 -3.1,30.1 -0.85,30.1" fill="var(--accent-gold-light)" stroke="#8C6E33" stroke-width="0.5" />
              <!-- 2 vạch vàng ngang song song ở cuối quân hàm -->
              <rect x="-8" y="35" width="16" height="2" fill="var(--accent-gold-light)" stroke="#8C6E33" stroke-width="0.5" />
              <rect x="-8" y="38.5" width="16" height="2" fill="var(--accent-gold-light)" stroke="#8C6E33" stroke-width="0.5" />
            </g>

            <!-- Huy hiệu ribbon huân chương và biển tên trên ngực áo -->
            <!-- Biển tên xanh bên ngực phải -->
            <rect x="-34" y="55" width="22" height="6" fill="#1C385C" stroke="var(--accent-gold)" stroke-width="0.5" />
            <!-- Dải huân chương bên ngực trái -->
            <rect x="12" y="54" width="24" height="8" fill="#CC2E2E" stroke="var(--accent-gold)" stroke-width="0.5" />
            <line x1="20" y1="54" x2="20" y2="62" stroke="#4CAF50" stroke-width="2" />
            <line x1="28" y1="54" x2="28" y2="62" stroke="#FFEB3B" stroke-width="2" />

            <!-- Nẹp cúc giữa (Hàng cúc đồng lớn bóng sáng) -->
            <line x1="0" y1="38" x2="0" y2="230" stroke="var(--accent-military-deep)" stroke-width="1.5" />
            <circle cx="0" cy="72" r="4.5" fill="var(--accent-gold)" stroke="#8C6E33" stroke-width="0.8" />
            <circle cx="0" cy="112" r="4.5" fill="var(--accent-gold)" stroke="#8C6E33" stroke-width="0.8" />
            <circle cx="0" cy="152" r="4.5" fill="var(--accent-gold)" stroke="#8C6E33" stroke-width="0.8" />
            <circle cx="0" cy="192" r="4.5" fill="var(--accent-gold)" stroke="#8C6E33" stroke-width="0.8" />

            <!-- Nắp túi dưới hai bên hông kèm cúc đồng nhỏ -->
            <path d="M-40,150 L-14,150 L-14,166 L-27,174 L-40,166 Z" fill="var(--accent-military-deep)" stroke="var(--accent-military)" stroke-width="1" />
            <circle cx="-27" cy="158" r="3.2" fill="var(--accent-gold)" />
            
            <path d="M40,150 L14,150 L14,166 L27,174 L40,166 Z" fill="var(--accent-military-deep)" stroke="var(--accent-military)" stroke-width="1" />
            <circle cx="27" cy="158" r="3.2" fill="var(--accent-gold)" />
          </g>

          <!-- MÓC TREO + BỘ ĐỒ TỐT NGHIỆP CỬ NHÂN MONASH (Áo thụng Monash) -->
          <g class="grad-suit" transform="translate(360, 50)">
            <!-- Bóng đổ riêng -->
            <ellipse cx="0" cy="235" rx="55" ry="10" fill="#000" opacity="0.12" />
            
            <!-- Móc treo áo -->
            <path d="M-15,-20 Q0,-45 15,-20 Z" fill="none" stroke="var(--accent-gold)" stroke-width="2.5" />
            <path d="M0,-40 Q0,-55 10,-55" fill="none" stroke="var(--accent-gold)" stroke-width="2.5" stroke-linecap="round" />

            <!-- Mũ cử nhân Monash đặt bên trên móc treo áo -->
            <g class="grad-hat-on-suit" transform="translate(0, -60) scale(0.8)">
              <path d="M-28,15 L-28,34 C-28,42 28,42 28,34 L28,15 Z" fill="#1A1E24" />
              <path d="M-28,34 C-28,42 28,42 28,34" fill="none" stroke="var(--accent-gold)" stroke-width="1.2" />
              <polygon points="0,-16 62,-1 0,14 -62,-1" fill="#242B35" stroke="#101318" stroke-width="1.8" />
              <path d="M0,-1 L38,12 L38,32" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" />
              <ellipse cx="38" cy="34" rx="3" ry="5" fill="var(--accent-gold)" />
            </g>

            <!-- Thân áo tốt nghiệp cử nhân màu đen tuyền -->
            <path d="M-38,0 L38,0 L48,15 L52,90 L60,220 L-60,220 L-52,90 L-48,15 Z" fill="#1C1E24" stroke="#101216" stroke-width="1.8" />
            
            <!-- Dải choàng học vị tốt nghiệp của Monash (Monash Graduation Hood) -->
            <!-- Dải choàng màu đỏ đô rủ hai vai thắt chéo ngực -->
            <path d="M-24,0 C-22,35 -26,100 -5,120 L5,120 C26,100 22,35 24,0 L14,0 C12,32 10,85 0,96 C-10,85 -12,32 -14,0 Z" fill="var(--accent)" stroke="var(--accent-deep)" stroke-width="1" />
            <!-- Viền lụa màu vàng gold đặc trưng của dải tốt nghiệp Monash -->
            <path d="M-24,0 C-22,35 -26,100 -5,120 M24,0 C22,35 26,100 5,120" fill="none" stroke="var(--accent-gold)" stroke-width="1.5" />
            
            <!-- Cổ áo sơ mi trắng thò ra bên trong áo thụng -->
            <polygon points="-10,0 -12,12 0,22 12,12 10,0" fill="#FFF" />
          </g>

          <!-- CHÚ MÈO VÀNG NGỒI GIỮA HAI BỘ QUÂN PHỤC VÀ ĐỒ CỬ NHÂN -->
          <g class="sitting-cat" transform="translate(250, 240)">
            <!-- Hoạt ảnh thở nhẹ của thân mèo -->
            <g class="cat-body-breathing">
              <!-- Thân mèo vàng gừng đang ngồi -->
              <path d="M-15,35 C-32,35 -38,12 -28,-4 C-20,-16 -5,-18 5,-15 C15,-12 25,6 20,25 C18,34 5,35 -15,35 Z" fill="#E6A15C" stroke="#B8732E" stroke-width="1.8" />
              <!-- Bụng trắng -->
              <ellipse cx="-4" cy="14" rx="13" ry="17" fill="#FFF8F0" opacity="0.9" />
              <!-- Hai chân trước thon thả -->
              <path d="M-12,18 C-14,35 -10,40 -6,40 C-2,40 -2,25 -6,18 Z" fill="#E6A15C" stroke="#B8732E" stroke-width="1" />
              <path d="M4,18 C6,35 2,40 -2,40 C-6,40 -6,25 -2,18 Z" fill="#E6A15C" stroke="#B8732E" stroke-width="1" />
            </g>
            
            <!-- Chiếc đuôi ngoáy vẫy -->
            <g class="cat-tail-wrapper">
              <path class="cat-tail" d="M12,24 C28,26 38,16 34,2 C32,-6 24,-1 28,6 C32,13 22,18 10,18" fill="none" stroke="#B8732E" stroke-width="5.5" stroke-linecap="round" />
              <path class="cat-tail-inner" d="M12,24 C28,26 38,16 34,2 C32,-6 24,-1 28,6" fill="none" stroke="#E6A15C" stroke-width="3" stroke-linecap="round" />
            </g>

            <!-- Đầu mèo đang ngước nhìn lên với đôi mắt to tròn lấp lánh tự hào -->
            <g class="cat-head-nudge" transform="translate(-2, -22)">
              <circle cx="0" cy="0" r="19" fill="#E6A15C" stroke="#B8732E" stroke-width="1.8" />
              <!-- Tai trái -->
              <polygon points="-14,-10 -24,-28 -4,-17" fill="#D4863B" stroke="#B8732E" stroke-width="1.8" />
              <!-- Tai phải -->
              <polygon points="14,-10 24,-28 4,-17" fill="#D4863B" stroke="#B8732E" stroke-width="1.8" />
              <!-- Đệm tai hồng -->
              <polygon points="-12,-11 -19,-24 -6,-16" fill="#F8BBD0" />
              <polygon points="12,-11 19,-24 6,-16" fill="#F8BBD0" />
              <!-- Mắt tròn long lanh nhìn lên -->
              <circle cx="-6" cy="-2" r="3.5" fill="#3E2723" />
              <circle cx="6" cy="-2" r="3.5" fill="#3E2723" />
              <!-- Điểm sáng long lanh trong mắt -->
              <circle cx="-7.2" cy="-3.2" r="1" fill="#FFF" />
              <circle cx="4.8" cy="-3.2" r="1" fill="#FFF" />
              <!-- Mũi hồng nhỏ -->
              <polygon points="-2,3 2,3 0,1" fill="#E91E63" />
              <!-- Miệng cười chúm chím -->
              <path d="M-4,6 Q-2,9 0,6 Q2,9 4,6" fill="none" stroke="#663C14" stroke-width="1.2" stroke-linecap="round" />
              <!-- Râu mèo má trái và má phải -->
              <path d="M-15,4 L-24,3 M-14,7 L-23,8" stroke="#663C14" stroke-width="0.8" stroke-linecap="round" />
              <path d="M15,4 L24,3 M14,7 L23,8" stroke="#663C14" stroke-width="0.8" stroke-linecap="round" />
            </g>
          </g>
        </svg>
      </div>
      <p class="moment-cap">Bộ sắc phục Thượng tá kiêu hãnh của Mẹ và tấm áo cử nhân Monash của con đặt kề bên nhau, trọn vẹn niềm tự hào.</p>
    </section>

    <!-- Lá thư riêng đầy cảm xúc con viết gửi Mẹ -->
    <section class="letter reveal">
      <span class="seal" aria-hidden="true"><span class="h">🎖️</span></span>
      <p class="eyebrow">Thư con gửi Mẹ</p>
      
      <!-- ✉️ VIẾT THƯ Ở ĐÂY:
           Xoá câu tạm bên dưới rồi viết thư của bạn thay vào.
           Xuống dòng bằng thẻ <br>
           Khi viết thư thật, đổi class="letter-body placeholder"
           thành class="letter-body" để chữ hết nghiêng. -->
      <p class="letter-body">Gửi Mẹ kính yêu của con,<br><br>Lời đầu tiên, con muốn gửi lời cảm ơn và lòng biết ơn vô hạn tới Mẹ. Dù Mẹ không thể trực tiếp bay sang Melbourne để đứng trên bục giảng tốt nghiệp cùng con, nhưng đối với con, sự đồng hành âm thầm, tình yêu bao la và sự hy sinh suốt bao năm qua của Mẹ chính là động lực lớn nhất giúp con đi đến ngày hôm nay.<br><br>Con chúc Mẹ thật khỏe, bình an, và hãy luôn giữ gìn sức khỏe để tiếp tục chứng kiến những khoảnh khắc huy hoàng của con và Đạt nhé!</p>
    </section>

    <!-- Lời chào cuối kính yêu -->
    <footer class="foot">
      <p class="script">Mẹ luôn là niềm tự hào lớn nhất của cuộc đời con!</p>
      <p>❤️ Con yêu Mẹ vô bờ bến ❤️</p>
    </footer>
  </main>

  <div id="sky" aria-hidden="true"></div>

  <!-- ══ Từ đây trở xuống là thiết kế & hiệu ứng chuyển sắc của thiệp ══ -->
  <style>
  :root {
    color-scheme: light;
    --serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
    --script: 'Charm', cursive;
    --sans: 'Segoe UI', system-ui, -apple-system, sans-serif;

    /* Tông màu đỏ Burgundy truyền cảm xúc nồng ấm & màu Xanh Quân đội danh giá */
    --ground: #FDFBF7;           /* Trắng giấy ngà ấm áp */
    --ground-2: #E8ECE6;         /* Kem pha sắc xanh quân nhu nhạt */
    --card: #FAF9F6;             /* Trắng cát ấm áp */
    --ink: #2C1B1F;              /* Đỏ nho chín sẫm (Rosewood đen) */
    --ink-soft: #634C51;         /* Đỏ tím xám nhạt */
    --accent: #800020;           /* Đỏ Burgundy ấm áp tôn quý */
    --accent-deep: #4A0010;      /* Đỏ đô thẫm sâu đậm */
    --accent-military: #3B4D36;   /* Xanh quân lính lá thông */
    --accent-military-deep: #253322; /* Xanh quân lính thẫm */
    --accent-gold: #C5A059;      /* Vàng đồng đồng phục / nhãn thẻ */
    --accent-gold-light: #EAD09F;/* Vàng đồng sáng */
    --line: #E8E1D5;             /* Kẻ sọc ấm */
    --petal-a: rgba(128, 0, 32, 0.15); /* Cánh hoa đỏ bay lượn */
    --petal-b: rgba(197, 160, 89, 0.25);/* Cánh hoa vàng nhạt */
    --leaf: #556B2F;             /* Lá dừa quân nhu */
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: var(--sans);
    color: var(--ink);
    background:
      radial-gradient(1100px 600px at 85% -10%, var(--ground-2), transparent 60%),
      radial-gradient(900px 700px at -10% 100%, var(--ground-2), transparent 55%),
      var(--ground);
    background-attachment: fixed;
    min-height: 100vh;
    overflow-x: hidden;
  }
  ::selection { background: var(--accent-gold-light); }

  .eyebrow {
    font-family: var(--sans);
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 0.85rem;
    font-weight: 600;
  }

  /* ---------- Màn khóa cổng chào (Gate) ---------- */
  #gate {
    min-height: 100vh;
    display: flex;
    aria-hidden: false;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  #gate.leaving { opacity: 0; transform: translateY(-16px); pointer-events: none; }
  
  .gate-card {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 8px;
    box-shadow: 0 24px 60px -30px rgba(74, 0, 16, 0.25);
    padding: clamp(2rem, 6vw, 3.25rem) clamp(1.5rem, 5vw, 3rem);
    width: 100%;
    max-width: 25.5rem;
    text-align: center;
    position: relative;
  }
  
  /* Lớp viền kép vàng đồng sang trọng của quân kỳ */
  .gate-card::before {
    content: '';
    position: absolute;
    inset: 6px;
    border: 1px double var(--accent-gold);
    border-radius: 4px;
    pointer-events: none;
    opacity: 0.65;
  }
  
  .gate-icon {
    font-size: 2.5rem;
    margin-bottom: 0.65rem;
    filter: drop-shadow(0 4px 6px rgba(197, 160, 89, 0.3));
    display: inline-block;
    animation: pulseIcon 2s infinite ease-in-out;
  }
  @keyframes pulseIcon {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .gate-title {
    font-family: var(--serif);
    font-size: clamp(1.6rem, 6vw, 2.1rem);
    line-height: 1.25;
    margin: 0 0 0.8rem;
    color: var(--accent);
  }
  .gate-seal {
    font-size: 0.88rem;
    color: var(--ink-soft);
    line-height: 1.65;
    margin: 0 0 1.6rem;
    padding: 0 0.5rem;
  }
  .gate-form label {
    display: block;
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-deep);
    margin-bottom: 0.55rem;
    font-weight: 600;
  }

  /* Bộ lọc tùy biến custom select cổ kính */
  .dob-selects {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
    max-width: 19rem;
    margin: 0.4rem auto 0;
  }
  .custom-select {
    position: relative;
    font-family: var(--serif);
    font-size: 1.3rem;
    color: var(--ink);
    width: 5.5rem;
    outline: none;
  }
  .select-trigger {
    border-bottom: 1.5px solid var(--line);
    padding: 0.35rem 1.4rem 0.35rem 0.4rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    white-space: nowrap;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23800020' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.1rem center;
    background-size: 0.7rem;
    transition: border-color 0.25s ease;
  }
  .custom-select.open .select-trigger,
  .custom-select:hover .select-trigger {
    border-bottom-color: var(--accent);
  }
  .select-options {
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 5.5rem;
    max-height: 12rem;
    overflow-y: auto;
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 4px;
    box-shadow: 0 10px 25px -10px rgba(74, 0, 16, 0.25);
    z-index: 10;
    margin-top: 4px;
  }
  .select-options::-webkit-scrollbar {
    width: 4px;
  }
  .select-options::-webkit-scrollbar-track {
    background: transparent;
  }
  .select-options::-webkit-scrollbar-thumb {
    background: var(--line);
    border-radius: 2px;
  }
  .select-options::-webkit-scrollbar-thumb:hover {
    background: var(--accent-gold);
  }
  .custom-select.open .select-options {
    display: block;
  }
  .select-options .option {
    padding: 0.45rem;
    cursor: pointer;
    text-align: center;
    font-size: 1.15rem;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .select-options .option:hover {
    background: var(--ground-2);
    color: var(--accent-deep);
  }
  .select-options .option.selected {
    background: var(--accent);
    color: var(--card);
  }
  .dob-sep {
    font-family: var(--serif);
    font-size: 1.3rem;
    color: var(--line);
    padding: 0 0.1rem;
  }
  .gate-form button {
    display: inline-block;
    margin-top: 1.6rem;
    font-family: var(--sans);
    font-size: 0.76rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--card);
    background: var(--accent-military);
    border: none;
    border-radius: 3px;
    padding: 0.9rem 2.2rem;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(59, 77, 54, 0.25);
    transition: background 0.25s ease, transform 0.15s ease;
  }
  .gate-form button:hover {
    background: var(--accent-military-deep);
  }
  .gate-form button:active {
    transform: translateY(1px);
  }
  .gate-form button:focus-visible,
  .custom-select:focus-visible {
    outline: 2px solid var(--accent-gold);
    outline-offset: 3px;
  }
  #gate-error {
    min-height: 2.6em;
    font-size: 0.82rem;
    line-height: 1.5;
    color: #A34040;
    margin: 0.9rem 0 0;
  }
  .gate-card.shake {
    animation: cardShake 0.4s ease;
  }
  @keyframes cardShake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-8px); }
    40%, 80% { transform: translateX(8px); }
  }

  /* ---------- Thiệp mời ---------- */
  #invite {
    max-width: 36rem;
    margin: 0 auto;
    padding: clamp(2.5rem, 8vh, 4.5rem) 1.25rem 3rem;
    display: flex;
    flex-direction: column;
    gap: clamp(2.5rem, 6vh, 4rem);
    animation: risein 0.9s ease both;
  }
  @keyframes risein { from { opacity: 0; transform: translateY(18px); } }

  .hero { text-align: center; }
  .script {
    font-family: var(--script);
    font-weight: 700;
    color: var(--accent-gold);
    font-size: 1.5rem;
    display: block;
    margin-bottom: 0.5rem;
  }
  .hero h1 {
    font-size: clamp(2.3rem, 9vw, 3.4rem);
    line-height: 1.1;
    margin: 0;
    font-family: var(--serif);
    color: var(--accent);
    letter-spacing: 0.02em;
  }
  .fullname {
    font-family: var(--sans);
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    color: var(--ink-soft);
    margin: 0.6rem 0 0;
    text-transform: uppercase;
  }
  .hero-line {
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.08rem;
    color: var(--ink-soft);
    line-height: 1.7;
    margin: 1.2rem auto 0;
    max-width: 28rem;
  }

  /* Vé phát sóng cầu truyền hình */
  .pass {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 16px;
    box-shadow: 0 30px 60px -35px rgba(74, 0, 16, 0.35);
    overflow: hidden;
    display: flex;
    flex-direction: row;
    position: relative;
  }

  .pass-main {
    flex: 7;
    padding: 1.6rem clamp(1.2rem, 4vw, 2.2rem) 1.8rem;
    border-right: 2.5px dashed var(--line);
    position: relative;
  }

  /* Vết cắt đục lỗ ở mép trên và mép dưới */
  .pass-main::before, .pass-main::after {
    content: '';
    position: absolute;
    right: -11px;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--ground);
    border: 1.5px solid var(--line);
    z-index: 5;
  }
  .pass-main::before { top: -11px; }
  .pass-main::after { bottom: -11px; }

  .pass-stub {
    flex: 3;
    padding: 1.6rem 1.4rem;
    background: linear-gradient(135deg, var(--card), var(--ground-2));
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.9rem;
  }

  .pass-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--line);
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
  }
  .broadcast-brand {
    font-family: var(--sans);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: var(--accent-military);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .broadcast-brand .logo-icon {
    font-size: 0.95rem;
    filter: drop-shadow(0 1px 2px rgba(197, 160, 89, 0.2));
  }
  .class-badge {
    font-family: var(--sans);
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #800020;
    background: #FFF0F2;
    padding: 0.25rem 0.65rem;
    border-radius: 20px;
    border: 1px solid rgba(128, 0, 32, 0.15);
  }

  .route {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 0.6rem 0 1.2rem;
  }
  .port {
    flex: 0 0 auto;
  }
  .port .code {
    display: block;
    font-family: var(--serif);
    font-weight: 700;
    font-size: 2.2rem;
    line-height: 1;
    color: var(--accent);
    letter-spacing: 0.02em;
  }
  .port .port-name {
    display: block;
    font-size: 0.72rem;
    color: var(--ink-soft);
    margin-top: 0.3rem;
  }
  .port.right { text-align: right; }

  .route-path {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .route-line-inner {
    width: 100%;
    height: 1.5px;
    border-top: 1.5px dashed var(--line);
  }
  .route-path .pulse-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--card);
    padding: 0 0.6rem;
    color: var(--accent-gold);
    font-size: 1.15rem;
    animation: starPulse 2.5s infinite ease-in-out;
  }
  @keyframes starPulse {
    0%, 100% { opacity: 0.75; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.18); }
  }

  .pass-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem 0.8rem;
    margin: 0;
    border-top: 1px solid var(--line);
    padding-top: 1.2rem;
  }
  .pass-grid dt {
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-soft);
    margin-bottom: 0.25rem;
    font-weight: 600;
  }
  .pass-grid dd {
    margin: 0;
    font-family: var(--serif);
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--ink);
    line-height: 1.3;
  }
  .pass-grid dd.guest-name {
    color: var(--accent);
    font-size: 1.05rem;
  }
  .pass-grid .wide {
    grid-column: 1 / -1;
  }

  /* Stub styling */
  .stub-header {
    font-family: var(--sans);
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: var(--ink-soft);
    border-bottom: 1px solid var(--line);
    padding-bottom: 0.4rem;
  }
  .stub-route {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0.2rem 0;
  }
  .stub-code {
    font-family: var(--serif);
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--accent-military);
  }
  .stub-arrow {
    color: var(--accent-gold);
    font-size: 0.9rem;
  }
  .stub-info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.72rem;
  }
  .stub-label {
    color: var(--ink-soft);
    margin-right: 0.3rem;
  }
  .stub-val {
    font-weight: 600;
    color: var(--ink);
  }
  .barcode-area {
    margin-top: auto;
    text-align: center;
  }
  .barcode {
    height: 38px;
    background: repeating-linear-gradient(90deg,
      var(--ink) 0 2px, transparent 2px 5px,
      var(--ink) 5px 6px, transparent 6px 10px,
      var(--ink) 10px 13px, transparent 13px 16px);
    opacity: 0.75;
    border-radius: 2px;
    margin-bottom: 0.25rem;
  }
  .barcode-num {
    font-family: monospace;
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    color: var(--ink-soft);
  }
  .stub-note {
    margin: 0;
    font-family: var(--serif);
    font-size: 0.76rem;
    color: var(--ink-soft);
    line-height: 1.45;
    border-top: 1px dashed var(--line);
    padding-top: 0.5rem;
    font-style: italic;
  }

  @media (max-width: 768px) {
    .pass {
      flex-direction: column;
    }
    .pass-main {
      border-right: none;
      border-bottom: 2.5px dashed var(--line);
      padding-bottom: 1.8rem;
    }
    .pass-main::before {
      top: auto;
      bottom: -11px;
      left: -11px;
      right: auto;
    }
    .pass-main::after {
      top: auto;
      bottom: -11px;
      right: -11px;
    }
  }

  /* ---------- Các cảnh hiện khi cuộn ---------- */
  .moment { text-align: center; }
  .moment-cap {
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.15rem;
    color: var(--ink-soft);
    margin: 1.3rem 0 0;
    line-height: 1.6;
    padding: 0 1rem;
  }
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .reveal.inview { opacity: 1; transform: none; }

  /* Bố cục cầu truyền hình vector */
  .broadcast-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 240px;
  }
  .signal-bridge {
    width: 100%;
    max-width: 600px;
    height: auto;
    overflow: visible;
  }
  
  .signal-bridge .svg-label {
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    fill: var(--ink-soft);
  }

  /* Hiệu ứng sóng truyền tín hiệu phát sóng */
  .wave-ring, .wave-ring-delayed {
    transform-origin: center;
    opacity: 0;
  }
  .inview .wave-ring {
    animation: ringWave 2.8s infinite cubic-bezier(0.215, 0.610, 0.355, 1);
  }
  .inview .wave-ring-delayed {
    animation: ringWave 2.8s infinite cubic-bezier(0.215, 0.610, 0.355, 1);
    animation-delay: 1.4s;
  }
  @keyframes ringWave {
    0% { transform: scale(0.6); opacity: 0; }
    15% { opacity: 0.75; }
    85% { opacity: 0; }
    100% { transform: scale(1.8); opacity: 0; }
  }

  /* Chạy mạch phát tín hiệu tim dọc đường truyền */
  .signal-pulse {
    offset-path: path('M 100,140 C 200,40 400,40 500,140');
    offset-rotate: auto;
    offset-distance: 0%;
    transform-box: fill-box;
    transform-origin: center;
  }
  .inview .signal-pulse {
    animation: pulseMove 3.6s infinite linear;
  }
  @keyframes pulseMove {
    0% { offset-distance: 0%; opacity: 0; scale: 0.8; }
    10% { opacity: 1; scale: 1; }
    90% { opacity: 1; scale: 1; }
    100% { offset-distance: 100%; opacity: 0; scale: 0.8; }
  }

  /* Cảnh 2: Mèo và Mũ quân phục */
  .cat-military-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 300px;
  }
  .cat-military-svg {
    width: 100%;
    max-width: 360px;
    height: auto;
    overflow: visible;
  }

  /* Các hoạt ảnh tinh tế của chú mèo */
  .cat-tail {
    transform-origin: bottom left;
    transform-box: fill-box;
  }
  .inview .cat-tail {
    animation: tailWag 3.5s infinite ease-in-out alternate;
  }
  @keyframes tailWag {
    0% { transform: rotate(-6deg); }
    100% { transform: rotate(8deg); }
  }

  .cat-body-breathing {
    transform-origin: bottom center;
    transform-box: fill-box;
  }
  .inview .cat-body-breathing {
    animation: catBreath 4s infinite ease-in-out;
  }
  @keyframes catBreath {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02, 0.98); }
  }

  .cat-head-nudge {
    transform-origin: bottom center;
    transform-box: fill-box;
  }
  .inview .cat-head-nudge {
    animation: headNudgeSitting 6s infinite ease-in-out;
  }
  @keyframes headNudgeSitting {
    0%, 100% { transform: rotate(0deg) translateY(0); }
    30% { transform: rotate(1.5deg) translateY(0.5px); }
    60% { transform: rotate(-1.5deg) translateY(0); }
  }

  .military-suit, .grad-suit {
    transform-origin: bottom center;
    transform-box: fill-box;
    opacity: 0;
    scale: 0.75;
  }
  .inview .military-suit {
    animation: popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: 0.2s;
  }
  .inview .grad-suit {
    animation: popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: 0.4s;
  }
  @keyframes popIn {
    to { opacity: 1; scale: 1; }
  }

  /* ---------- Lá thư ---------- */
  .letter {
    position: relative;
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: clamp(1.5rem, 5vw, 2.4rem);
    padding-top: clamp(2.2rem, 6vw, 3rem);
    text-align: center;
    box-shadow: 0 20px 50px -35px rgba(74, 0, 16, 0.3);
  }
  
  .letter::before {
    content: '';
    position: absolute;
    inset: 6px;
    border: 1px double var(--accent-gold);
    border-radius: 4px;
    pointer-events: none;
    opacity: 0.45;
  }

  .seal {
    position: absolute;
    top: -23px; left: 50%;
    transform: translateX(-50%);
    width: 46px; height: 46px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, var(--accent-military), var(--accent-military-deep));
    box-shadow: 0 6px 16px -6px rgba(59, 77, 54, 0.5), inset 0 0 0 5px rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-gold);
    font-size: 1.25rem;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  }

  .letter-body {
    font-family: var(--serif);
    font-size: 1.15rem;
    line-height: 1.85;
    margin: 0;
    white-space: pre-line;
    color: var(--ink);
    text-align: justify;
  }
  .letter-body.placeholder {
    font-style: italic;
    color: var(--ink-soft);
    font-size: 1.05rem;
  }

  .foot { text-align: center; padding-bottom: 2rem; }
  .foot .script { font-size: 2rem; margin: 0; color: var(--accent); }
  .foot p { margin: 0.5rem 0 0; font-size: 0.9rem; color: var(--ink-soft); font-weight: 600; }

  /* Cánh hoa & pháo giấy */
  #sky {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 5;
  }
  .petal {
    position: absolute;
    top: -5vh;
    left: var(--x);
    width: calc(var(--s) * 1px);
    height: calc(var(--s) * 1.15px);
    background: radial-gradient(circle at 30% 25%, var(--petal-b), var(--petal-a));
    border-radius: 62% 38% 55% 45% / 48% 62% 38% 52%;
    opacity: 0.9;
    animation: fall var(--d) linear var(--delay) infinite;
  }
  
  @keyframes fall {
    0%   { transform: translate(0, -6vh) rotate(0deg); }
    25%  { transform: translate(3vw, 24vh) rotate(95deg); }
    50%  { transform: translate(-2vw, 52vh) rotate(180deg); }
    75%  { transform: translate(3.5vw, 78vh) rotate(268deg); }
    100% { transform: translate(-1vw, 108vh) rotate(360deg); }
  }
  .confetti {
    position: absolute;
    top: -3vh;
    left: var(--x);
    width: 7px; height: 11px;
    background: var(--c);
    border-radius: 2px;
    animation: drop var(--d) ease-in forwards;
  }
  @keyframes drop {
    to { transform: translateY(110vh) rotate(var(--r)); opacity: 0.7; }
  }

  @media (max-width: 480px) {
    .pass-grid { grid-template-columns: repeat(2, 1fr); }
    .pass-stub { flex-direction: column; text-align: center; gap: 0.8rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    .petal, .confetti { display: none; }
    #invite { animation: none; }
    .reveal { opacity: 1; transform: none; transition: none; }
    .reveal *, .reveal { animation-duration: 0.01s !important; animation-delay: 0s !important; }
  }
  </style>

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

    // Quản lý custom select
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
      }, { threshold: 0.3 });
      document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    }

    function confettiBurst() {
      const colors = ['--petal-a', '--petal-b', '--accent-gold', '--accent-military'];
      for (let i = 0; i < 75; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.setProperty('--x', Math.random() * 100 + 'vw');
        c.style.setProperty('--d', (1.8 + Math.random() * 1.5) + 's');
        c.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
        c.style.setProperty('--c', \`var(\${colors[i % colors.length]})\`);
        c.style.animationDelay = Math.random() * 0.5 + 's';
        sky.appendChild(c);
        setTimeout(() => c.remove(), 4200);
      }
    }

    function startPetals() {
      for (let i = 0; i < 16; i++) {
        const p = document.createElement('div');
        p.className = 'petal';
        p.style.setProperty('--x', Math.random() * 100 + 'vw');
        p.style.setProperty('--s', (Math.random() * 12 + 10));
        p.style.setProperty('--d', (Math.random() * 7 + 6) + 's');
        p.style.setProperty('--delay', (Math.random() * 5) + 's');
        sky.appendChild(p);
      }
    }

    // Nếu đến từ letter.html (link kèm ?m=ngày sinh đúng) thì tự động mở thiệp luôn
    const autoDob = new URLSearchParams(location.search).get('m');
    if (autoDob && normDob(autoDob) === normDob(NGAY_SINH)) {
      openInvite();
    }
  })();
  </script>

  <!-- ĐỪNG SỬA - Font chữ nhúng cơ sở ngầm định -->
  <style>
  ${fontsCSS}
  </style>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '..', 'guests', 'me.html'), htmlContent, 'utf8');
console.log('Successfully generated guests/me.html!');
