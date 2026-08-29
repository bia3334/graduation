/* Dựng guests/thy.html — "Tiệm tạp hoá Thy"
   Chỉ dùng cho lần tạo đầu tiên. Sau khi chủ nhà sửa tay trang HTML,
   ĐỪNG chạy lại script này (sẽ ghi đè), hãy sửa thẳng trong file HTML. */
const fs = require('fs');
const path = require('path');

/* ── mấy đoạn lặp đi lặp lại, sinh cho gọn ─────────────── */

// viền răng cưa (mái hiên, mép hoá đơn)
const rangCua = (w, r) => {
  let d = 'M0 0 ';
  for (let x = 0; x < w; x += r * 2) d += `a${r} ${r} 0 0 0 ${r * 2} 0 `;
  return d.trim();
};

// sọc mái hiên
const socHien = (x0, y0, w, h, buoc) => {
  let s = '';
  for (let i = 0, x = x0; x < x0 + w; i++, x += buoc) {
    if (i % 2 === 0) s += `<rect x="${x}" y="${y0}" width="${Math.min(buoc, x0 + w - x)}" height="${h}"/>`;
  }
  return s;
};

// mã vạch trên hoá đơn
const maVach = () => {
  const rong = [3,1,2,1,1,3,1,2,2,1,1,1,3,2,1,1,2,1,3,1,1,2,2,1,1,3,1,1,2,1,2,3,1,1,2,1,1,2,3,1,2,1,1,3,1,2,1,1];
  return rong.map((w, i) => `<span class="vach" style="width:${w}px;opacity:${i % 2 ? 0 : 1}"></span>`).join('');
};

// bàn phím máy tính bỏ túi
const phimMayTinh = () => {
  let s = '';
  let n = 0;
  for (let h = 0; h < 4; h++) {
    for (let c = 0; c < 4; c++) {
      const x = 32 + c * 36, y = 126 + h * 28;
      const dam = c === 3;
      s += `<rect class="phim${dam ? ' phim-dam' : ''}" x="${x}" y="${y}" width="28" height="20" rx="6" style="--i:${n}"/>`;
      n++;
    }
  }
  return s;
};

/* ── hàng trên kệ ──────────────────────────────────────── */
const mon = {
  non: `<g class="ve-non"><path class="non-tam" d="M8 26 L30 16 L52 26 L30 36 Z"/><path class="non-than" d="M18 30 v9 q12 6 24 0 v-9"/><path class="non-tua" d="M46 28 v12"/><circle class="non-chuong" cx="46" cy="43" r="3.5"/></g>`,
  mi:   `<g class="ve-mi"><rect class="mi-goi" x="10" y="16" width="40" height="30" rx="6"/><path class="mi-song" d="M16 27 q7 -6 14 0 q7 6 14 0"/><path class="mi-song" d="M16 36 q7 -6 14 0 q7 6 14 0"/></g>`,
  nuoc: `<g class="ve-nuoc"><path class="chai" d="M24 12 h12 v6 q6 4 6 12 v18 q0 4 -4 4 h-16 q-4 0 -4 -4 v-18 q0 -8 6 -12 z"/><rect class="chai-nap" x="25" y="7" width="10" height="6" rx="2"/><rect class="chai-nhan" x="18" y="28" width="24" height="10" rx="2"/></g>`,
  lon:  `<g class="ve-lon"><rect class="lon-than" x="19" y="14" width="22" height="32" rx="6"/><ellipse class="lon-nap" cx="30" cy="15" rx="11" ry="3.6"/><path class="lon-sang" d="M24 20 v20"/></g>`,
  keo:  `<g class="ve-keo"><path class="lo" d="M18 20 h24 q3 0 3 4 v18 q0 4 -4 4 h-22 q-4 0 -4 -4 v-18 q0 -4 3 -4 z"/><rect class="lo-nap" x="21" y="12" width="18" height="7" rx="3"/><circle class="vien-keo a" cx="26" cy="30" r="4"/><circle class="vien-keo b" cx="35" cy="34" r="4"/><circle class="vien-keo c" cx="28" cy="40" r="4"/><circle class="vien-keo b" cx="37" cy="43" r="3.4"/></g>`,
  banh: `<g class="ve-banh"><rect class="hop" x="12" y="20" width="36" height="24" rx="4"/><path class="no-ngang" d="M12 30 h36"/><path class="no-doc" d="M30 20 v24"/><path class="no-canh" d="M30 22 q-8 -10 -12 -3 q-2 5 12 3 q14 2 12 -3 q-4 -7 -12 3"/></g>`,
  dau:  `<g class="ve-dau"><path class="chai-dau" d="M23 14 h14 v7 q7 5 7 14 v10 q0 3 -3 3 h-22 q-3 0 -3 -3 v-10 q0 -9 7 -14 z"/><rect class="chai-nap" x="25" y="9" width="10" height="6" rx="2"/><path class="dau-song" d="M18 34 q6 -4 12 0 q6 4 12 0 v10 q0 3 -3 3 h-18 q-3 0 -3 -3 z"/></g>`,
  pin:  `<g class="ve-pin"><rect class="vi" x="12" y="16" width="36" height="30" rx="5"/><rect class="cuc-pin" x="18" y="21" width="8" height="20" rx="2"/><rect class="cuc-pin" x="30" y="21" width="8" height="20" rx="2"/><path class="tia" d="M42 24 l-5 8 h4 l-4 8"/></g>`,
  gao:  `<g class="ve-gao"><path class="bao" d="M16 24 q14 -8 28 0 v18 q0 4 -4 4 h-20 q-4 0 -4 -4 z"/><path class="bao-mieng" d="M16 24 q6 -8 14 -4 q8 -4 14 4"/><path class="hat" d="M25 34 h10 M25 39 h10"/></g>`,
  cafe: `<g class="ve-cafe"><path class="tui" d="M16 18 h28 v24 q0 4 -4 4 h-20 q-4 0 -4 -4 z"/><path class="tui-mieng" d="M16 18 l6 -5 h16 l6 5"/><circle class="hat-cafe" cx="26" cy="31" r="4"/><circle class="hat-cafe" cx="35" cy="35" r="4"/></g>`,
};

