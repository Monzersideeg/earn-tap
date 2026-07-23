# EarnTap — Getting Started Guide

Follow these steps in order:

---

## 1. Set Up Supabase (Database)

### Step 1: Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Project Settings → API**
4. Copy:
   - **Project URL**
   - **anon public** key

### Step 2: Create Tables
1. In Supabase Dashboard, go to **SQL Editor**
2. Open the file: `supabase/schema.sql`
3. Copy & paste the entire content
4. Click **Run**

This creates all required tables:
- `users`
- `tasks`
- `task_completions`
- `referrals`
- `withdrawals`
- `daily_streaks`
- `user_tasks`

### Step 3: Add Environment Variables

Create a file `.env.local` in the `earn-tap` folder:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

---

## 2. Connect Telegram Bot with Mini App

### Update the Bot

Edit `/home/user/earn-tap-bot/.env`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
MINI_APP_URL=https://your-vercel-app.vercel.app
```

### How it works now:
- When users start the bot, they see a button that opens the Mini App
- Referral codes are automatically passed
- `/verify @channel` command checks channel membership

---

## 3. Deploy the Current Version

### Recommended: Deploy on Vercel (Free)

#### Option A: Quick Deploy (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your `earn-tap` repository
4. Add these Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
5. Click **Deploy**

#### Option B: Manual

```bash
cd earn-tap
npm run build
```

Then deploy the `.next` folder to any hosting platform that supports Next.js.

### After Deployment

1. Copy your Vercel URL (e.g. `https://earn-tap-xyz.vercel.app`)
2. Update your Telegram Bot:
   - Set `MINI_APP_URL` in the bot's `.env`
   - Restart the bot

---

## Quick Commands

### Run locally
```bash
cd earn-tap
npm run dev
```

### Run the Telegram Bot
```bash
cd earn-tap-bot
node index.js
```

---

## Next Steps After Deployment

1. Test the Mini App in Telegram
2. Add real ad networks (AdsGram / Monetag)
3. Build the **User-Created Tasks** system
4. Add more features from the plan

---

**You're now ready to launch!** 🚀

If you need help with any step, just ask.