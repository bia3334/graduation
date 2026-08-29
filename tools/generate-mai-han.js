const fs = require('fs');
const path = require('path');

const catMemeBase64 = fs.readFileSync(path.join(__dirname, '..', 'cat-cat-meme.webp')).toString('base64');
const dancingCatBase64 = fs.readFileSync(path.join(__dirname, '..', 'dancing-cat-dance.webp')).toString('base64');
const kirbyGifBase64 = fs.readFileSync(path.join(__dirname, '..', 'Dance Nintendo GIF by Kéké.gif')).toString('base64');
const fontCss = fs.readFileSync(path.join(__dirname, '..', 'kirby-fonts.css'), 'utf8');

const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Thiệp mời tốt nghiệp · Mai Hân (Cá)</title>
</head>
<body style="margin:0">

<!-- ════════════════════════════════════════════════════════════════
     ✏️  CÁCH SỬA THIỆP NÀY (guests/mai-han.html)
     · Mọi câu chữ nằm ngay trong trang bên dưới — thấy chữ nào,
       sửa thẳng chữ đó, lưu file, mở lại trong trình duyệt là xong.
     · Ngày sinh để mở thiệp: sửa trong khối CÀI ĐẶT ngay dưới đây.
     · Lá thư riêng: tìm chữ "✉️ VIẾT THƯ Ở ĐÂY" ở gần cuối trang.
     · Phần <style> và <script> phía dưới là máy móc — không cần đụng.
     ════════════════════════════════════════════════════════════════ -->

<script>
/* ── CÀI ĐẶT ─────────────────────────────────────────────── */
const NGAY_SINH = '16/09/2003';  // ngày sinh để mở thiệp (dd/mm/yyyy)
const KIRBY_MODE = true;        // hiệu ứng ngôi sao & bóng bọt Kirby

// Lời báo lỗi ở màn nhập ngày sinh:
const LOI_CHUA_DU  = 'Hãy nhập đủ ngày · tháng · năm, ví dụ 16/09/2003.';
const LOI_KHONG_CO = 'Ngày này không tồn tại — bạn kiểm tra lại nhé!';
const LOI_SAI      = 'Ngày sinh chưa đúng rồi — bạn thử lại nhé!';
</script>

<canvas id="kirby-sky" aria-hidden="true"></canvas>

<!-- ══ MÀN KHÓA — nhập ngày sinh để mở thiệp ══ -->
<main id="gate">
  <div class="gate-card" id="gate-card">
    <div class="kirby-crest">🌸 Kirby '26 ⭐️</div>
    <p class="eyebrow">Lễ tốt nghiệp · Monash 2026</p>
    <h1>Thiệp mời tốt nghiệp</h1>
    <p class="gate-seal" id="gate-seal">Nhập ngày sinh của bạn để mở thiệp.</p>
    
    <div id="letter-mode" style="display:none">
      <p class="letter-welcome">Thư này dành riêng cho <strong>Mai Hân (Cá)</strong> 💖✨</p>
      <button type="button" class="btn-unlock" id="btn-letter-open">Mở thiệp xem ngay 🌸</button>
    </div>

    <form class="gate-form" id="gate-form">
      <label>Ngày sinh</label>
      <div class="dob-selects">
        <div class="custom-select" id="dob-day" data-value="" tabindex="0">
          <div class="select-trigger"><span>Ngày</span></div>
          <div class="select-options">
            ${Array.from({ length: 31 }, (_, i) => {
              const d = String(i + 1).padStart(2, '0');
              return `<div class="option" data-value="${d}">${d}</div>`;
            }).join('')}
          </div>
        </div>
        <span class="dob-sep">/</span>
        <div class="custom-select" id="dob-month" data-value="" tabindex="0">
          <div class="select-trigger"><span>Tháng</span></div>
          <div class="select-options">
            ${Array.from({ length: 12 }, (_, i) => {
              const m = String(i + 1).padStart(2, '0');
              return `<div class="option" data-value="${m}">${m}</div>`;
            }).join('')}
          </div>
        </div>
        <span class="dob-sep">/</span>
        <div class="custom-select" id="dob-year" data-value="" tabindex="0">
          <div class="select-trigger"><span>Năm</span></div>
          <div class="select-options">
            ${Array.from({ length: 39 }, (_, i) => {
              const y = String(1970 + i);
              return `<div class="option" data-value="${y}">${y}</div>`;
            }).join('')}
          </div>
        </div>
      </div>
      <p class="gate-error" id="gate-error" aria-live="polite"></p>
      <button type="submit" class="btn-unlock">Mở thiệp hồng 🌸</button>
    </form>
  </div>