const keHang = [
  { tang: [
    { m: 'non',  ten: 'Tấm bằng',   gia: 'không bán', dac: true },
    { m: 'keo',  ten: 'Lọ kẹo',    gia: '2.000đ' },
    { m: 'banh', ten: 'Hộp quà',   gia: '25.000đ' },
  ]},
  { tang: [
    { m: 'mi',   ten: 'Mì gói',     gia: '5.000đ' },
    { m: 'nuoc', ten: 'Nước suối',  gia: '8.000đ' },
    { m: 'lon',  ten: 'Nước ngọt',  gia: '12.000đ' },
  ]},
  { tang: [
    { m: 'gao',  ten: 'Gạo thơm',   gia: '18.000đ' },
    { m: 'dau',  ten: 'Dầu ăn',     gia: '45.000đ' },
    { m: 'cafe', ten: 'Cà phê gói', gia: '6.000đ' },
  ]},
];

const veKe = () => keHang.map((t, ti) => `
        <div class="ke-tang">
${t.tang.map((o, i) => `          <div class="o-ke${o.dac ? ' o-dac' : ''}" style="--i:${ti * 3 + i}">
            <svg class="mon" viewBox="0 0 60 56" aria-hidden="true">${mon[o.m]}</svg>
            <p class="mon-ten">${o.ten}</p>
            <p class="mon-gia">${o.gia}</p>
          </div>`).join('\n')}
        </div>`).join('\n');

