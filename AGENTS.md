# Graduation Invites — rules for all AI agents

This project makes personalized graduation invitation pages, one per invited person.
Read this whole file before touching anything.

## The one big rule

**There is NO template. Every person gets a completely new design, created from scratch.**

- Do not copy another guest's file as a starting point.
- Do not reuse a previous guest's palette, typography, layout, or animation set.
- Design each invite around that specific person: their interests, their vibe, the
  relationship the owner has with them. The owner will describe the person; the agent
  proposes a fresh visual concept before building.

### …but an EXISTING guest's theme is canonical (learned the hard way, 2026-08-11)

"New design from scratch" applies to a **new** guest. Once a guest page exists, the
`Design` column in the guest table below records that person's **identity**: their
signature colour family and their signature motifs. That identity belongs to them.

- When the owner asks to **redesign / "làm lại cho đẹp"** an existing page, they mean
  the **execution** — layout, craft, typography, polish. They do NOT mean the theme.
  Keep the colour family and the motifs; rebuild everything else.
- Never talk a guest out of their colour because another guest already uses it.
  Three guests share pink on purpose (chan-joong pastel pink, minh-thu-2 pastel pink,
  mai-han muted pink + plum) — that is the owner's call, not a conflict to resolve.
  The "don't reuse another guest's palette" line above is guidance for *new* guests
  with no identity yet; it never overrides an established one.
- If a redesign seems to need a different palette or metaphor, **ask the owner first**.
  Shipping a re-themed page and explaining afterwards wasted a full round of work on
  minh-thu-2 and nhu-mai.

## What every invite must still have (the contract, not the design)

These behaviors are shared even though the design never is:

1. **One standalone HTML file per person** at `guests/<slug>.html`. Fully
   self-contained: fonts embedded as data URIs, no CDN/external requests, works
   offline by double-clicking the file.
2. **Vietnamese ONLY.** No English text, no language toggle, no i18n system.
   (The owner removed the earlier VI/EN toggle on purpose.) `<html lang="vi">`.
3. **All words HARDCODED directly in the HTML markup** so the owner edits a
   sentence exactly where it appears — no config objects, no data-* indirection,
   no JS that overwrites visible text. The ONLY things allowed in a small marked
   `CÀI ĐẶT` script block are values JS genuinely needs: the DOB constant
   (`NGAY_SINH`), feature flags (e.g. `TIM_ROI`), and the gate error strings.
   Start the file with a Vietnamese banner comment explaining how to edit, and
   put the giant embedded-font `<style>` at the BOTTOM of the file (labeled
   "ĐỪNG SỬA") so editable text stays near the top.
4. **DOB gate**: the page opens locked; entering that person's date of birth
   (dd/mm/yyyy, auto-formatting input) unlocks it. Wrong date → polite retry
   message + shake. The gate screen shares the per-person visual style, but its
   WORDING must read as a graduation invitation (neutral "bạn"), never address
   the person intimately — the personal voice starts only after unlock.
5. **Scroll-triggered scenes** about the person's interests — drawn/animated
   (CSS/SVG/canvas), not emoji-in-a-circle stamps. Reveal on scroll via
   IntersectionObserver.
6. **Personal message section**: a placeholder paragraph marked with a
   `✉️ VIẾT THƯ Ở ĐÂY` comment telling the owner to replace it (and drop the
   `placeholder` class) when they write the real letter.
7. **Event details** hardcoded in the markup. Confirmed by the owner (2026-08-11) —
   use these exact facts on every page, and don't invent a ceremony start/end time
   beyond them:
   - Ngày: **Thứ Năm, 15/10/2026**
   - Tiệc chào mừng: **13:30 – 15:00**
   - Ổn định chỗ ngồi: **15:30**
   - Địa điểm: **Robert Blackwood Hall, Monash University - Clayton**
   - Destination city/route stays `Melbourne` (or `MEL`).
8. **Mobile-first & Fully Responsive**: Design must be fully responsive for all mobile screens (starting from 320px width up to desktop). Use fluid elements, flexible media queries (e.g. stacking components vertically on phone), clamp for responsive font sizes/paddings, and ensure no horizontal scrolling or content cut-off. Respect `prefers-reduced-motion` and ensure visible keyboard focus.

## Site structure

