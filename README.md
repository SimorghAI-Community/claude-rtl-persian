# راست‌نویس (RTL Fixer for LLMs)

یک افزونه کاربردی، شیک و هوشمند برای مرورگرهای مبتنی بر کروم (Chrome, Brave, Edge) جهت راست‌چین کردن خودکار متن‌ها و اصلاح فونت در وب‌سایت‌های هوش مصنوعی مانند ChatGPT، Gemini و Claude.

# Persian RTL Fixer for Chrome

**Auto-detects Persian/Arabic text and right-aligns it — everywhere — while keeping English, code, formulas, and mixed-language content perfectly readable.**

> 🇮🇷 برای مطالعه‌ی راهنمای فارسی به بخش [«فارسی»](#فارسی) در پایین همین صفحه بروید.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/manifest-v3-brightgreen.svg)](manifest.json)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](#contributing)

---

## Why this exists

Most "RTL fix" extensions work by slapping `dir: rtl` on an entire page or a hardcoded list of CSS classes. That breaks the moment a site redesigns its UI, or the moment a Persian paragraph contains an English sentence, a code snippet, or a bullet list — flipping the entire block the wrong way.

This extension takes a dynamic approach: **it reads the actual text content**, not class names. Every text-bearing element is checked for Persian/Arabic characters at the content level, and its direction is set explicitly — Persian → RTL, everything else → LTR — so nothing is left to inherit the wrong direction from a parent container. Code blocks and math formulas stay LTR no matter where they're nested. Live editors (contenteditable areas, textareas) update direction in real time as you type.

## Features

- **Content-based detection** — no fragile reliance on a site's CSS classes or DOM structure.
- **Real-time Streaming Support** — equipped with a high-performance `MutationObserver` that dynamically catches and fixes LLM tokens word-by-word as they stream.
- **Mixed-language safe** — a fully English paragraph inside a Persian article stays left-aligned, and vice versa.
- **Code & Math Protection** — `<pre>` blocks, inline `<code>`, and LaTeX math formulas (`.katex`) always render LTR, including mid-sentence in an RTL paragraph.
- **Live typing support** — direction updates instantly in chat boxes, rich-text editors, and `<textarea>` fields.
- **Zero permissions** — minimal footprint; it only utilizes necessary content-script environments to process layouts safely.

## Supported sites

| Site | Status |
|---|---|
| [chatgpt.com](https://chatgpt.com) | ✅ Supported |
| [gemini.google.com](https://gemini.google.com) | ✅ Supported |
| [claude.ai](https://claude.ai) | ✅ Supported |
| Your favorite site | 🙌 [Open an issue or PR](#contributing) |

Adding a new site is usually a **one-line change** in `manifest.json`.

## Installation

### Option A — Chrome Web Store (recommended)
> 🔗 *Coming soon — link will be added here once the listing is published.*

### Option B — Manual install (for testing / development)
1. Clone or download this repository.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (top-right toggle switch).
4. Click **Load unpacked** and select the project folder containing `manifest.json`.

## How it works (technical overview)

| File | Responsibility |
|---|---|
| `manifest.json` | Manifest V3 config — declares target LLM domains and script access hooks. |
| `background.js` | Service worker handles context menu initialization and manual layout override signals. |
| `content.js` | Core engine: watches DOM mutations, detects RTL text ranges via regex, and injects safe inline styling. |

The detection logic lives entirely in `content.js` and is intentionally framework-agnostic — it works on plain HTML, ProseMirror-based editors, and any `contenteditable` region.

## Contributing

This project is built for the Persian-speaking web, and it gets better with every contributor. **All skill levels and all kinds of contributions are welcome** — you don't need to be a JavaScript expert to help.

Ways to contribute:

- 🌐 **Add support for a new site** — update the `matches` array in `manifest.json` and test that Persian/English blocks render correctly there.
- 🐛 **Report a bug** — screenshots of misaligned text are extremely helpful; open an [issue](../../issues) with the URL and a screenshot.
- 🧠 **Improve detection logic** — edge cases (mixed-script inline elements, RTL numerals, Kurdish/Arabic dialect ranges, etc.) in `content.js`.
- 🎨 **Design real icons** — the current `icon16/48/128.png` files are placeholders and could use a proper logo.

### Submitting changes

1. Fork the repository
2. Create a branch: `git checkout -b feature/add-site-support`
3. Make your changes and test them locally (see [Manual install](#option-b-manual-install-for-testing--development))
4. Commit with a clear message: `git commit -m "Add support for example.com"`
5. Push and open a Pull Request describing what you changed and why.

### Code style

- Keep `content.js` dependency-free (no build step, no bundler) — it should stay a plain script anyone can read top to bottom.
- Prefer explicit direction assignment over relying on CSS inheritance (see the reasoning in [Why this exists](#why-this-exists)).

## Roadmap / ideas

- [ ] Publish to the Chrome Web Store
- [ ] Firefox Add-ons port
- [ ] Options page to let users add custom sites without editing the manifest
- [ ] Support for additional RTL languages (Arabic-first sites, Kurdish, Urdu)

## License

Distributed under the [MIT License](LICENSE). Free to use, modify, and redistribute.

## Acknowledgments

Built and maintained by the community, for the Persian-speaking web. Thank you to everyone who files an issue, tests a fix, or opens a PR — this project only exists because of that.

---

<a id="فارسی"></a>
## فارسی

**تشخیص خودکار متن فارسی/عربی و راست‌چین کردن آن — همه‌جا — بدون به‌هم‌ریختن متن انگلیسی، کد، فرمول‌های ریاضی یا محتوای ترکیبی.**

### چرا این پروژه ساخته شد

بیشتر افزونه‌های «راست‌چین‌کننده» با تحمیل `dir: rtl` روی کل صفحه یا با تکیه بر یک لیست ثابت و شکننده از کلاس‌های CSS کار می‌کنند. این روش با هر تغییر جزئی در طراحی سایت، یا وقتی یک پاراگراف فارسی حاوی یک جمله انگلیسی یا یک قطعه کد باشد، از هم می‌پاشد و جهت کل بلاک را معکوس می‌کند.

این افزونه رویکرد متفاوتی دارد: **محتوای واقعی متن را در لحظه می‌خواند**، نه نام کلاس‌ها را. جهت هر عنصر متنی صراحتاً بر اساس زبان خودش تعیین می‌شود — فارسی → راست‌چین، غیر آن → چپ‌چین — بدون اینکه چیزی از والدینش به ارث برده شود. بلوک‌های کد و فرمول‌های ریاضی (`LaTeX`) همیشه چپ‌چین می‌مانند، حتی وسط یک جمله فارسی. ادیتورهای زنده (کادرهای قابل‌ویرایش، textarea) هم حین تایپ جهت‌شان به‌صورت آنی به‌روزرسانی می‌شود.

### امکانات

- **تشخیص بر پایه محتوا** — بدون وابستگی شکننده به کلاس‌ها یا ساختار DOM هر سایت.
- **پشتیبانی کامل از استریم متن** — به لطف استفاده هوشمندانه از `MutationObserver` متن‌هایی که کلمه به کلمه توسط هوش مصنوعی تولید می‌شوند، بدون تاخیر راست‌چین خواهند شد.
- **ایمن در برابر محتوای ترکیبی** — پاراگراف کاملاً انگلیسی وسط یک پاسخ فارسی، چپ‌چین باقی می‌ماند و برعکس.
- **کد و ریاضی دست‌نخورده می‌مانند** — تگ‌های `<pre>`، `<code>` درون‌خطی و کدهای فریم‌ورک ریاضی (`.katex`) همواره چپ‌چین رندر می‌شوند.
- **پشتیبانی از تایپ زنده** — جهت متن در کادرهای چت، ادیتورهای متنی و `<textarea>` بلافاصله بر اساس زبان ورودی به‌روز می‌شود.
- **بدون درخواست دسترسی‌های خاص** — در مانیفست هیچ دسترسی سنگینی درخواست نشده و امنیت کاربر کاملاً حفظ می‌شود.

### سایت‌های پشتیبانی‌شده

| سایت | وضعیت |
|---|---|
| chatgpt.com | ✅ پشتیبانی می‌شود |
| gemini.google.com | ✅ پشتیبانی می‌شود |
| claude.ai | ✅ پشتیبانی می‌شود |
| سایت مورد علاقه شما | 🙌 [یک issue یا PR باز کنید](#مشارکت) |

اضافه کردن یک سایت جدید معمولاً فقط **یک خط تغییر** در `manifest.json` نیاز دارد.

### نصب و راه‌اندازی

**روش الف — فروشگاه کروم (توصیه‌شده):** به‌زودی لینک پس از انتشار نهایی اینجا قرار می‌گیرد.

**روش ب — نصب دستی (برای تست/توسعه):**
۱. پروژه را به صورت فایل ZIP دانلود کرده و از حالت فشرده خارج کنید.
۲. آدرس `chrome://extensions` را در مرورگر باز کنید.
۳. گزینه **Developer mode** را در بالا سمت راست روشن کنید.
۴. روی دکمه **Load unpacked** کلیک کرده و پوشه اصلی پروژه را انتخاب کنید.

### مشارکت

این پروژه برای وب فارسی‌زبان ساخته شده و با هر مشارکتی بهتر می‌شود. **هر سطح مهارتی خوش‌آمد است** — لازم نیست متخصص جاوااسکریپت باشید تا کمک کنید.

راه‌های مشارکت:
- 🌐 افزودن پشتیبانی از یک سایت جدید به لیست `manifest.json`
- 🐛 گزارش باگ همراه با اسکرین‌شات و آدرس صفحه در بخش Issues
- 🧠 بهبود منطق تشخیص در کدهای `content.js` (حالت‌های خاص، اعداد فارسی/عربی، زبان‌های دیگر مثل کردی)
- 🎨 طراحی آیکون اختصاصی و واقعی برای افزونه (آیکون‌های فعلی صرفاً جای‌گذار هستند)

### لایسنس

تحت [مجوز MIT](LICENSE) منتشر شده است — استفاده، تغییر و بازنشر آزاد است.