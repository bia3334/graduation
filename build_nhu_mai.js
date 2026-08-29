const fs = require('fs');
const path = require('path');

// Extract Playfair Display from guests/minh-thu.html
const minhThuHtml = fs.readFileSync(path.join(__dirname, 'guests', 'minh-thu.html'), 'utf8');
const playfairMatch = minhThuHtml.match(/\/\*\s*vietnamese\s*\*\/\s*@font-face\s*\{[^}]*Playfair Display[^}]*\}[\s\S]*?\/\*\s*latin\s*\*\/\s*@font-face\s*\{[^}]*Playfair Display[^}]*\}/g);

// Extract Be Vietnam Pro from guests/minh-thu-2.html
const minhThu2Html = fs.readFileSync(path.join(__dirname, 'guests', 'minh-thu-2.html'), 'utf8');
const beVietnamMatch = minhThu2Html.match(/\/\*\s*vietnamese\s*\*\/\s*@font-face\s*\{[^}]*Be Vietnam Pro[^}]*\}[\s\S]*?(?=\n\n|\n<\/style>|$)/g);

let extractedFonts = '';
if (playfairMatch) extractedFonts += playfairMatch.join('\n\n') + '\n\n';
if (beVietnamMatch) extractedFonts += beVietnamMatch.join('\n\n') + '\n\n';

console.log('Extracted font blocks length:', extractedFonts.length);

const htmlContent = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Thiệp mời tốt nghiệp · Như Mai</title>
</head>
<body style="margin:0">

<!-- ════════════════════════════════════════════════════════════════
     ✏️  CÁCH SỬA THIỆP NÀY (guests/nhu-mai.html)
     · Mọi câu chữ nằm ngay trong trang bên dưới — thấy chữ nào,
       sửa thẳng chữ đó, lưu file, mở lại trong trình duyệt là xong.
     · Ngày sinh để mở thiệp: sửa trong khối CÀI ĐẶT ngay dưới đây.
     · Lá thư riêng: tìm chữ "✉️ VIẾT THƯ Ở ĐÂY" ở gần cuối trang.
     · Phần <style> và <script> phía dưới là máy móc — không cần đụng.
     ════════════════════════════════════════════════════════════════ -->

<script>
/* ── CÀI ĐẶT ─────────────────────────────────────────────── */
const NGAY_SINH = '14/09/2003';  // ngày sinh để mở thiệp (dd/mm/yyyy)
const TIM_ROI   = true;          // true = có hạt sáng & bong bóng hoàng hôn rơi

// Lời báo lỗi ở màn nhập ngày sinh:
const LOI_CHUA_DU  = 'Hãy nhập đủ ngày · tháng · năm, ví dụ 14/09/2003.';
const LOI_KHONG_CO = 'Ngày này không tồn tại — bạn kiểm tra lại nhé!';
const LOI_SAI      = 'Ngày sinh chưa đúng rồi — thử lại xem nào Như Mai ơi!';
</script>

<div id="sky" aria-hidden="true"></div>

<!-- ══ MÀN KHÓA — nhập ngày sinh để mở thiệp ══ -->
<main id="gate">
  <div class="gate-card" id="gate-card">
    <div class="crest">’26</div>
    <p class="eyebrow">Lễ tốt nghiệp · 2026</p>
    <h1>Thiệp mời ngày tốt nghiệp</h1>
    <p class="gate-seal" id="gate-seal">Nhập ngày sinh của bạn để mở thiệp.</p>

    <!-- Màn chuyển tiếp khi mở từ letter.html (?m=14092003) -->
    <div id="letter-mode" style="display:none">
      <p class="letter-for">Thư này dành riêng cho <strong>Như Mai</strong></p>
      <button type="button" class="btn-open-letter" id="btn-unlock-letter">Mở xem ✉️</button>
    </div>

    <form class="gate-form" id="gate-form">
      <label>Ngày sinh</label>
      <div class="dob-selects">
        <div class="custom-select" id="dob-day" data-value="" tabindex="0">
          <div class="select-trigger"><span>Ngày</span></div>
          <div class="select-options">
            ${Array.from({length:31}, (_,i) => {
              const d = String(i+1).padStart(2,'0');
              return `<div class="option" data-value="${d}">${d}</div>`;
            }).join('')}
          </div>
        </div>
        <span class="dob-sep">/</span>
        <div class="custom-select" id="dob-month" data-value="" tabindex="0">
          <div class="select-trigger"><span>Tháng</span></div>
          <div class="select-options">
            ${Array.from({length:12}, (_,i) => {
              const m = String(i+1).padStart(2,'0');
              return `<div class="option" data-value="${m}">${m}</div>`;
            }).join('')}
          </div>
        </div>
        <span class="dob-sep">/</span>
        <div class="custom-select" id="dob-year" data-value="" tabindex="0">
          <div class="select-trigger"><span>Năm</span></div>
          <div class="select-options">
            ${Array.from({length:39}, (_,i) => {
              const y = String(1970 + i);
              return `<div class="option" data-value="${y}">${y}</div>`;
            }).join('')}
          </div>
        </div>
      </div>
      <br>
      <button type="submit" class="btn-submit-gate">Mở thiệp 🌅</button>
      <p id="gate-error" role="alert" aria-live="polite"></p>
    </form>
  </div>