</main>

<!-- ══ NỘI DUNG THIỆP CHÍNH ══ -->
<div id="app" class="locked">
  
  <!-- HERO SECTION -->
  <section class="hero-scene scene" id="hero">
    <div class="hero-badge">
      <span class="badge-star">⭐</span> Kirby Dreamland · Monash 2026 <span class="badge-star">⭐</span>
    </div>
    
    <div class="kirby-float-container">
      <div class="kirby-warp-star">
        <svg class="warp-star-svg" viewBox="0 0 100 100">
          <polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36" fill="#FFD700" stroke="#FFA500" stroke-width="3"/>
          <polygon points="50,15 60,38 84,38 64,53 72,78 50,62 28,78 36,53 16,38 40,38" fill="#FFF275"/>
        </svg>
        <div class="kirby-gif-wrapper">
          <span class="hero-grad-hat">🎓</span>
          <img src="data:image/gif;base64,${kirbyGifBase64}" alt="Kirby Dance" class="kirby-gif">
        </div>
      </div>
    </div>

    <h1 class="hero-title">
      Hành Trình Tốt Nghiệp Của <br>
      <span class="highlight-name">Mai Hân (Cá) 🌸</span>
    </h1>
    
    <p class="hero-sub">
      Chào mừng Cá đến với thế giới hồng Kirby rực rỡ! Nơi ước mơ vươn cao tại Monash University Clayton và niềm vui quẩy tưng bừng cùng hội mèo cún cưng!
    </p>

    <div class="hero-actions">
      <button class="btn-interactive" id="btn-pop-stars">
        ✨ Bắn Ngôi Sao Kirby ✨
      </button>
    </div>
  </section>

  <!-- SCENE 1: BOARDING PASS STAR RIDE -->
  <section class="scene" id="ticket-scene">
    <div class="scene-header">
      <span class="scene-icon">✈️</span>
      <h2>Vé Máy Bay Star Ride · SGN ➔ MEL</h2>
      <p>Chuyến bay đặc biệt đưa Mai Hân (Cá) đến Monash University Clayton</p>
    </div>

    <div class="ticket-card">
      <div class="ticket-top">
        <div class="airline-brand">
          <span class="brand-logo">🌸 KIRBY AIRWAYS</span>
          <span class="flight-no">FLIGHT GRAD-2026</span>
        </div>
        <div class="ticket-status">VIP PASS</div>
      </div>
      
      <div class="ticket-route">
        <div class="city">
          <h3>SGN</h3>
          <p>Sài Gòn</p>
        </div>
        <div class="flight-path">
          <div class="plane-icon">✈️</div>
          <div class="dots-line"></div>
          <span class="star-mid">⭐</span>
        </div>
        <div class="city">
          <h3>MEL</h3>
          <p>Melbourne</p>
        </div>
      </div>

      <div class="ticket-details">
        <div class="detail-item">
          <span class="lbl">Hành khách</span>
          <span class="val">Mai Hân (Cá)</span>
        </div>
        <div class="detail-item">
          <span class="lbl">Điểm đến</span>
          <span class="val">Monash University</span>
        </div>
        <div class="detail-item">
          <span class="lbl">Cơ sở</span>
          <span class="val">Clayton Campus</span>
        </div>
        <div class="detail-item">
          <span class="lbl">Số ghế</span>
          <span class="val">01A · Star Class</span>
        </div>
      </div>

      <div class="ticket-bottom">
        <div class="barcode">
          <span>||| | |||| || ||| |||| | ||| |||| ||</span>
          <span class="code-txt">MAI-HAN-16092003-GRAD26</span>
        </div>
        <div class="ticket-seal">
          <span>GRADUATION 2026</span>
        </div>
      </div>
    </div>
  </section>

  <!-- SCENE 2: VŨ ĐIỆU MÈO MEME & KIRBY -->
  <section class="scene" id="cat-dance-scene">
    <div class="scene-header">
      <span class="scene-icon">🐱</span>
      <h2>Vũ Điệu Mèo Meme & Kirby</h2>
      <p>Nhấp vào mèo hoặc Kirby để xem hiệu ứng quẩy siêu dễ thương!</p>
    </div>

    <div class="dance-stage">
      <div class="stage-lights">
        <span class="spotlight p1"></span>
        <span class="spotlight p2"></span>
        <span class="spotlight p3"></span>
      </div>

      <div class="dance-performers">
        
        <!-- CAT MEME 1 -->
        <div class="performer-card" id="card-cat-meme">
          <div class="img-wrapper bounce-anim">
            <img src="data:image/webp;base64,${catMemeBase64}" alt="Cat Meme" class="cat-img">
            <span class="floating-note">🎵</span>
          </div>
          <div class="performer-tag">Mèo Gật Gù (Vibe Meme)</div>
        </div>

        <!-- KIRBY DANCER GIF -->
        <div class="performer-card" id="card-kirby">
          <div class="img-wrapper dance-anim kirby-gif-card">
            <img src="data:image/gif;base64,${kirbyGifBase64}" alt="Kirby Dance GIF" class="cat-img kirby-dance-gif">
            <span class="floating-note">💖</span>
          </div>
          <div class="performer-tag">Kirby Nhảy Vũ Điệu Kéké</div>
        </div>

        <!-- DANCING CAT 2 -->
        <div class="performer-card" id="card-dancing-cat">
          <div class="img-wrapper dance-anim">
            <img src="data:image/webp;base64,${dancingCatBase64}" alt="Dancing Cat" class="cat-img">
            <span class="floating-note">✨</span>
          </div>
          <div class="performer-tag">Mèo Vũ Công Quẩy Nhiệt</div>
        </div>

      </div>

      <div class="stage-floor">
        <p class="stage-caption">
          🐟 <strong>Cá & Mèo & Kirby</strong> hòa chung một nhịp đập, quẩy tung bừng chúc mừng cột mốc tốt nghiệp rực rỡ của Mai Hân!
        </p>
      </div>
    </div>
  </section>

  <!-- SCENE 3: DREAMLAND KIRBY & CHÚ CÁ NHỎ -->
  <section class="scene" id="dreamland-scene">
    <div class="scene-header">
      <span class="scene-icon">🐟</span>
      <h2>Thế Giới Hồng Kirby & Chú Cá Nhỏ</h2>
      <p>Ba mảnh ghép dễ thương định hình phong cách Mai Hân</p>
    </div>

    <div class="grid-cards">
      
      <div class="dream-card">
        <div class="card-icon">🌸</div>
        <h3>Sắc Hồng Kirby</h3>
        <p>Luôn giữ tinh thần vui vẻ, bồng bềnh ngọt ngào và tỏa ra nguồn năng lượng tích cực ấm áp cho mọi người xung quanh.</p>
      </div>

      <div class="dream-card">
        <div class="card-icon">🐟</div>
        <h3>Chú Cá Mai Hân</h3>
        <p>Tự do tự tại bơi lội giữa đại dương tri thức, sẵn sàng vượt qua sóng gió để vươn tới bờ biển Melbourne xinh đẹp.</p>
      </div>

      <div class="dream-card">
        <div class="card-icon">🎓</div>
        <h3>Mũ Cử Nhân Monash</h3>
        <p>Cột mốc đáng tự hào tại Monash University Clayton, đánh dấu thành quả sau bao nỗ lực và sự kiên trì tuyệt vời.</p>
      </div>

    </div>

    <div class="aquarium-box">
      <div class="aqua-title">✨ Bể Ngôi Sao & Chú Cá Nhỏ ✨</div>
      <div class="swimming-zone">
        <div class="swim-item fish1">🐟</div>
        <div class="swim-item star1">⭐</div>
        <div class="swim-item kirby-gif-swim">
          <img src="data:image/gif;base64,${kirbyGifBase64}" alt="Kirby Swim" class="swim-kirby-img">
        </div>
        <div class="swim-item fish2">🐠</div>
        <div class="swim-item star2">✨</div>
      </div>
    </div>
  </section>

  <!-- SCENE 4: LÁ THƯ RIÊNG -->
  <section class="scene" id="letter-scene">
    <div class="letter-card-wrapper">
      <div class="letter-stamp">🎓 MONASH 2026</div>
      <div class="letter-header">
        <span class="envelope-icon">✉️</span>
        <h2>Thư Gửi Mai Hân (Cá)</h2>
      </div>

      <!-- ✉️ VIẾT THƯ Ở ĐÂY -->
      <div class="letter-content">
        <p class="placeholder">
          Gửi Mai Hân (Cá) thân yêu,<br><br>
          Chúc mừng Cá đã hoàn thành một hành trình học tập tuyệt vời để vươn tới ngày tốt nghiệp rực rỡ tại Monash University! Mong rằng bước sang chặng đường mới tại Melbourne, Cá sẽ luôn giữ trọn nụ cười rạng rỡ, ngọt ngào như sắc hồng Kirby và tràn đầy năng lượng như chú mèo nhảy tung tăng.<br><br>
          Hãy luôn tự tin bơi ra biển lớn, chinh phục mọi ước mơ và gặt hái thật nhiều thành công nhé! 🌸✨
        </p>
      </div>

      <div class="letter-footer">
        <div class="star-decor">⭐ 🌸 ⭐ 🌸 ⭐</div>
      </div>
    </div>
  </section>

  <!-- SCENE 5: CHI TIẾT LỄ TỐT NGHIỆP -->
  <section class="scene" id="event-scene">
    <div class="event-card">
      <div class="event-header">
        <span class="event-badge">INVITATION</span>
        <h2>Thông Tin Buổi Lễ Tốt Nghiệp</h2>
      </div>

      <div class="event-grid">
        <div class="event-item">
          <div class="item-icon">📍</div>
          <div class="item-text">
            <strong>Địa điểm</strong>
            <span>Monash University - Clayton</span>
          </div>
        </div>

        <div class="event-item">
          <div class="item-icon">🌏</div>
          <div class="item-text">
            <strong>Thành phố / Tuyến đường</strong>
            <span>Melbourne (MEL), Australia</span>
          </div>
        </div>

        <div class="event-item">
          <div class="item-icon">📅</div>
          <div class="item-text">
            <strong>Ngày tổ chức</strong>
            <span>Sẽ cập nhật</span>
          </div>
        </div>

        <div class="event-item">
          <div class="item-icon">⏰</div>
          <div class="item-text">
            <strong>Thời gian</strong>
            <span>Sẽ cập nhật</span>
          </div>
        </div>
      </div>

      <div class="event-wish">
        <button class="btn-wish" id="btn-send-wish">
          💖 Gửi Lời Chúc Đến Mai Hân (Cá) 💖
        </button>
      </div>
    </div>
  </section>

  <footer class="footer-note">
    <p>Thiệp mời tốt nghiệp cá nhân hóa dành riêng cho Mai Hân (Cá) · 2026 🌸</p>
  </footer>