/* ── khách quen (mấy bạn thú nhỏ) ──────────────────────── */
const thu = {
  meo: `<g class="thu" style="--long:#F6B8C7;--long2:#E88FA6">
      <path class="duoi duoi-meo" d="M70 66 q18 2 13 -14"/>
      <ellipse class="than" cx="50" cy="63" rx="21" ry="19"/>
      <path class="chan" d="M40 79 h8 M52 79 h8"/>
      <path class="tai" d="M36 24 l-5 -15 l16 8 z"/>
      <path class="tai" d="M64 24 l5 -15 l-16 8 z"/>
      <circle class="dau" cx="50" cy="34" r="19"/>
      <g class="mat"><circle cx="43" cy="33" r="2.8"/><circle cx="57" cy="33" r="2.8"/></g>
      <path class="mom" d="M45 40 q5 5 10 0"/>
      <path class="ria" d="M31 35 h-10 M31 40 h-10 M69 35 h10 M69 40 h10"/>
    </g>`,
  cho: `<g class="thu" style="--long:#EFCBA6;--long2:#D9A876">
      <path class="duoi duoi-vay" d="M71 62 q16 -4 12 -16"/>
      <ellipse class="than" cx="50" cy="63" rx="21" ry="19"/>
      <path class="chan" d="M40 79 h8 M52 79 h8"/>
      <path class="tai-cup" d="M34 24 q-13 4 -10 20 q11 3 14 -10 z"/>
      <path class="tai-cup" d="M66 24 q13 4 10 20 q-11 3 -14 -10 z"/>
      <circle class="dau" cx="50" cy="34" r="19"/>
      <g class="mat"><circle cx="43" cy="31" r="2.8"/><circle cx="57" cy="31" r="2.8"/></g>
      <ellipse class="mom-tron" cx="50" cy="42" rx="11" ry="7.5"/>
      <circle class="mui" cx="50" cy="38" r="3"/>
      <path class="luoi" d="M50 45 q4 3 0 7 q-4 -4 0 -7"/>
    </g>`,
  tho: `<g class="thu" style="--long:#F3E3EC;--long2:#DCC2D2">
      <path class="tai-dai" d="M42 20 q-6 -18 2 -18 q7 0 5 18 z"/>
      <path class="tai-dai" d="M58 20 q6 -18 -2 -18 q-7 0 -5 18 z"/>
      <ellipse class="than" cx="50" cy="63" rx="20" ry="19"/>
      <path class="chan" d="M40 79 h8 M52 79 h8"/>
      <circle class="dau" cx="50" cy="35" r="18"/>
      <g class="mat"><circle cx="43" cy="34" r="2.8"/><circle cx="57" cy="34" r="2.8"/></g>
      <path class="mui-y" d="M50 40 l-3 -3 h6 z"/>
      <path class="mom" d="M50 40 v3 M50 43 q-4 3 -7 0 M50 43 q4 3 7 0"/>
      <circle class="ma" cx="37" cy="41" r="4"/><circle class="ma" cx="63" cy="41" r="4"/>
    </g>`,
  chuot: `<g class="thu" style="--long:#F7D9A8;--long2:#E0B878">
      <ellipse class="than" cx="50" cy="60" rx="24" ry="22"/>
      <circle class="tai-tron" cx="33" cy="34" r="8"/>
      <circle class="tai-tron" cx="67" cy="34" r="8"/>
      <circle class="dau" cx="50" cy="42" r="19"/>
      <g class="mat"><circle cx="43" cy="40" r="2.8"/><circle cx="57" cy="40" r="2.8"/></g>
      <circle class="ma" cx="36" cy="48" r="6"/><circle class="ma" cx="64" cy="48" r="6"/>
      <path class="mui-y" d="M50 46 l-2.5 -3 h5 z"/>
      <path class="mom" d="M50 46 v2.5 M50 48.5 q-3 3 -6 0 M50 48.5 q3 3 6 0"/>
    </g>`,
  chim: `<g class="thu" style="--long:#BFD9EE;--long2:#93B9DA">
      <path class="duoi duoi-chim" d="M72 58 l18 -4 l-16 12 z"/>
      <ellipse class="than" cx="52" cy="56" rx="21" ry="19"/>
      <path class="chan" d="M46 74 v6 M56 74 v6"/>
      <circle class="dau" cx="42" cy="38" r="16"/>
      <path class="mo" d="M27 38 l-12 4 l12 5 z"/>
      <g class="mat"><circle cx="41" cy="35" r="2.8"/></g>
      <path class="canh" d="M52 50 q16 4 8 18 q-12 2 -14 -12 z"/>
    </g>`,
  em: `<g class="thu" style="--long:#F9C9D6;--long2:#EBA0B6">
      <path class="ao" d="M32 82 q0 -20 18 -20 q18 0 18 20 z"/>
      <circle class="dau" cx="50" cy="42" r="18"/>
      <g class="mat"><circle cx="43" cy="42" r="2.8"/><circle cx="57" cy="42" r="2.8"/></g>
      <path class="mom" d="M45 49 q5 5 10 0"/>
      <circle class="ma" cx="36" cy="47" r="4"/><circle class="ma" cx="64" cy="47" r="4"/>
      <g class="non-em">
        <path class="non-tam" d="M26 26 L50 15 L74 26 L50 37 Z"/>
        <path class="non-tua" d="M70 28 v11"/>
        <circle class="non-chuong" cx="70" cy="42" r="3.6"/>
      </g>
    </g>`,
};