- **`letter.html` (project root) is the shared front door** — the ONE link given
  to every guest. Neutral warm-paper/gold theme (the project's original gate
  palette: ground #FBF6F1, accent #A98A50, Cormorant) — it must stay
  guest-agnostic; per-person themes live only in the guest pages.
- It holds a `DANH_SACH` array (DOB → guest page path) in its CÀI ĐẶT block.
  On a matching DOB it redirects to `guests/<slug>.html?m=<ddmmyyyy>`.
  When `?m=` matches the guest page's own `NGAY_SINH`, that page does NOT
  auto-open and does NOT re-ask the DOB: its gate card (in the page's own
  visual style) switches to a "letter mode" — the DOB form and instruction
  line are hidden and a hidden `#letter-mode` block is shown instead:
  "Thư này dành riêng cho <person>" + an "Mở xem" button that triggers the
  normal unlock (this state may address the person by name since the DOB
  already verified identity). Every new guest page must implement this.
  Unknown DOB at letter.html → polite retry. The year dropdown covers
  1970–2008 — extend it if a new guest's birth year falls outside.
- **When creating a new guest page, ALWAYS add their row to `DANH_SACH` in
  `letter.html`** as well as to the guest table below.
- Guest pages keep their own gate too, so a directly-shared guest link still works.
- `letter.html` and all guest pages must be hosted together (same folder layout)
  for the relative redirect to work; the redirect does not work in a Claude
  Artifact preview.

## Current guests

| File | Person | Design | Notes |
|---|---|---|---|
| `guests/chan-joong.html` | Phan Bảo Nghi (Chan Joong, "zk iu") — the owner's girlfriend | **THEME (canonical): Pastel-pink garden + boarding pass.** Rebuilt 2026-08-11 for polish only — same palette tokens, same fonts (Cormorant + Dancing Script), same words. Rose arch framing the script name with a self-drawing underline; boarding pass as a physical ticket (perforated stub with punched notches, paper grain, foil sweep across the airline name, CSS barcode, 3D tilt straightening on reveal, plane flying the route arc); bouquet redrawn as layered garden roses + eucalyptus + baby's breath in a paper cone with a ribbon, blooming in sequence; Me→You flight where **the plane is flown by scroll position** (`getPointAtLength` along the path, contrail drawing behind it); rosé glasses that lean in and clink with a light burst, replayable on tap; wax seal stamping onto the letter; falling petals & hearts on a canvas with three depth layers | **Letter written by owner in teen-code voice (zk, iu, nhoa, lun, ck, sn, nhìu, me/you code-switching) — these "misspellings" are INTENTIONAL, never "correct" them.** Verified after the rebuild: every visible string is byte-identical to the previous version except the stub barcode, which said `05122003-MT-…` (Minh Thư's DOB, a copy-paste leftover) and is now `18022003-BN-…`. **The owner hand-added a second gate layer** not described elsewhere: after the correct DOB, a security question ("mk điện thoại của you là gì") checks `MAT_KHAU_BAO_MAT`; letter-mode's "Mở xem" also routes through it. Keep it. The pass keeps bilingual VI/EN field labels — the owner's deliberate boarding-pass styling, left alone. DOB 18/02/2003. |
| `guests/minh-thu.html` | Minh Thư — owner's friend | Coastal mint/green-blue theme + sleeper bus cabin ticket (SGN→MEL, GRAD·26, venue Monash University Clayton); campervan driving along seaside with jumping fish/shrimp, kitten, and jumping food into hot Thai Tom Yum bowl | Warm, friendly tone. Likes beach, green/blue colors, cats, Thai food, luxury resorts. DOB 05/12/2003. |
| `guests/minh-thu-2.html` | Minh Thư 2 — friend | **THEME (canonical): Toán & Data Science, hồng pastel.** Current build **"Sổ tay dữ liệu"** (rebuilt 2026-08-11): pastel-pink graph-paper ground #FFF4F8, plum ink #2A0F1D, pink accent #A8134E; Fraunces / Manrope / JetBrains Mono. Bảng 01 four-year regression line with scatter cloud + confidence band + R²=0,99; Bảng 02 a 4×4 matrix in drawn brackets, main diagonal highlighted as the four milestones; Bảng 03 bell curve "xác suất bạn có mặt"; coordinate plane locating MEL; closes on `Σ (bốn năm) = một tấm bằng` | Creative, intelligent, passionate about Math & Data Science. **Two earlier attempts were rejected for leaving the theme** — a dark ink-night "observatory" (astronomy metaphor, amber accent) and then the same page with only the accent recoloured. Light pastel-pink ground + explicit math/data motifs are the point, not a detail. DOB 31/05/2003. |
| `guests/mai-han.html` | Mai Hân (Cá) — friend | **"Sổ tem kỷ niệm"** (redesigned 2026-08-11, replaced the old Kirby Dreamland / boarding-pass / meme-collage version). Riso two-ink stamp album in muted pink + plum (#E8A0B2 / #5C2743 on cream #FAF0EC); Fraunces + Nunito. Each scene is a perforated stamp (radial-gradient teeth, no images): fish swimming ("Cá thì phải bơi"), blinking cat with fish jar, small round pink creature in a mortarboard, airmail letter SGN→MEL; postmark stamps down on scroll. The owner's three local images are kept and pasted into the album as taped photos: the two cat memes (`cat-cat-meme.webp`, `dancing-cat-dance.webp`) under Tem 02, the dancing Kirby GIF (`Dance Nintendo GIF by Kéké.gif`) under Tem 03 beside the drawn blob | Cute but restrained. Images live as data URIs in a bottom `ẢNH NHÚNG` style block, generated by `tools/nhung-anh-mai-han.js` (re-runnable, replaces the block in place) — the markup only carries short class names + captions. File 1.2 MB (old version was 2.21 MB). DOB 16/09/2003. |
| `guests/nhu-mai.html` | Như Mai — friend since secondary school | **THEME (canonical): Hoàng hôn biển tím + thuyền giấy.** Current build (rebuilt 2026-08-11): fixed full-page twilight backdrop — 8-stop purple sky #0C0517→#2B1447→#7C3A6E→#B0587E→#F0B37E with a star field, half-sunk sun on the horizon, three looping SVG wave layers and a shimmering sun path on purple water; dark glass cards over it; Lora + Manrope. The paper boat is the recurring character (gate, hero, journey, sunset). Cảnh 1 "Chuyến thuyền mười một năm": route drawn by stroke-dashoffset, boat sailing it, buoy milestones 2015→2018→2021→2026 ending at a mortarboard. Cảnh 2 "Lá thư trong chai trôi hơi lâu" carries the slow-reply joke ("tại tớ gửi bằng đường biển") with a bottle that never quite lands + "Đẩy một con sóng cho chai trôi" button. Cảnh 3 "Hoàng hôn của riêng cậu" holds the wishes | Warm, humorous, friendly voice. Wishes her to live happily with herself, love life, and text back faster. **An earlier attempt was rejected for leaving the theme** (an oat-paper "post office" with a courier pigeon). Purple sunset sea + paper boat are the identity, not decoration. DOB 14/09/2003. |
| `guests/me.html` | Mẹ — the owner's mother | Rosewood/military green theme + Live broadcast bridge / Round-trip ticket (MEL→VN, GRAD·26, venue Monash University Clayton); signal bridge arcs + military cap and mortarboard cap with curled sleeping cat | Warm, respectful, deeply emotional tone. She is a soldier (quân nhân) and cannot go abroad. DOB placeholder 30/10/1975. |
| `guests/ba.html` | Ba — the owner's father | Corporate-dossier theme "Biên bản nghiệm thu công trình" in Sơn Hữu brand blue/red (his company), Tinos/Times admin-document styling; scenes: construction-progress timeline to 99%, electrical blueprint circuit (Ba as power source → switch → resistor → grad-cap lamp "CON"), wooden bookshelf with banker's lamp & trophy; business-trip decision + SGN→MEL ticket; animated round red company stamp + signature block | Businessman & electrical engineer, owns company Sơn Hữu, loves books. Warm respectful "ba–con" voice with engineering/business humor. DOB 01/01/1973. |
| `guests/thy.html` | Chị Thy — chị bạn thân hơn tuổi của owner | **THEME (canonical): Tiệm tạp hoá hồng dâu + thú nhỏ.** Nền hồng sữa #FFEBF0 chấm bi, mực nâu ấm #4B322C, hồng dâu #F2618B, vàng bơ #FFC94D, gỗ kệ #E0A87E; Baloo 2 + Quicksand + Roboto Mono (chữ tròn mập, khác hẳn các trang serif). Gate là cửa cuốn đóng có biển "ĐANG NGHỈ", mở khoá thì cửa cuốn kéo lên. Mặt tiền tiệm với mái hiên sọc, mèo bệ cửa, chó ngồi ngoài, chim trên bảng hiệu; Cảnh 1 kệ hàng 3 tầng (hàng hoá vẽ tay bung ra từng món, ô trên cùng để trống cho tấm bằng "không bán"); Cảnh 2 dòng thời gian một ngày 5:30→23:00 + máy tính casio hồng màn hình 15.10.2026 có mèo ngủ trên máy; Cảnh 3 sáu bạn thú xếp hàng mua đồ, bạn cuối là "Em"; Cảnh 4 máy in nhả tờ HOÁ ĐƠN (chính là thiệp mời, có mã vạch + toàn bộ ngày giờ địa điểm); kết bằng biển lật "HÔM NAY NGHỈ NỬA BUỔI" + nút bấm chuông gọi chủ tiệm. Canvas kẹo & dấu chân mèo rơi (`KEO_ROI`) | Chị mở cửa hàng tạp hoá kiêm làm kế toán online — "bận rộn" là chất liệu chính của trang. Thích màu hồng, yêu động vật, thích cute. Giọng chị–em thân thiết, hài hước nhẹ. Dựng bằng `tools/build-thy.js` (ghép `scratch/thy-body.html` + `thy-style.css` + `thy-script.js` + `thy-fonts.css`) — **chỉ dùng cho lần tạo đầu; sau khi owner sửa tay thì đừng chạy lại**. DOB 16/12/2000. |
| `guests/dat.html` | Đạt — em trai của owner, sinh viên RMIT | **THEME (canonical): Hồ sơ nhân vật kiểu game, xanh trời nhạt.** Nền #EDF6FD→#CFE4F6 với khối vuông trôi lơ lửng; Baloo 2 + Be Vietnam Pro. Thẻ nhân vật: avatar khối vuông (kính, áo khoác) nhún nhẹ, chạm thì nhảy, thanh EXP chạy tới MAX; Bảng chỉ số 5 thanh tự đổ đầy khi cuộn (Thời trang 98 · Chăm da 95 · Roblox 99 · Deadline RMIT 90 · Tốc độ rep tin nhắn 41); lưới Trang bị 6 ô icon vẽ nét (áo khoác, kính, thẻ SV RMIT, mặt nạ dưỡng da, tai nghe, ô trống chờ vé); Bản đồ 4 khu isometric — RMIT, spa, server Roblox, và Khu 04 bị ổ khoá, rung rồi bật ra thành Robert Blackwood Hall khi cuộn tới; thiệp mời đóng vai "Nhiệm vụ mới" có Yêu cầu + Phần thưởng; bảng Thành tựu có một thành tựu chưa mở khoá chính là buổi lễ | Xưng hô **"anh – Đạt", gọi thẳng tên, KHÔNG gọi "em"** (owner dặn). Thích thời trang, đi spa mặt, chơi Roblox. Giọng vui, chọc nhẹ kiểu anh em. DOB 07/04/2007. |
| `guests/chung.html` | Khách mời chung (Những người khác) | Giấy ấm & Vàng đồng trung tính (tương tự letter.html) + Thẻ máy bay giấy / Boarding Pass (SGN→MEL, GRAD·26, venue Monash University Clayton); Cánh hoa rơi vàng đồng tinh tế | Mở khóa bằng mọi ngày sinh hợp lệ khác (trừ các ngày sinh của khách thiết kế riêng). |

Add a row here whenever a new guest file is created.

## Practical notes

- Proper document structure: `<meta charset>`, `<meta viewport>`, and `<title>`
  belong inside `<head>`; only the banner comment, CÀI ĐẶT block, markup, styles,
  scripts, and fonts go in `<body>`. (The owner caught a title-in-body mistake once.)

- Privacy trade-off (accepted by owner): guest name/DOB/message are plain text in
  the file source. The DOB gate stops casual visitors only. Don't put anything
  truly sensitive in a message.
- All text is Vietnamese — any embedded font MUST include the `vietnamese`
  subset. `tools/fetch-fonts.js` downloads Google Fonts (latin + vietnamese) and
  writes base64 `@font-face` CSS; edit its `CSS_URL` for whichever typefaces the
  new design needs, then inline the output into the guest file.
- Tự kiểm tra bằng mắt trước khi giao: Chrome headless có sẵn trên máy
  (`C:\Program Files\Google\Chrome\Application\chrome.exe --headless=new --screenshot=...`).
  Bộ script dùng lại được nằm ở `scratch/`: `chup.js` (chụp từng lát trang, tự
  bỏ qua màn khoá), `dt.js` (xem ở bề ngang 320/390px — Chrome ép cửa sổ tối
  thiểu ~500px nên phải nhét trang vào iframe mới đo đúng), `do.js` (in số đo
  layout lên trang rồi chụp), `thu-cong.js` (thử cổng ngày sinh đúng/sai),
  `thu-letter.js` (thử luồng letter.html → trang khách). Chrome ghi file ảnh
  SAU khi tiến trình cha thoát — phải chờ một nhịp rồi mới đọc ảnh.
- Bash heredoc ở môi trường này nuốt mất dấu `\` và hay vỡ ở nội dung dài có
  dấu nháy — nội dung lớn thì viết bằng Write tool, đừng dùng `cat <<EOF`.
- Preview via Claude Artifact: publish a body-only copy (strip the
  `<!doctype>/<html>/<head>/<body>` wrapper first — artifacts wrap content
  themselves). Keep the existing artifact URL by republishing/`url` param.
- The owner may edit guest files by hand at any time. NEVER regenerate or
  overwrite an existing guest file wholesale; make targeted edits only.