</div>

<!-- Toast notification for wish -->
<div id="toast-msg" class="toast"></div>

<!-- ══ ĐỪNG SỬA: BẢNG KIỂU DÁNG ══ -->
<style>
${fontCss}

:root {
  --kirby-pink-soft: #FFF0F5;
  --kirby-pink-light: #FFB7C5;
  --kirby-pink-mid: #FF69B4;
  --kirby-pink-deep: #FF1493;
  --kirby-magenta: #E83E8C;
  --star-yellow: #FFD700;
  --star-yellow-light: #FFF275;
  --cream-white: #FFFFFF;
  --text-dark: #3D2228;
  --text-muted: #7A4E57;
  --shadow-pink: rgba(255, 105, 180, 0.25);
  --card-bg: rgba(255, 255, 255, 0.94);
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: 'Be Vietnam Pro', system-ui, -apple-system, sans-serif;
  background-color: var(--kirby-pink-soft);
  color: var(--text-dark);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, .hero-title, .gate-card h1, .scene-header h2, .city h3 {
  font-family: 'Quicksand', 'Be Vietnam Pro', sans-serif;
}

/* Canvas background */
#kirby-sky {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}

/* DOB Gate Screen */
#gate {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: radial-gradient(circle at center, #FFF0F5 0%, #FFB7C5 100%);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

#gate.unlocked {
  opacity: 0;
  transform: scale(0.95);
  pointer-events: none;
  display: none;
}