const khach = [
  { t: 'meo',   ten: 'Mèo mướp',  loi: 'Cho con một hộp cá khô ạ.' },
  { t: 'cho',   ten: 'Cún hàng xóm', loi: 'Con lấy cây xúc xích, ghi sổ nha cô.' },
  { t: 'tho',   ten: 'Thỏ nhà bên', loi: 'Hai củ cà rốt, loại ngọt cơ.' },
  { t: 'chuot', ten: 'Hamster',   loi: 'Nửa gói hạt thôi, con nhỏ mà.' },
  { t: 'chim',  ten: 'Chim sẻ',   loi: 'Một nắm gạo, con trả bằng tiếng hót.' },
  { t: 'em',    ten: 'Em',        loi: 'Còn em mua một chỗ ngồi ở Melbourne — để dành cho chị.' },
];

const veKhach = () => khach.map((k, i) => `
        <li class="the-khach" style="--i:${i}">
          <svg class="ve-thu" viewBox="0 0 100 90" role="img" aria-label="${k.ten}">${thu[k.t]}</svg>
          <div class="bong-noi">
            <p class="khach-ten">${k.ten}</p>
            <p class="khach-loi">${k.loi}</p>
          </div>
        </li>`).join('\n');

/* ── một ngày của chủ tiệm ─────────────────────────────── */
const moc = [
  { gio: '5:30',  viec: 'Kéo cửa, thắp đèn, pha ly cà phê thứ nhất.' },
  { gio: '8:00',  viec: 'Nhập hàng, xếp kệ, cãi giá vài câu với anh giao hàng.' },
  { gio: '12:00', viec: 'Ăn vội mười lăm phút, đang ăn thì có khách gọi.' },
  { gio: '14:00', viec: 'Ghi sổ nợ — ai mua gì chị nhớ hết, chẳng cần xem lại.' },
  { gio: '20:00', viec: 'Đóng cửa tiệm, mở máy tính, bắt đầu ca kế toán.' },
  { gio: '23:00', viec: 'Excel vẫn sáng. Mèo thì ngủ trước từ lâu rồi.' },
];

const veMoc = () => moc.map((m, i) => `
          <li class="moc" style="--i:${i}">
            <span class="moc-cham" aria-hidden="true"></span>
            <p class="moc-gio">${m.gio}</p>
            <p class="moc-viec">${m.viec}</p>
          </li>`).join('\n');

const ARCS_HIEN = rangCua(404, 13).replace('M0 0 ', '');
const ARCS_GATE = rangCua(216, 12).replace('M0 0 ', '');

const meoNgu = '<g class="meo-ngu" style="--long:#F6B8C7;--long2:#E88FA6">'
  + '<path class="duoi" d="M104 34 q20 6 7 17 q-11 7 -19 -7"/>'
  + '<ellipse class="than tho-deu" cx="62" cy="30" rx="44" ry="20"/>'
  + '<circle class="dau" cx="26" cy="27" r="17"/>'
  + '<path class="tai" d="M13 16 l-3 -13 l13 7 z"/>'
  + '<path class="tai" d="M37 15 l5 -12 l-12 7 z"/>'
  + '<path class="mat-nham" d="M17 27 q4 5 8 0 M31 27 q4 5 8 0"/>'
  + '<path class="ria" d="M11 32 h-9 M11 36 h-9"/>'
  + '</g>';

const doc = f => fs.readFileSync(path.join(__dirname, '..', 'scratch', f), 'utf8');

const thay = {
  ARCS_HIEN: ARCS_HIEN,
  ARCS_GATE: ARCS_GATE,
  SOC_HIEN: socHien(38, 96, 404, 48, 28),
  SOC_GATE: socHien(22, 70, 216, 40, 24),
  THU_MEO: thu.meo,
  THU_CHO: thu.cho,
  THU_CHIM: thu.chim,
  MEO_NGU: meoNgu,
  PHIM: phimMayTinh(),
  MA_VACH: maVach(),
  KE_HANG: veKe(),
  MOC: veMoc(),
  KHACH: veKhach(),
  STYLE: doc('thy-style.css').trim(),
  SCRIPT: doc('thy-script.js').trim(),
  FONTS: doc('thy-fonts.css').trim(),
};

let out = doc('thy-body.html');
for (const k of Object.keys(thay)) {
  const dau = '{{' + k + '}}';
  if (!out.includes(dau)) { console.warn('! khong thay cho dat: ' + dau); continue; }
  out = out.split(dau).join(thay[k]);
}
const con = out.match(/\{\{[A-Z_]+\}\}/g);
if (con) throw new Error('con cho trong chua thay: ' + con.join(', '));

const dich = path.join(__dirname, '..', 'guests', 'thy.html');
fs.writeFileSync(dich, out);
console.log('guests/thy.html', (out.length / 1024).toFixed(0) + ' KB');
