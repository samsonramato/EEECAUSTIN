# Connecting the Facebook Page (photos & videos)

The site pulls your Facebook Page's latest photos and videos automatically
through the Facebook **Graph API**. The site code is already done — you only
need to do this one-time setup to get two values and paste them into Netlify:

- `FB_PAGE_ID` — your Page's numeric ID
- `FB_ACCESS_TOKEN` — a long-lived Page access token

> **Important:** Graph API works for a Facebook **Page**, not a personal
> profile. If your page has a "Professional dashboard" / Page settings and
> roles, you're good. You must be an **admin** of the Page.

---

## 1. Create a Facebook App (~5 min)

1. Go to <https://developers.facebook.com/apps/> and log in.
2. **Create App** → choose use case **"Other"** → type **"Business"**.
3. Name it anything (e.g. "EEECA Website") and create it.
4. Leave the app in **Development mode** — that's fine. Because you're an
   admin of both the app and the Page, you do **not** need App Review to read
   your own Page's content.
5. From the app dashboard, note your **App ID** and **App Secret**
   (Settings → Basic).

## 2. Get a User token with the right permissions

1. Open the **Graph API Explorer**:
   <https://developers.facebook.com/tools/explorer/>
2. Top-right: select your app in the **Meta App** dropdown.
3. Click **Add a Permission** and enable:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_read_user_content`
4. Click **Generate Access Token** and approve the popup (select your Page
   when asked).

## 3. Find your Page ID and Page token

1. Still in Graph API Explorer, set the request to `GET` and enter:
   ```
   me/accounts
   ```
   Click **Submit**.
2. In the response, find your church Page. Copy its:
   - `id`  → this is your **FB_PAGE_ID**
   - `access_token` → this is a Page token (short-lived; we'll extend it next)

## 4. Make the token long-lived (so it doesn't expire)

1. Exchange your short-lived **user** token for a long-lived one. In a browser,
   visit (replace the 3 values):
   ```
   https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_USER_TOKEN
   ```
   The `SHORT_USER_TOKEN` is the one from the Explorer (the user token, not the
   page token). Copy the returned `access_token` (long-lived user token).
2. Get a **long-lived Page token** using that long-lived user token:
   ```
   https://graph.facebook.com/v21.0/me/accounts?access_token=LONG_LIVED_USER_TOKEN
   ```
   Copy your Page's `access_token` from the response — this one is effectively
   **non-expiring**. That's your **FB_ACCESS_TOKEN**.

   > Tip: paste it into <https://developers.facebook.com/tools/debug/accesstoken/>
   > and confirm "Expires: Never" and Type: "Page".

## 5. Add the values to Netlify

1. Netlify dashboard → your site **eeecaustin** → **Site configuration** →
   **Environment variables** → **Add a variable**.
2. Add both:
   - `FB_PAGE_ID` = your Page ID
   - `FB_ACCESS_TOKEN` = your long-lived Page token
3. **Trigger a redeploy** (Deploys → Trigger deploy → Deploy site), or just
   push any commit.

That's it. Within a deploy, the gallery will show your live Facebook photos
(with a "Fresh from our Facebook page" badge) and a **Recent Videos** section
will appear on the home page. The token is only ever used server-side in the
Netlify function — it is never exposed to visitors.

---

## How it works / where things live

- Serverless endpoint: [`netlify/functions/facebook-media.mjs`](netlify/functions/facebook-media.mjs)
  — calls Graph API, caches for 1 hour, returns `{ photos, videos }`.
- Frontend fetch: [`src/hooks/useFacebookMedia.js`](src/hooks/useFacebookMedia.js)
- Gallery (uses FB photos, falls back to local): [`src/components/Gallery.jsx`](src/components/Gallery.jsx)
- Videos section (hidden until videos exist): [`src/components/FacebookVideos.jsx`](src/components/FacebookVideos.jsx)

## Testing locally

The function only runs under Netlify's dev server, not plain `vite dev`:

```bash
npm i -g netlify-cli   # if not installed
netlify dev            # serves the site + functions at http://localhost:8888
```

Set the two env vars locally first (e.g. a `.env` file with `FB_PAGE_ID=...`
and `FB_ACCESS_TOKEN=...`, which is gitignored). Without them, the site simply
falls back to the local photos.

## Troubleshooting

- **Gallery still shows local photos:** open
  `https://eeecaustin.org/.netlify/functions/facebook-media` in a browser.
  `configured: false` means the env vars aren't set/deployed. An `errors`
  object means the token lacks permission or expired — regenerate it.
- **"Unsupported get request" / empty data:** the page may be a personal
  profile (not a Page), or the token is missing `pages_read_user_content`.
- **Videos don't embed:** they must be public posts on the Page.