</main>

<!-- ══ NỘI DUNG CHÍNH (Hiện ra sau khi mở khóa) ══ -->
<div id="invitation" class="invitation-container hidden">

  <!-- Header Hero -->
  <header class="hero-header">
    <div class="hero-badge">Monash Graduation 2026 · Sunset Ocean Dusk</div>
    <h1 class="hero-title">Gửi Như Mai</h1>
    <p class="hero-subtitle">Khung cảnh hoàng hôn biển rực rỡ hòa cùng ráng chiều tím mộng mơ — món quà nhỏ chúc mừng cột mốc tốt nghiệp đại học rực rỡ!</p>
  </header>

  <!-- SCENE 1: Hoàng Hôn Biển Rực Rỡ (Sunset Ocean Scene) -->
  <section class="scene-section scene-ocean reveal">
    <div class="scene-header">
      <span class="scene-tag">Scene 01</span>
      <h2>Hoàng Hôn Trên Biển & Tuổi Trẻ</h2>
      <p class="scene-desc">Nơi mặt trời chìm dần vào lòng biển cả, để lại dải ráng chiều tím cam rực rỡ — sâu lắng, dịu êm nhưng đầy tràn sức sống như Như Mai.</p>
    </div>

    <div class="sunset-ocean-canvas">
      <!-- Gradient Sky Backdrop -->
      <div class="sky-glow"></div>

      <!-- Setting Sun with Golden Aura -->
      <div class="sun-wrapper">
        <div class="setting-sun"></div>
        <div class="sun-reflection"></div>
      </div>
      
      <!-- Layered Animated Waves -->
      <div class="wave wave-back"></div>
      <div class="wave wave-mid"></div>
      <div class="wave wave-front"></div>

      <!-- Floating Sparkles & Light Particles -->
      <div class="sparkles-container">
        <span class="sparkle" style="left:12%; top:20%; animation-delay:0s">✨</span>
        <span class="sparkle" style="left:78%; top:15%; animation-delay:0.8s">🌅</span>
        <span class="sparkle" style="left:48%; top:30%; animation-delay:1.4s">💜</span>
        <span class="sparkle" style="left:88%; top:50%; animation-delay:0.5s">🌊</span>
        <span class="sparkle" style="left:22%; top:55%; animation-delay:1.9s">⭐</span>
      </div>

      <div class="ocean-card-content">
        <p class="quote-text">"Biển chiều đẹp nhất khi hoàng hôn buông xuống, và tuổi trẻ đẹp nhất khi ta biết trân trọng từng khoảnh khắc, sống hết mình và luôn tự hào về chặng đường đã qua."</p>
      </div>
    </div>
  </section>

  <!-- SCENE 2: Hành Trình Thuyền Giấy & Kỷ Niệm Cấp 2 (Paper Boat Journey) -->
  <section class="scene-section scene-boat reveal">
    <div class="scene-header">
      <span class="scene-tag">Scene 02</span>
      <h2>Chuyến Thuyền Giấy Từ Ngày Cấp 2</h2>
      <p class="scene-desc">Hành trình hơn 10 năm gắn bó từ ngày chung lớp cấp 2 ngô nghê cho tới khi cùng vươn khơi chạm tới đích đến Monash 2026.</p>
    </div>

    <div class="boat-journey-card">
      <div class="journey-track">
        <div class="journey-node node-start">
          <div class="node-icon">🏫</div>
          <div class="node-label">Mái Trường Cấp 2</div>
          <div class="node-sub">2015 · Kỷ niệm tuổi học trò</div>
        </div>

        <div class="journey-line">
          <!-- Animated Paper Boat -->
          <div class="paper-boat">⛵</div>
          <div class="journey-progress"></div>
        </div>

        <div class="journey-node node-end">
          <div class="node-icon">🎓</div>
          <div class="node-label">Monash Graduation 2026</div>
          <div class="node-sub">Melbourne, Australia</div>
        </div>
      </div>

      <div class="journey-note">
        <p>Hơn một thập kỷ đồng hành, Như Mai vẫn luôn là một người bạn tuyệt vời. Chúc mừng hành trình tuyệt đẹp này nha!</p>
      </div>
    </div>
  </section>

  <!-- SCENE 3: Trạm Tin Nhắn "Học Cách Rep Nhanh" (Chat Message Station) -->
  <section class="scene-section scene-chat reveal">
    <div class="scene-header">
      <span class="scene-tag">Scene 03</span>
      <h2>Trạm Tin Nhắn & Lời Nhắc Yêu Thương</h2>
      <p class="scene-desc">Một góc trò chuyện vui vẻ gửi tới Như Mai — người bạn thân thuộc với phong cách nhắn tin "thong thả"!</p>
    </div>

    <div class="chat-app-card">
      <div class="chat-header">
        <div class="chat-avatar">👩‍🎓</div>
        <div class="chat-user-info">
          <div class="chat-name">Như Mai 💜</div>
          <div class="chat-status">Đang tận hưởng hoàng hôn biển... 🌊</div>
        </div>
        <div class="unread-badge">3 tin nhắn mới</div>
      </div>

      <div class="chat-body">
        <div class="chat-bubble bubble-left">
          <p>Alo Như Mai ơi, chúc mừng bạn tôi chính thức tốt nghiệp đại học nha! 🎉🎓</p>
          <span class="bubble-time">14:09</span>
        </div>

        <div class="chat-bubble bubble-left">
          <p>Chúc Như Mai sang chương mới của cuộc đời sẽ luôn <strong>sống hạnh phúc với chính bản thân</strong> và <strong>luôn tràn đầy năng lượng yêu đời</strong> nha! ✨✨</p>
          <span class="bubble-time">14:10</span>
        </div>

        <div class="chat-bubble bubble-left bubble-highlight">
          <p>Và đặc biệt nhất... nhớ <strong>HỌC CÁCH REP TIN NHẮN NHANH HƠN</strong> nhé! Đừng để bạn bè ngồi hóng tin nhắn mòn mỏi nè 🤣🤣</p>
          <span class="bubble-time">14:11</span>
        </div>

        <div class="chat-bubble bubble-right">
          <p class="typing-indicator"><span>.</span><span>.</span><span>.</span> Như Mai đang gõ tin nhắn (hoặc đang đắn đo xem nên rep luôn không) ⏳</p>
        </div>
      </div>

      <div class="chat-interactive-footer">
        <button type="button" class="btn-promise-rep" id="btn-promise-rep">
          <span>🌅 Hứa từ nay sẽ rep tin nhắn siêu nhanh!</span>
        </button>
        <p id="rep-response-msg" class="rep-msg-text"></p>
      </div>
    </div>
  </section>

  <!-- THẺ MÁY BAY TỐT NGHIỆP (Boarding Pass) -->
  <section class="scene-section scene-ticket reveal">
    <div class="scene-header">
      <span class="scene-tag">Boarding Pass</span>
      <h2>Thẻ Máy Bay Tốt Nghiệp Monash</h2>
      <p class="scene-desc">Vé mời VIP hạng First Class dành riêng cho Như Mai tại Lễ Tốt Nghiệp 2026.</p>
    </div>

    <div class="boarding-pass">
      <div class="pass-header">
        <div class="airline-logo">MONASH GRADUATION · 2026</div>
        <div class="flight-type">BOARDING PASS / FIRST CLASS</div>
      </div>

      <div class="pass-body">
        <div class="pass-row route-row">
          <div class="loc-code">SGN</div>
          <div class="flight-path">
            <span class="dot"></span>
            <div class="flight-line"></div>
            <span class="plane-icon">✈</span>
            <span class="dot"></span>
          </div>
          <div class="loc-code">MEL</div>
        </div>

        <div class="pass-grid">
          <div class="pass-col">
            <span class="pass-label">Hành khách / Passenger</span>
            <span class="pass-val">NHƯ MAI</span>
          </div>
          <div class="pass-col">
            <span class="pass-label">Chuyến bay / Flight</span>
            <span class="pass-val">GRAD · 26</span>
          </div>
          <div class="pass-col">
            <span class="pass-label">Địa điểm / Destination</span>
            <span class="pass-val">Monash University - Clayton</span>
          </div>
          <div class="pass-col">
            <span class="pass-label">Thành phố / City</span>
            <span class="pass-val">Melbourne, VIC</span>
          </div>
          <div class="pass-col">
            <span class="pass-label">Thời gian / Date & Time</span>
            <span class="pass-val highlight-val">Sẽ cập nhật</span>
          </div>
          <div class="pass-col">
            <span class="pass-label">Trạng thái / Status</span>
            <span class="pass-val">CONFIRMED 🌅</span>
          </div>
        </div>
      </div>

      <div class="pass-footer">
        <div class="barcode-graphic">
          ||| | |||| || | ||||| || |||| ||| |||| | |||| ||||
        </div>
        <div class="seat-badge">GHẾ VIP · A01</div>
      </div>
    </div>
  </section>

  <!-- LÁ THƯ RIÊNG (Personal Message) -->
  <section class="scene-section scene-letter reveal">
    <div class="scene-header">
      <span class="scene-tag">Personal Letter</span>
      <h2>Lá Thư Tốt Nghiệp Gửi Như Mai</h2>
    </div>

    <div class="personal-letter-card">
      <div class="letter-stamp">GRAD 2026</div>

      <!-- ✉️ VIẾT THƯ Ở ĐÂY -->
      <div class="letter-content placeholder">
        <p>Gửi <strong>Như Mai</strong>,</p>
        <p>Thế là tụi mình đã đi cùng nhau một đoạn đường thật dài từ những năm tháng còn học cấp 2 ngô nghê, cho đến hôm nay khi cả hai đều đã trưởng thành và cầm trên tay tấm bằng tốt nghiệp đại học!</p>
        <p>Cảm ơn Như Mai vì luôn là một người bạn dịu dàng, chân thành và mang đến sự ấm áp nhẹ nhàng mỗi khi trò chuyện. Chúc bạn sang tuổi mới, hành trình mới sẽ luôn sống hạnh phúc với chính bản thân mình, luôn giữ tinh thần yêu đời, tự tin bước đi trên con đường mình đã chọn và gặt hái thật nhiều thành công rực rỡ.</p>
        <p>Và một lời chúc siêu đặc biệt từ tận đáy lòng: chúc Như Mai từ nay sẽ học được cách <em>rep tin nhắn nhanh hơn</em> để bạn bè đỡ phải mòn mỏi chờ đợi nhé! 🤣🤣</p>
        <p class="letter-sign">Hẹn gặp bạn tại Melbourne ngày tốt nghiệp nhé! 🎓🌅</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <p>© 2026 Monash University Graduation · Designed with 🌅 for Như Mai</p>
  </footer>

