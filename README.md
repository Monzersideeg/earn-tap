# EarnTap — Telegram Mini App

**EarnTap** is a Telegram Mini App that allows users to earn real money by completing simple tasks.

## Features (MVP)

- ✅ Watch Ads (AdsGram + Monetag ready)
- ✅ Join verified Telegram Channels
- ✅ Daily Missions & Streaks
- ✅ Referral System (2 levels)
- ✅ Daily Lucky Spin
- ✅ Balance & Withdrawal (TON, USDT, PayPal)
- ✅ Beautiful Orange + White UI

## Tech Stack

- Next.js 16 (App Router)
- Supabase (Auth + Database)
- Tailwind + shadcn/ui inspired components
- TypeScript
- Framer Motion + Lucide Icons
- Sonner for toasts

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Setup environment
```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials.

### 3. Run the development server
```bash
npm run dev
```

### 4. Open the Mini App
Visit `http://localhost:3000/earn`

## Project Structure

```
earn-tap/
├── app/
│   ├── (miniapp)/
│   │   ├── earn/          # Watch ads + channel joins
│   │   ├── missions/      # Daily tasks & streaks
│   │   ├── friends/       # Referrals
│   │   ├── arena/         # Leaderboard + games
│   │   └── wallet/        # Balance + withdrawals
│   ├── layout.tsx
│   └── page.tsx           # Landing page
├── utils/supabase/
├── lib/
└── public/
```

## Next Steps

- Connect real Supabase database
- Integrate AdsGram & Monetag
- Build Telegram Bot for channel verification
- Create Admin Dashboard
- Add user-created task system

---

**Built with ❤️ for the Telegram ecosystem**