.gate-card {
  background: var(--card-bg);
  border: 3px solid var(--kirby-pink-light);
  border-radius: 28px;
  padding: 36px 28px;
  width: 100%;
  max-width: 440px;
  text-align: center;
  box-shadow: 0 16px 40px var(--shadow-pink);
  backdrop-filter: blur(10px);
}

.kirby-crest {
  display: inline-block;
  background: linear-gradient(135deg, var(--kirby-pink-mid), var(--kirby-pink-deep));
  color: white;
  padding: 6px 18px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px var(--shadow-pink);
  margin-bottom: 12px;
}

.eyebrow {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--kirby-pink-deep);
  font-weight: 700;
  margin: 4px 0 8px;
}

.gate-card h1 {
  font-size: 1.9rem;
  color: var(--text-dark);
  margin: 0 0 12px;
  font-weight: 800;
}

.gate-seal {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 24px;
}

/* Custom selects for DOB */
.gate-form label {
  display: block;
  font-weight: 700;
  color: var(--kirby-pink-deep);
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.dob-selects {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.dob-sep {
  color: var(--kirby-pink-mid);
  font-weight: 800;
  font-size: 1.2rem;
}

.custom-select {
  position: relative;
  flex: 1;
  background: white;
  border: 2px solid var(--kirby-pink-light);
  border-radius: 14px;
  cursor: pointer;
  outline: none;
}

.custom-select:focus {
  border-color: var(--kirby-pink-deep);
  box-shadow: 0 0 0 3px var(--shadow-pink);
}

.select-trigger {
  padding: 10px;
  font-weight: 700;
  color: var(--text-dark);
  font-size: 0.95rem;
}

.select-options {
  display: none;
  position: absolute;
  top: 105%;
  left: 0;
  right: 0;
  max-height: 180px;
  overflow-y: auto;
  background: white;
  border: 2px solid var(--kirby-pink-light);
  border-radius: 12px;
  z-index: 100;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.custom-select.open .select-options {
  display: block;
}

.option {
  padding: 8px 12px;
  font-weight: 600;
  transition: background 0.2s;
}

.option:hover {
  background: var(--kirby-pink-soft);
  color: var(--kirby-pink-deep);
}

.gate-error {
  color: #D9534F;
  font-size: 0.85rem;
  font-weight: 700;
  min-height: 20px;
  margin: 6px 0 16px;
}

.btn-unlock {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--kirby-pink-mid), var(--kirby-pink-deep));
  color: white;
  border: none;
  border-radius: 18px;
  font-size: 1.05rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 6px 20px var(--shadow-pink);
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-unlock:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 20, 147, 0.4);
}

