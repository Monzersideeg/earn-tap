# EarnTap — Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your **Project URL** and **anon public key**

## 2. Run the Database Schema

1. Open your Supabase Dashboard → **SQL Editor**
2. Copy and paste the entire content of `supabase/schema.sql`
3. Click **Run**

This will create all the necessary tables:
- `users`
- `tasks`
- `task_completions`
- `referrals`
- `withdrawals`
- `daily_streaks`
- `user_tasks`

## 3. Enable Row Level Security (Recommended)

After running the schema, add these RLS policies in SQL Editor:

```sql
-- Users can only see their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
```

## 4. Update Environment Variables

Create `.env.local` in the root of `earn-tap`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
```

## 5. (Optional) Seed Sample Data

You can run this in SQL Editor to add test data:

```sql
-- Sample user
INSERT INTO users (telegram_id, username, first_name, balance_available, total_earned)
VALUES (123456789, 'demo_user', 'Demo', 1240, 8740);
```

---

**Next:** After setting up Supabase, run:

```bash
npm run dev
```

The app is now connected to your database!