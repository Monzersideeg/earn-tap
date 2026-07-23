# EarnTap — Deployment Guide (Vercel)

## Recommended: Deploy on Vercel (Free & Fast)

### Step 1: Push to GitHub

```bash
cd earn-tap
git init
git add .
git commit -m "Initial EarnTap build"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Add these **Environment Variables**:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   ```

5. Click **Deploy**

### Step 3: Update Telegram Mini App URL

After deployment, copy your Vercel URL (e.g. `https://earn-tap.vercel.app`)

Then update your Telegram Bot to use this URL.

---

## Update Telegram Bot

Edit `earn-tap-bot/index.js`:

```js
web_app: { url: "https://your-vercel-app.vercel.app" }
```

Then restart the bot.

---

## Important Notes

- **Telegram Mini Apps** must be served over **HTTPS** (Vercel handles this)
- Use **Environment Variables** in Vercel for production
- For the Telegram Bot, keep it running on a VPS or use a free service like Railway

---

**Your app is now live!**