</div>

<!-- ══ PHẦN MÁY MÓC — STYLES & SCRIPTS ══ -->
<style>
:root {
  color-scheme: dark;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Be Vietnam Pro', system-ui, -apple-system, sans-serif;

  /* Natural Sunset Ocean Palette */
  --bg-deep: #090919;
  --bg-card: #15102a;
  --bg-card-glass: rgba(21, 16, 42, 0.82);
  
  /* Sunset & Ocean Color Tokens */
  --twilight-violet: #8a36d2;
  --sunset-magenta: #d946ef;
  --sunset-coral: #ff5c8a;
  --sunset-orange: #ff7b00;
  --golden-amber: #ffc300;
  --ocean-blue: #0d2b45;
  --ocean-cyan: #38bdf8;

  --text-bright: #ffffff;
  --text-sub: #e2e8f0;
  --text-muted: #94a3b8;

  --border-line: rgba(255, 123, 0, 0.22);
  --border-glow: rgba(217, 70, 239, 0.4);
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background-color: var(--bg-deep); font-family: var(--font-sans); color: var(--text-bright); overflow-x: hidden; }

/* Authentic Sunset Ocean Backdrop */
#sky {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: 
    radial-gradient(ellipse at 50% 20%, rgba(255, 123, 0, 0.2) 0%, rgba(217, 70, 239, 0.15) 45%, transparent 75%),
    radial-gradient(ellipse at 80% 80%, rgba(56, 189, 248, 0.12) 0%, transparent 60%),
    linear-gradient(180deg, #0a0618 0%, #160c2b 35%, #23103c 65%, #0b1728 100%);
  pointer-events: none;
}

