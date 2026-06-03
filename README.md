# Aerial Estates — Web Project

Premium aerial photography & real estate website by Dominik Wiesinger.
Deployed on **Cloudflare Pages** with **Cloudflare Workers Functions**.

---

## Project Structure

```
/
├── src/                    # Frontend source
│   ├── index.html          # Main homepage
│   ├── css/
│   │   └── styles.css      # Global stylesheet
│   └── js/
│       └── main.js         # Client-side JavaScript
│
├── public/                 # Static assets (images, fonts, etc.)
│   └── images/             # Drop your photos here
│
├── functions/              # Cloudflare Pages Functions (serverless)
│   ├── _middleware.js      # Security headers + CORS (runs on every request)
│   └── api/
│       └── contact.js      # POST /api/contact — contact form handler
│
├── scripts/
│   └── build.js            # Copies src/ + public/ → dist/
│
├── dist/                   # Build output (git-ignored) — Cloudflare deploys this
├── wrangler.toml           # Cloudflare configuration
├── package.json
└── .gitignore
```

> **Note:** The original `index.html` at the project root is your full production
> page. To use the structured build pipeline, move its content into `src/index.html`
> (or replace `src/index.html` with it) and run `npm run build`.

---

## Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- Wrangler CLI: `npm install` (included as devDependency)

### Start dev server

```bash
npm install          # install wrangler
npm run build        # build once → dist/
npm run dev          # start local Pages server at http://localhost:8788
```

`npm run dev` uses `wrangler pages dev dist` — it serves `dist/` and runs your
`functions/` as real Workers locally, including `_middleware.js`.

### Watch mode (auto-rebuild on save)

```bash
# Terminal 1
npm run build:watch

# Terminal 2
npm run dev
```

---

## Deploy to Cloudflare Pages

### First-time setup

1. **Login to Cloudflare:**
   ```bash
   npx wrangler login
   ```

2. **Create the Pages project** (once):
   ```bash
   npx wrangler pages project create aerial-estates
   ```

3. **Set secrets** (never commit these):
   ```bash
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put CONTACT_EMAIL
   ```

### Deploy

```bash
npm run deploy          # build + deploy to production
npm run deploy:preview  # build + deploy to preview branch
```

Or connect your Git repo in the [Cloudflare Dashboard](https://dash.cloudflare.com)
and it will auto-deploy on every push to `main`.

---

## Cloudflare Pages — Dashboard Settings

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (default) |
| Node version | `18` |

Set these under **Pages → Your project → Settings → Builds & deployments**.

---

## Adding Images

Drop images into `public/images/`. They'll be available at `/images/your-file.jpg`
after `npm run build`. Reference them in HTML:

```html
<img src="/images/hero.jpg" alt="Aerial view" />
```

---

## Contact Form

The contact form POSTs JSON to `/api/contact` (handled by `functions/api/contact.js`).

It uses [Resend](https://resend.com) for transactional email. Set your API key:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_EMAIL   # e.g. hello@aerial-estates.com
```

The function falls back to `console.log` when no API key is present (useful for local dev).

---

## Custom Domain

In the Cloudflare Dashboard: **Pages → aerial-estates → Custom domains → Add domain**.
Cloudflare handles SSL automatically.