.btn-unlock:active {
  transform: translateY(1px);
}

/* Shake animation for error */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}

.shake {
  animation: shake 0.4s ease-in-out;
}

/* Letter Mode */
.letter-welcome {
  font-size: 1.1rem;
  color: var(--text-dark);
  margin-bottom: 20px;
}

/* App Content */
#app {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 16px 60px;
  opacity: 1;
  transition: opacity 0.8s ease;
}

#app.locked {
  display: none;
}

/* Scene General */
.scene {
  background: var(--card-bg);
  border-radius: 28px;
  padding: 32px 24px;
  margin-bottom: 32px;
  border: 2px solid var(--kirby-pink-light);
  box-shadow: 0 12px 32px var(--shadow-pink);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.scene.visible {
  opacity: 1;
  transform: translateY(0);
}

.scene-header {
  text-align: center;
  margin-bottom: 28px;
}

.scene-icon {
  font-size: 2.2rem;
  display: block;
  margin-bottom: 6px;
}

.scene-header h2 {
  font-size: 1.6rem;
  color: var(--text-dark);
  margin: 0 0 6px;
  font-weight: 800;
}

.scene-header p {
  color: var(--text-muted);
  margin: 0;
  font-size: 0.95rem;
}

/* HERO SCENE */
.hero-scene {
  text-align: center;
  padding-top: 40px;
  background: linear-gradient(180deg, #FFFFFF 0%, #FFF0F5 100%);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FFF275;
  color: #5A4000;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 0.85rem;
  margin-bottom: 24px;
}

.kirby-float-container {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.kirby-warp-star {
  position: relative;
  width: 150px;
  height: 150px;
  animation: floatBob 3s ease-in-out infinite;
}

@keyframes floatBob {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(4deg); }
}

.warp-star-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 6px 12px rgba(255, 215, 0, 0.5));
}

.kirby-gif-wrapper {
  position: absolute;
  top: 10px;
  left: 25px;
  width: 100px;
  height: 100px;
}

.kirby-gif {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
}

.hero-grad-hat {
  position: absolute;
  top: -14px;
  right: 12px;
  font-size: 24px;
  z-index: 5;
  transform: rotate(15deg);
}

.hero-title {
  font-size: 1.85rem;
  margin: 0 0 16px;
  font-weight: 800;
  line-height: 1.35;
}

.highlight-name {
  color: var(--kirby-pink-deep);
  background: linear-gradient(120deg, transparent 0%, #FFB7C5 100%);
  padding: 0 8px;
  border-radius: 8px;
}

.hero-sub {
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 520px;
  margin: 0 auto 28px;
}

.btn-interactive {
  padding: 14px 28px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #4A3000;
  border: none;
  border-radius: 20px;
  font-size: 1.05rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-interactive:hover {
  transform: scale(1.04);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.6);
}

/* SCENE 1: TICKET */
.ticket-card {
  background: white;
  border: 2px dashed var(--kirby-pink-mid);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 24px var(--shadow-pink);
}

.ticket-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--kirby-pink-soft);
  padding-bottom: 12px;
  margin-bottom: 20px;
}