/* DOB Gate Card */
#gate {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.gate-card {
  background: var(--bg-card-glass);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid var(--border-glow);
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 35px rgba(255, 123, 0, 0.2);
  padding: clamp(2rem, 5vw, 3.25rem) clamp(1.5rem, 4vw, 3rem);
  max-width: 26rem;
  width: 100%;
  text-align: center;
  position: relative;
  transition: transform 0.3s ease;
}
.gate-card.shake { animation: shake 0.45s ease; }
@keyframes shake {
  20% { transform: translateX(-8px); }
  40% { transform: translateX(7px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(3px); }
}
.crest {
  width: 3.5rem; height: 3.5rem;
  margin: 0 auto 1.1rem;
  border: 1.5px solid var(--sunset-coral);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-serif);
  font-size: 1.3rem;
  color: var(--golden-amber);
  background: rgba(255, 123, 0, 0.12);
  box-shadow: 0 0 20px rgba(255, 123, 0, 0.3);
}
.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--sunset-coral);
  margin: 0 0 0.5rem;
  font-weight: 600;
}
.gate-card h1 {
  font-family: var(--font-serif);
  font-size: clamp(1.7rem, 6vw, 2.2rem);
  margin: 0 0 1rem;
  color: var(--text-bright);
}
.gate-seal {
  font-size: 0.9rem;
  color: var(--text-sub);
  margin: 0 0 1.5rem;
  line-height: 1.6;
}

