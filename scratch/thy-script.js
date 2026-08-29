(function () {
  const norm = s => String(s).replace(/\D/g, '');
  const target = norm(NGAY_SINH);
  const gate = document.getElementById('gate');
  const gateDoc = document.getElementById('gate-doc');
  const invite = document.getElementById('invite');
  const form = document.getElementById('gate-form');
  const input = document.getElementById('dob');
  const errEl = document.getElementById('gate-err');
  const itMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let daMo = false;

  // Tự chèn dấu "/" khi gõ ngày sinh
  input.addEventListener('input', () => {
    const d = norm(input.value).slice(0, 8);
    let out = d.slice(0, 2);
    if (d.length > 2) out += '/' + d.slice(2, 4);
    if (d.length > 4) out += '/' + d.slice(4, 8);
    input.value = out;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = norm(input.value);
    if (d.length !== 8) return hong(LOI_CHUA_DU);
    const ngay = +d.slice(0, 2), thang = +d.slice(2, 4);
    if (ngay < 1 || ngay > 31 || thang < 1 || thang > 12) return hong(LOI_KHONG_CO);
    if (d !== target) return hong(LOI_SAI);
    moKhoa();
  });

  function hong(loi) {
    errEl.textContent = loi;
    gateDoc.classList.remove('shake');
    void gateDoc.offsetWidth;
    gateDoc.classList.add('shake');
  }

  function moKhoa() {
    if (daMo) return;
    daMo = true;
    invite.hidden = false;
    gate.classList.add('gate-out');
    setTimeout(() => gate.remove(), 900);
    window.scrollTo(0, 0);
    theoDoiCanh();
    if (KEO_ROI && !itMotion) keoRoi();
  }

  // Vào từ letter.html với ?m=ddmmyyyy → hiện khối "thư dành riêng",
  // chạm "Mở xem" là mở luôn, khỏi nhập lại ngày sinh
  const m = new URLSearchParams(location.search).get('m');
  const letterMode = document.getElementById('letter-mode');
  const letterOpen = document.getElementById('lm-open');
  if (m && norm(m) === target) {
    form.style.display = 'none';
    document.querySelector('.gate-huong-dan').style.display = 'none';
    letterMode.hidden = false;
  }
  letterOpen.addEventListener('click', () => moKhoa());

  // Hiện dần từng cảnh khi cuộn tới
  function theoDoiCanh() {
    const io = new IntersectionObserver((mucs) => {
      mucs.forEach(mu => {
        if (mu.isIntersecting) {
          mu.target.classList.add('inview');
          io.unobserve(mu.target);
        }
      });
    }, { threshold: 0.18 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  // Bấm chuông gọi chủ tiệm
  const nutChuong = document.getElementById('nut-chuong');
  const chuong = document.getElementById('chuong');
  const loiChuTiem = document.getElementById('loi-chu-tiem');
  let hetRung = null;
  nutChuong.addEventListener('click', () => {
    chuong.classList.remove('rung');
    void chuong.offsetWidth;
    chuong.classList.add('rung');
    loiChuTiem.classList.remove('an');
    clearTimeout(hetRung);
    hetRung = setTimeout(() => chuong.classList.remove('rung'), 900);
  });

  // Kẹo và dấu chân mèo rơi nhè nhẹ
  function keoRoi() {
    const canvas = document.getElementById('roi');
    const ctx = canvas.getContext('2d');
    const mau = ['#F2618B', '#FFC94D', '#F9C9D6', '#A8D8C0', '#C93A67'];
    let W = 0, H = 0, dpr = 1, hat = [];

    function doLai() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function moi(dau) {
      return {
        x: Math.random() * W,
        y: dau ? Math.random() * H : -30,
        r: 5 + Math.random() * 7,
        toc: .28 + Math.random() * .55,
        lac: .5 + Math.random() * 1.1,
        pha: Math.random() * Math.PI * 2,
        xoay: Math.random() * Math.PI,
        quay: (Math.random() - .5) * .02,
        loai: Math.random() < .34 ? 'chan' : 'keo',
        mau: mau[(Math.random() * mau.length) | 0]
      };
    }

    function veKeo(h) {
      ctx.beginPath();
      ctx.arc(0, 0, h.r, 0, Math.PI * 2);
      ctx.fillStyle = h.mau;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.75)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, h.r * .55, -0.5, 1.1);
      ctx.stroke();
    }

    function veChan(h) {
      const r = h.r * .42;
      ctx.fillStyle = h.mau;
      ctx.beginPath();
      ctx.ellipse(0, r * 1.1, r * 1.5, r * 1.25, 0, 0, Math.PI * 2);
      ctx.fill();
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.arc(i * r * 1.25, -r * .75, r * .55, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(r * 2.1, r * .1, r * .5, 0, Math.PI * 2);
      ctx.fill();
    }

    function chay() {
      ctx.clearRect(0, 0, W, H);
      for (const h of hat) {
        h.y += h.toc;
        h.pha += .012;
        h.xoay += h.quay;
        h.x += Math.sin(h.pha) * h.lac * .35;
        if (h.y > H + 40) Object.assign(h, moi(false));
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.xoay);
        if (h.loai === 'keo') veKeo(h); else veChan(h);
        ctx.restore();
      }
      requestAnimationFrame(chay);
    }

    doLai();
    window.addEventListener('resize', doLai);
    const soHat = window.innerWidth < 560 ? 12 : 20;
    hat = Array.from({ length: soHat }, () => moi(true));
    chay();
  }
})();
