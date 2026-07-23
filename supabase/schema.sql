-- EarnTap Database Schema
-- Run this in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  telegram_id BIGINT UNIQUE NOT NULL,
  username TEXT,
  first_name TEXT,
  avatar_url TEXT,
  balance_available DECIMAL(10,2) DEFAULT 0,
  balance_pending DECIMAL(10,2) DEFAULT 0,
  total_earned DECIMAL(10,2) DEFAULT 0,
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES users(id),
  country TEXT,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  reward_amount DECIMAL(10,2) NOT NULL,
  task_type TEXT NOT NULL, -- 'ad', 'channel', 'user_task', 'survey'
  verification_method TEXT,
  status TEXT DEFAULT 'active',
  created_by UUID REFERENCES users(id),
  max_completions INTEGER,
  current_completions INTEGER DEFAULT 0,
  country_target TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Task completions
CREATE TABLE task_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  proof_data JSONB,
  reward_paid DECIMAL(10,2),
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referrals
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID REFERENCES users(id),
  referred_id UUID REFERENCES users(id),
  level INTEGER, -- 1 or 2
  reward_paid DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Withdrawals
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10,2),
  method TEXT, -- 'ton', 'usdt', 'paypal'
  wallet_address TEXT,
  status TEXT DEFAULT 'pending',
  tx_hash TEXT,
  fee DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily streaks
CREATE TABLE daily_streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) UNIQUE,
  current_streak INTEGER DEFAULT 0,
  last_checkin TIMESTAMPTZ,
  total_checkins INTEGER DEFAULT 0
);

-- User-created tasks (paid promotions)
CREATE TABLE user_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES users(id),
  task_type TEXT, -- 'channel_join', 'website', 'app_download'
  target_url TEXT,
  target_count INTEGER,
  price_per_completion DECIMAL(10,2),
  total_paid DECIMAL(10,2),
  platform_fee DECIMAL(10,2),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_telegram_id ON users(telegram_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_task_completions_user ON task_completions(user_id);
CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);