/* Custom Select Dropdowns */
.dob-selects {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin: 1rem 0;
}
.custom-select {
  position: relative;
  font-size: 1.15rem;
  color: var(--text-bright);
  width: 5.5rem;
  outline: none;
}
.select-trigger {
  border-bottom: 2px solid var(--border-line);
  padding: 0.45rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.06);
  border-radius: 6px;
  transition: all 0.25s ease;
}
.custom-select:hover .select-trigger,
.custom-select.open .select-trigger {
  border-bottom-color: var(--sunset-orange);
  background: rgba(255, 123, 0, 0.18);
}
.select-options {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 12rem;
  overflow-y: auto;
  background: #170d2c;
  border: 1px solid var(--border-glow);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.9);
  z-index: 20;
  margin-top: 4px;
}
.custom-select.open .select-options { display: block; }
.select-options .option {
  padding: 0.5rem;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
  transition: background 0.15s ease;
}
.select-options .option:hover {
  background: linear-gradient(90deg, var(--sunset-orange), var(--sunset-magenta));
  color: #fff;
}
.dob-sep { color: var(--sunset-orange); font-weight: bold; }

.btn-submit-gate, .btn-open-letter {
  margin-top: 1.2rem;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(135deg, var(--sunset-orange), var(--sunset-magenta));
  border: none;
  border-radius: 25px;
  padding: 0.85rem 2.2rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 123, 0, 0.4);
  transition: all 0.25s ease;
}
.btn-submit-gate:hover, .btn-open-letter:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(255, 123, 0, 0.6);
}
#gate-error {
  min-height: 2em;
  font-size: 0.85rem;
  color: var(--sunset-coral);
  margin: 0.8rem 0 0;
}

.letter-for {
  font-size: 1.1rem;
  color: var(--text-sub);
  margin-bottom: 1rem;
}
.letter-for strong { color: var(--golden-amber); }

/* Main Layout Container */
.invitation-container {
  max-width: 44rem;
  margin: 0 auto;
  padding: 2rem 1.2rem 4rem;
}
.invitation-container.hidden { display: none; }

/* Header Hero */
.hero-header {
  text-align: center;
  padding: 2.5rem 1rem 3.5rem;
}
.hero-badge {
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--golden-amber);
  background: rgba(255, 195, 0, 0.12);
  border: 1px solid rgba(255, 195, 0, 0.35);
  padding: 0.4rem 1.2rem;
  border-radius: 20px;
  margin-bottom: 1.2rem;
}
.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(2.6rem, 8vw, 4rem);
  margin: 0 0 1rem;
  background: linear-gradient(135deg, #ffffff, var(--sunset-coral), var(--golden-amber));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-subtitle {
  font-size: 1.05rem;
  color: var(--text-sub);
  max-width: 33rem;
  margin: 0 auto;
  line-height: 1.7;
}

/* Scene Section Base */
.scene-section {
  margin-bottom: 3.5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.scene-section.visible {
  opacity: 1;
  transform: translateY(0);
}
.scene-header {
  margin-bottom: 1.5rem;
}
.scene-tag {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--sunset-orange);
  font-weight: 700;
}
.scene-header h2 {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 5vw, 2.1rem);
  margin: 0.3rem 0 0.5rem;
}
.scene-desc {
  font-size: 0.92rem;
  color: var(--text-sub);
  margin: 0;
  line-height: 1.6;
}