.airline-brand {
  font-weight: 800;
  color: var(--kirby-pink-deep);
  font-size: 0.9rem;
}

.flight-no {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.ticket-status {
  background: var(--kirby-pink-soft);
  color: var(--kirby-pink-deep);
  padding: 4px 10px;
  border-radius: 10px;
  font-weight: 800;
  font-size: 0.8rem;
}

.ticket-route {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  text-align: center;
}

.city h3 {
  font-size: 2rem;
  margin: 0;
  color: var(--kirby-pink-deep);
}

.city p {
  margin: 2px 0 0;
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 700;
}

.flight-path {
  flex: 1;
  position: relative;
  margin: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dots-line {
  position: absolute;
  width: 100%;
  height: 2px;
  border-top: 2px dashed var(--kirby-pink-light);
}

.plane-icon {
  position: relative;
  z-index: 2;
  background: white;
  padding: 0 6px;
  font-size: 1.4rem;
  transform: rotate(90deg);
}

.ticket-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  background: var(--kirby-pink-soft);
  padding: 16px;
  border-radius: 14px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-item .lbl {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 700;
}

.detail-item .val {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-dark);
}

.ticket-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid var(--kirby-pink-soft);
  padding-top: 14px;
}

.barcode {
  font-family: monospace;
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: var(--text-muted);
}

.barcode .code-txt {
  display: block;
  font-size: 0.65rem;
  margin-top: 2px;
}

.ticket-seal {
  font-weight: 800;
  font-size: 0.8rem;
  color: var(--kirby-pink-mid);
  border: 1px solid var(--kirby-pink-mid);
  padding: 4px 8px;
  border-radius: 6px;
}

/* SCENE 2: CAT DANCE */
.dance-stage {
  background: radial-gradient(circle at center, #FFF0F5 0%, #FFB7C5 100%);
  border-radius: 20px;
  padding: 24px 16px;
  position: relative;
  overflow: hidden;
}

.stage-lights {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  pointer-events: none;
}

.spotlight {
  position: absolute;
  top: -50px;
  width: 100px;
  height: 200px;
  background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%);
  transform-origin: top center;
  animation: lightSweep 4s ease-in-out infinite alternate;
}

.spotlight.p1 { left: 10%; animation-delay: 0s; }
.spotlight.p2 { left: 45%; animation-delay: 1.3s; }
.spotlight.p3 { left: 80%; animation-delay: 2.6s; }

@keyframes lightSweep {
  0% { transform: rotate(-15deg); }
  100% { transform: rotate(15deg); }
}

.dance-performers {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  gap: 12px;
  margin: 20px 0;
  position: relative;
  z-index: 2;
}

