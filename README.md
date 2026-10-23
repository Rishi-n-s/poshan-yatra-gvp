# Poshan Yatra 2026 · Group G-051 Gir Somnath
### Gujarat Vidyapith · Padyatra Management Web Application

A production-ready Progressive Web App (PWA) designed for field reporting across Gir Somnath talukas (**Kodinar, Talala, Una, Veraval, Sutrapada**).

---

## 🌟 Highlights & Features
- **Zero-Config Ready**: Works immediately on any browser (desktop or mobile) without requiring external setup.
- **Full Offline PWA Support**: Caches offline using `sw.js` and `manifest.webmanifest`. Works reliably in rural areas with spotty network.
- **Dual Storage Engine**:
  - **Local Mode (Default)**: Automatically uses persistent browser IndexedDB. Zero setup required.
  - **Cloud Live Sync (Optional)**: Seamlessly connects to Firebase Firestore & Storage when credentials are added to `config.js`.
- **Pre-Configured Team Logins**:
  - Kodinar Team 1 & 2 (`gir_kodinar1`, `gir_kodinar2`)
  - Talala Team 1 (`gir_talala1`)
  - Una Team 1, 2 & 3 (`gir_una1`, `gir_una2`, `gir_una3`)
  - Veraval Team 1, 2 & 3 (`gir_veraval1`, `gir_veraval2`, `gir_veraval3`)
  - Sutrapada Team 1 (`gir_sutrapada1`)
  - Default password is the team code (e.g., `kodinar1`, `talala1`, etc.), or choose team from the Quick Select dropdown!
- **Watermarked Camera Stamping**:
  - Stamps Gujarat Vidyapith emblem, Group & Team, Day, School & Village, Date/Time, and GPS coordinates directly on each photo.
- **Excel Report with Embedded Photos**:
  - One-click `.xlsx` download with photos formatted and embedded across Summary, Day-wise reports, and Photo galleries.
- **Data Portability**:
  - One-click JSON backup export and import for transferring reports between phones via WhatsApp.

---

## 🚀 Deployment Options

### Option 1: Direct Local / Mobile Use (Fastest)
Just open `index.html` in any modern browser (Chrome, Edge, Safari, Firefox). You can immediately log in as any team and start recording reports.

### Option 2: Deploy to Vercel (Recommended for Online URL)
1. Push this folder to a GitHub repository, or upload the generated `poshan-yatra-vercel.zip` directly to [Vercel](https://vercel.com).
2. Framework Preset: **Other** (Static HTML).
3. No build command needed.
4. Open the deployed link on any phone or computer!

### Option 3: Optional Cloud Live Sync (Firebase)
If you want all 10 teams' phones to synchronize to a single live cloud database:
1. Create a free project at [Firebase Console](https://console.firebase.google.com).
2. Enable **Firestore Database** in production mode and paste `firestore.rules`.
3. Enable **Storage** and paste `storage.rules`.
4. Under Project Settings > Your Apps, add a Web App and paste your credentials into `config.js`.

---

## 📱 Installing on Phone (PWA)
1. Open the website on your mobile browser (Safari on iOS or Chrome on Android).
2. Tap the browser menu (**Share** on iPhone, **⋮** on Android).
3. Select **"Add to Home Screen"** or **"Install app"**.
4. The app will launch fullscreen with offline support.

---

## 📁 Production Directory Structure
- `index.html` — Main production web application
- `config.js` — Firebase cloud configuration
- `sw.js` — Offline caching service worker
- `manifest.webmanifest` — PWA configuration and mobile icons
- `logo.png` — Official emblem
- `icon-192.png` & `icon-512.png` — PWA home screen icons
- `firestore.rules` & `storage.rules` — Firebase security rules
- `vercel.json` — Vercel static hosting and caching headers
- `poshan-yatra-vercel.zip` — Ready-to-deploy zip bundle