/* SCENE 1: Sunset Ocean Horizon Canvas */
.sunset-ocean-canvas {
  position: relative;
  height: 250px;
  background: linear-gradient(180deg, 
    #180336 0%, 
    #3f094b 28%, 
    #851c54 50%, 
    #d94e45 68%, 
    #ff8000 76%, 
    #0c223a 77%, 
    #06111f 100%);
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 128, 0, 0.4);
  box-shadow: 0 15px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255, 128, 0, 0.25);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1.2rem;
}

/* Glowing Sun & Water Reflection */
.sun-wrapper {
  position: absolute;
  top: 105px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.setting-sun {
  width: 75px;
  height: 75px;
  background: radial-gradient(circle, #fff7d6 15%, #ffd166 45%, #ff7b00 75%, transparent 95%);
  border-radius: 50%;
  box-shadow: 0 0 45px #ffd166, 0 0 90px #ff7b00, 0 0 130px rgba(255, 107, 107, 0.6);
}
.sun-reflection {
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 70px;
  background: radial-gradient(ellipse at top, rgba(255, 209, 102, 0.6), rgba(255, 123, 0, 0.3), transparent 80%);
  filter: blur(4px);
}

/* Layered Shimmering Waves */
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 90px;
}
.wave-back {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,30 C150,80 350,-20 500,50 C650,110 900,20 1200,50 L1200,120 L0,120 Z' fill='%239d4edd' fill-opacity='0.3'%3E%3C/path%3E%3C/svg%3E") repeat-x;
  animation: moveWave 14s linear infinite;
  bottom: 10px;
}
.wave-mid {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,40 C200,90 400,0 600,60 C800,110 1000,10 1200,60 L1200,120 L0,120 Z' fill='%23ff6d00' fill-opacity='0.25'%3E%3C/path%3E%3C/svg%3E") repeat-x;
  animation: moveWave 9s linear infinite reverse;
  bottom: 5px;
}
.wave-front {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,20 C180,70 380,-10 580,40 C780,90 980,30 1200,40 L1200,120 L0,120 Z' fill='%230f2b48' fill-opacity='0.85'%3E%3C/path%3E%3C/svg%3E") repeat-x;
  animation: moveWave 18s linear infinite;
  bottom: 0;
}

@keyframes moveWave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.sparkle {
  position: absolute;
  font-size: 1.2rem;
  animation: floatSparkle 3s ease-in-out infinite alternate;
  z-index: 3;
}
@keyframes floatSparkle {
  0% { transform: translateY(0) scale(0.8); opacity: 0.5; }
  100% { transform: translateY(-14px) scale(1.25); opacity: 1; }
}

.ocean-card-content {
  position: relative;
  z-index: 5;
  background: rgba(12, 10, 30, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1.1rem 1.6rem;
  border-radius: 14px;
  max-width: 88%;
  text-align: center;
  border: 1px solid rgba(255, 195, 0, 0.3);
  margin-bottom: 0.5rem;
}
.quote-text {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.98rem;
  color: var(--golden-amber);
  margin: 0;
  line-height: 1.65;
}

/* SCENE 2: Paper Boat Journey */
.boat-journey-card {
  background: var(--bg-card-glass);
  border: 1px solid var(--border-line);
  border-radius: 18px;
  padding: 2rem 1.5rem;
  backdrop-filter: blur(12px);
}
.journey-track {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: 1.5rem;
  gap: 1rem;
}
.journey-node {
  text-align: center;
  z-index: 2;
  flex: 1;
}
.node-icon {
  font-size: 2.3rem;
  margin-bottom: 0.3rem;
}
.node-label {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-bright);
}
.node-sub {
  font-size: 0.78rem;
  color: var(--text-sub);
  margin-top: 0.2rem;
}
.journey-line {
  position: relative;
  flex: 2;
  height: 4px;
  background: rgba(255, 123, 0, 0.25);
  border-radius: 2px;
}
.journey-progress {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, var(--sunset-orange), var(--golden-amber));
  border-radius: 2px;
}
.paper-boat {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  animation: floatBoat 3s ease-in-out infinite alternate;
}
@keyframes floatBoat {
  0% { transform: translate(-50%, 0) rotate(-4deg); }
  100% { transform: translate(-50%, -6px) rotate(4deg); }
}
.journey-note {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-sub);
  border-top: 1px dashed var(--border-line);
  padding-top: 1rem;
}