.performer-card {
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.performer-card:hover {
  transform: translateY(-6px);
}

.img-wrapper {
  position: relative;
  background: white;
  padding: 8px;
  border-radius: 18px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.cat-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}

.kirby-dance-gif {
  object-fit: contain;
}

.bounce-anim {
  animation: bounceHead 1.2s ease-in-out infinite alternate;
}

@keyframes bounceHead {
  0% { transform: translateY(0) rotate(-3deg); }
  100% { transform: translateY(-10px) rotate(3deg); }
}

.dance-anim {
  animation: danceHip 0.8s ease-in-out infinite alternate;
}

@keyframes danceHip {
  0% { transform: scale(1) rotate(-5deg); }
  100% { transform: scale(1.06) rotate(5deg); }
}

.floating-note {
  position: absolute;
  top: -10px;
  right: -6px;
  font-size: 1.2rem;
  animation: floatNote 1.5s ease-in-out infinite;
}

@keyframes floatNote {
  0% { transform: translateY(0) scale(0.8); opacity: 0.6; }
  50% { transform: translateY(-12px) scale(1.1); opacity: 1; }
  100% { transform: translateY(-20px) scale(0.8); opacity: 0; }
}

.performer-tag {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-top: 8px;
  background: rgba(255,255,255,0.85);
  padding: 2px 8px;
  border-radius: 10px;
}

.stage-floor {
  background: rgba(255,255,255,0.9);
  padding: 12px 16px;
  border-radius: 14px;
  text-align: center;
  font-size: 0.9rem;
}

.stage-caption {
  margin: 0;
  color: var(--text-dark);
}

/* SCENE 3: DREAMLAND */
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.dream-card {
  background: white;
  border: 2px solid var(--kirby-pink-soft);
  border-radius: 18px;
  padding: 20px;
  text-align: center;
  transition: transform 0.2s, border-color 0.2s;
}

.dream-card:hover {
  transform: translateY(-4px);
  border-color: var(--kirby-pink-mid);
}

.card-icon {
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.dream-card h3 {
  font-size: 1.15rem;
  margin: 0 0 8px;
  color: var(--kirby-pink-deep);
}

.dream-card p {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin: 0;
}

.aquarium-box {
  background: linear-gradient(180deg, #E0F7FA 0%, #B2EBF2 100%);
  border: 3px solid #80DEEA;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
}

.aqua-title {
  font-weight: 800;
  color: #00838F;
  margin-bottom: 16px;
  font-size: 0.95rem;
}

.swimming-zone {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  position: relative;
  overflow: hidden;
}

.swim-item {
  font-size: 1.4rem;
  animation: swimRight 6s linear infinite alternate;
}

.swim-item.fish1 { animation-duration: 4s; }
.swim-item.fish2 { animation-duration: 5s; animation-delay: 1s; }

.swim-kirby-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}

@keyframes swimRight {
  0% { transform: translateX(-20px) translateY(0); }
  50% { transform: translateX(20px) translateY(-10px); }
  100% { transform: translateX(-10px) translateY(5px); }
}

/* SCENE 4: LETTER */
.letter-card-wrapper {
  background: #FFFDF9;
  border: 3px double var(--kirby-pink-light);
  border-radius: 24px;
  padding: 32px 24px;
  position: relative;
  box-shadow: 0 10px 30px var(--shadow-pink);
}

.letter-stamp {
  position: absolute;
  top: 20px;
  right: 20px;
  border: 2px dashed var(--kirby-pink-mid);
  color: var(--kirby-pink-deep);
  padding: 4px 8px;
  font-size: 0.7rem;
  font-weight: 800;
  border-radius: 6px;
  transform: rotate(5deg);
}

.letter-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.envelope-icon {
  font-size: 1.8rem;
}

.letter-header h2 {
  font-size: 1.5rem;
  margin: 0;
  color: var(--text-dark);
}

.letter-content {
  font-size: 1rem;
  line-height: 1.7;
  color: #332226;
}

.letter-content p.placeholder {
  font-style: normal;
}

.letter-footer {
  text-align: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px dashed var(--kirby-pink-light);
}

.star-decor {
  color: var(--star-yellow);
  font-size: 0.9rem;
}

/* SCENE 5: EVENT */
.event-card {
  background: white;
  border-radius: 24px;
  padding: 28px 20px;
  border: 2px solid var(--kirby-pink-light);
}

.event-header {
  text-align: center;
  margin-bottom: 24px;
}

.event-badge {
  background: var(--kirby-pink-soft);
  color: var(--kirby-pink-deep);
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.event-header h2 {
  font-size: 1.5rem;
  margin: 8px 0 0;
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--kirby-pink-soft);
  padding: 16px;
  border-radius: 16px;
}

.item-icon {
  font-size: 1.6rem;
}

.item-text {
  display: flex;
  flex-direction: column;
}

.item-text strong {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.item-text span {
  font-weight: 800;
  color: var(--text-dark);
  font-size: 0.95rem;
}

.event-wish {
  text-align: center;
}

.btn-wish {
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--kirby-pink-mid), var(--kirby-pink-deep));
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 6px 20px var(--shadow-pink);
  transition: transform 0.2s;
}

.btn-wish:hover {
  transform: scale(1.03);
}

.footer-note {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-top: 40px;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: rgba(74, 46, 53, 0.95);
  color: white;
  padding: 12px 24px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  z-index: 1000;
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
  pointer-events: none;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .gate-card {
    padding: 28px 18px;
  }
  
  .hero-title {
    font-size: 1.45rem;
  }

  .city h3 {
    font-size: 1.6rem;
  }

  .dance-performers {
    gap: 6px;
  }

  .cat-img {
    width: 80px;
    height: 80px;
  }
}
</style>

<!-- ══ ĐỪNG SỬA: KỊCH BẢN TƯƠNG TÁC ══ -->
<script>
(function() {
  // Check ?m= query param for direct letter link from letter.html
  const urlParams = new URLSearchParams(window.location.search);
  const mParam = urlParams.get('m');
  const cleanDOB = NGAY_SINH.replace(/\\//g, '');

  const gate = document.getElementById('gate');
  const gateForm = document.getElementById('gate-form');
  const gateSeal = document.getElementById('gate-seal');
  const letterMode = document.getElementById('letter-mode');
  const btnLetterOpen = document.getElementById('btn-letter-open');
  const gateError = document.getElementById('gate-error');
  const app = document.getElementById('app');

  if (mParam === cleanDOB) {
    if (gateForm) gateForm.style.display = 'none';
    if (gateSeal) gateSeal.style.display = 'none';
    if (letterMode) letterMode.style.display = 'block';
  }

  function unlockInvite() {
    gate.classList.add('unlocked');
    app.classList.remove('locked');
    setTimeout(initObserver, 100);
  }

  if (btnLetterOpen) {
    btnLetterOpen.addEventListener('click', unlockInvite);
  }

  // Custom Select Dropdowns
  const customSelects = document.querySelectorAll('.custom-select');
  customSelects.forEach(select => {
    const trigger = select.querySelector('.select-trigger span');
    const options = select.querySelectorAll('.option');

    select.addEventListener('click', (e) => {
      e.stopPropagation();
      customSelects.forEach(s => { if (s !== select) s.classList.remove('open'); });
      select.classList.toggle('open');
    });

    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = opt.getAttribute('data-value');
        select.setAttribute('data-value', val);
        trigger.textContent = val;
        select.classList.remove('open');
      });
    });
  });

  document.addEventListener('click', () => {
    customSelects.forEach(s => s.classList.remove('open'));
  });

  // DOB Form Submit Validation
  if (gateForm) {
    gateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      gateError.textContent = '';
      gateForm.classList.remove('shake');

      const day = document.getElementById('dob-day').getAttribute('data-value');
      const month = document.getElementById('dob-month').getAttribute('data-value');
      const year = document.getElementById('dob-year').getAttribute('data-value');

      if (!day || !month || !year) {
        showError(LOI_CHUA_DU);
        return;
      }

      const inputDOB = \`\${day}/\${month}/\${year}\`;
      if (inputDOB === NGAY_SINH) {
        unlockInvite();
      } else {
        showError(LOI_SAI);
      }
    });
  }

  function showError(msg) {
    gateError.textContent = msg;
    gateForm.classList.add('shake');
    setTimeout(() => gateForm.classList.remove('shake'), 400);
  }

  // Scroll IntersectionObserver for scene reveals
  function initObserver() {
    const scenes = document.querySelectorAll('.scene');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    scenes.forEach(scene => observer.observe(scene));
  }

  // Interactive Buttons & Cat click reactions
  const btnPopStars = document.getElementById('btn-pop-stars');
  if (btnPopStars) {
    btnPopStars.addEventListener('click', () => {
      spawnFloatingStars(20);
      showToast('🌸 Kirby Kéké đã nhảy vũ điệu và bắn 20 ngôi sao tặng Mai Hân! ⭐️');
    });
  }

  const btnSendWish = document.getElementById('btn-send-wish');
  if (btnSendWish) {
    btnSendWish.addEventListener('click', () => {
      spawnFloatingStars(15);
      showToast('💖 Đã gửi lời chúc ngọt ngào đến Mai Hân (Cá)! 💖');
    });
  }

  // Performers Click Interactions
  ['card-cat-meme', 'card-kirby', 'card-dancing-cat'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        spawnFloatingStars(8);
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 400);
      });
    }
  });

  function showToast(msg) {
    const toast = document.getElementById('toast-msg');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Canvas floating star particles
  const canvas = document.getElementById('kirby-sky');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class StarParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 8 + 4;
      this.speedY = -(Math.random() * 0.8 + 0.2);
      this.speedX = Math.random() * 0.4 - 0.2;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.color = Math.random() > 0.4 ? '#FFD700' : '#FFB7C5';
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y < -20) this.y = height + 20;
      if (this.x < -20 || this.x > width + 20) this.x = Math.random() * width;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 35; i++) {
    particles.push(new StarParticle());
  }

  function spawnFloatingStars(count) {
    for (let i = 0; i < count; i++) {
      let p = new StarParticle();
      p.y = height + 10;
      p.speedY = -(Math.random() * 2 + 1);
      particles.push(p);
    }
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    if (particles.length > 50) particles.splice(0, particles.length - 50);
    requestAnimationFrame(loop);
  }
  loop();

})();
</script>

</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'guests', 'mai-han.html'), html, 'utf8');
console.log('Successfully updated guests/mai-han.html with Be Vietnam Pro font & Kirby GIF');