/* SCENE 3: Chat App Card */
.chat-app-card {
  background: #140d28;
  border: 1px solid var(--border-glow);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 12px 35px rgba(0,0,0,0.5);
}
.chat-header {
  background: #20133c;
  padding: 0.85rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border-bottom: 1px solid var(--border-line);
}
.chat-avatar { font-size: 1.6rem; }
.chat-user-info { flex: 1; }
.chat-name { font-weight: 700; font-size: 0.95rem; color: var(--text-bright); }
.chat-status { font-size: 0.75rem; color: var(--sunset-coral); }
.unread-badge {
  font-size: 0.72rem;
  background: var(--sunset-coral);
  color: #fff;
  padding: 0.25rem 0.65rem;
  border-radius: 12px;
  font-weight: 600;
}
.chat-body {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.chat-bubble {
  max-width: 85%;
  padding: 0.85rem 1.15rem;
  border-radius: 16px;
  font-size: 0.9rem;
  line-height: 1.55;
  position: relative;
}
.bubble-left {
  align-self: flex-start;
  background: #241444;
  color: #f1f2f6;
  border-bottom-left-radius: 4px;
  border: 1px solid rgba(255,255,255,0.08);
}
.bubble-left.bubble-highlight {
  background: linear-gradient(135deg, #371457, #5c1860);
  border-color: var(--sunset-magenta);
}
.bubble-right {
  align-self: flex-end;
  background: rgba(255, 123, 0, 0.15);
  color: var(--golden-amber);
  border-bottom-right-radius: 4px;
}
.bubble-time {
  display: block;
  font-size: 0.68rem;
  color: var(--text-muted);
  margin-top: 0.3rem;
  text-align: right;
}
.typing-indicator span {
  animation: typing 1.4s infinite;
  display: inline-block;
}
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
@keyframes typing {
  0%, 100% { opacity: 0.2; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-3px); }
}

.chat-interactive-footer {
  padding: 1rem 1.2rem;
  background: #0f091f;
  border-top: 1px solid var(--border-line);
  text-align: center;
}
.btn-promise-rep {
  background: linear-gradient(135deg, var(--sunset-orange), var(--sunset-magenta));
  color: #fff;
  border: none;
  border-radius: 22px;
  padding: 0.75rem 1.7rem;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-promise-rep:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 18px rgba(255, 123, 0, 0.5);
}
.rep-msg-text {
  font-size: 0.88rem;
  color: var(--golden-amber);
  margin: 0.6rem 0 0;
  min-height: 1.4em;
  font-weight: 600;
}

/* Boarding Pass Ticket */
.boarding-pass {
  background: linear-gradient(135deg, #1f113a, #100824);
  border: 1px solid var(--sunset-orange);
  border-radius: 18px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.5), 0 0 25px rgba(255, 123, 0, 0.2);
  overflow: hidden;
}
.pass-header {
  background: linear-gradient(90deg, var(--sunset-orange), var(--sunset-magenta));
  padding: 0.85rem 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.pass-body {
  padding: 1.5rem;
}
.route-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.loc-code {
  font-family: var(--font-serif);
  font-size: 2.3rem;
  font-weight: 700;
  color: var(--golden-amber);
}
.flight-path {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1.5rem;
  position: relative;
}
.flight-line {
  height: 2px;
  background: var(--border-glow);
  width: 100%;
}
.plane-icon {
  position: absolute;
  font-size: 1.2rem;
  color: var(--sunset-coral);
}
.dot {
  width: 8px; height: 8px;
  background: var(--sunset-orange);
  border-radius: 50%;
}
.pass-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1.2rem 1rem;
}
.pass-col {
  display: flex;
  flex-direction: column;
}
.pass-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  margin-bottom: 0.2rem;
}
.pass-val {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-bright);
}
.highlight-val { color: var(--golden-amber); }
.pass-footer {
  border-top: 1px dashed var(--border-line);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0,0,0,0.25);
}
.barcode-graphic {
  font-family: monospace;
  letter-spacing: 2px;
  color: var(--text-muted);
  font-size: 0.8rem;
}
.seat-badge {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--sunset-orange);
  background: rgba(255, 123, 0, 0.15);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
}

/* Personal Letter Card */
.personal-letter-card {
  background: var(--bg-card-glass);
  border: 1px solid var(--border-glow);
  border-radius: 18px;
  padding: 2.2rem 1.8rem;
  position: relative;
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
}
.letter-stamp {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  border: 2px dashed var(--sunset-orange);
  color: var(--sunset-orange);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.4rem 0.7rem;
  border-radius: 4px;
  transform: rotate(6deg);
}
.letter-content {
  font-size: 0.98rem;
  line-height: 1.85;
  color: var(--text-sub);
}
.letter-content strong { color: var(--golden-amber); }
.letter-content em { color: var(--sunset-coral); font-style: normal; font-weight: 600; }
.letter-sign {
  margin-top: 1.5rem;
  font-family: var(--font-serif);
  font-size: 1.1rem;
  color: var(--golden-amber);
  text-align: right;
}

/* Site Footer */
.site-footer {
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.08);
}

/* Responsive adjustments */
@media (max-width: 580px) {
  .journey-track { flex-direction: column; gap: 1.5rem; }
  .journey-line { width: 4px; height: 60px; }
  .paper-boat { left: -10px; top: 40%; transform: translateY(-50%); }
  .route-row { font-size: 1.8rem; }
  .pass-grid { grid-template-columns: 1fr 1fr; }
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
  const gateEl = document.getElementById('gate');
  const invEl = document.getElementById('invitation');
  const letterModeEl = document.getElementById('letter-mode');
  const btnUnlockLetter = document.getElementById('btn-unlock-letter');

  // Xử lý Custom Select Dropdowns
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

  function unlock() {
    gateEl.style.display = 'none';
    invEl.classList.remove('hidden');
    initScrollObserve();
    initHeartsEffect();
  }

  // Kiểm tra URL xem có ?m= khớp NGAY_SINH hay không
  const params = new URLSearchParams(window.location.search);
  const mParam = params.get('m');

  if (mParam && normDob(mParam) === normDob(NGAY_SINH)) {
    // Mở ở Chế độ Thư (Letter mode)
    form.style.display = 'none';
    document.getElementById('gate-seal').style.display = 'none';
    letterModeEl.style.display = 'block';

    btnUnlockLetter.addEventListener('click', unlock);
  }

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const dob = getDobValue();
    if (dob.length !== 8) return fail(LOI_CHUA_DU);
    const day = +dob.slice(0, 2), month = +dob.slice(2, 4);
    if (day < 1 || day > 31 || month < 1 || month > 12) return fail(LOI_KHONG_CO);

    if (dob === normDob(NGAY_SINH)) {
      unlock();
    } else {
      fail(LOI_SAI);
    }
  });

  // IntersectionObserver Reveal Animation
  function initScrollObserve() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scene-section').forEach(el => observer.observe(el));
  }

  // Floating Particles Effect (Sunset & Ocean Dusk)
  function initHeartsEffect() {
    if (!TIM_ROI) return;
    const sky = document.getElementById('sky');
    const symbols = ['🌅', '✨', '🌊', '⭐', '💜', '🎈'];
    
    setInterval(() => {
      const el = document.createElement('div');
      el.className = 'floating-particle';
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.cssText = \`
        position: fixed;
        left: \${Math.random() * 100}vw;
        bottom: -20px;
        font-size: \${0.8 + Math.random() * 0.8}rem;
        opacity: \${0.4 + Math.random() * 0.6};
        pointer-events: none;
        z-index: -1;
        animation: floatUp \${6 + Math.random() * 6}s linear forwards;
      \`;
      sky.appendChild(el);
      setTimeout(() => el.remove(), 12000);
    }, 1500);

    const style = document.createElement('style');
    style.textContent = \`
      @keyframes floatUp {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(-105vh) rotate(360deg); opacity: 0; }
      }
    \`;
    document.head.appendChild(style);
  }

  // Interactive Promise Rep Button
  const btnRep = document.getElementById('btn-promise-rep');
  const msgRep = document.getElementById('rep-response-msg');
  if (btnRep) {
    let clickCount = 0;
    const responses = [
      "Đã ghi nhận lời hứa của Như Mai! Từ nay inbox cái rep liền nha! ✨",
      "Hứa thiệt chưa đó nha? Bắt đền nếu sau này nhắn mà 3 tiếng sau mới trả lời! 🤣",
      "Siêu uy tín luôn! 10 điểm cho sự hợp tác của Như Mai! 🌅"
    ];
    btnRep.addEventListener('click', () => {
      msgRep.textContent = responses[clickCount % responses.length];
      clickCount++;
    });
  }

})();
</script>

<!-- Font chữ nhúng (rất dài) — ĐỪNG SỬA -->
<style>
${extractedFonts}
</style>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'guests', 'nhu-mai.html'), htmlContent, 'utf8');
console.log('Successfully embedded Playfair Display and Be Vietnam Pro fonts into guests/nhu-mai.html (bytes: ' + Buffer.byteLength(htmlContent) + ')');
