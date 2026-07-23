'use client';

import React, { useState } from 'react';
import { Play, Users, Gift, TrendingUp, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useTelegram } from '@/lib/telegram';

interface AdTask {
  id: number;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
}

interface ChannelTask {
  id: number;
  title: string;
  channel: string;
  reward: number;
  status: 'available' | 'claimed';
}

export default function EarnPage() {
  const { user, isReady } = useTelegram();
  const [balance] = useState(1240);
  const [todayEarned] = useState(185);

  const adTasks: AdTask[] = [
    { id: 1, title: "Watch 10 ads", description: "Watch real rewarded placements", reward: 150, progress: 6, total: 10 },
    { id: 2, title: "Watch 5 video ads", description: "Premium video content", reward: 95, progress: 2, total: 5 },
  ];

  const channelTasks: ChannelTask[] = [
    { id: 1, title: "Join Telegram channel", channel: "@EarnTapOfficial", reward: 100, status: 'claimed' },
    { id: 2, title: "Join Telegram channel", channel: "@EarnTapRewards", reward: 80, status: 'available' },
  ];

  const handleWatchAd = (taskId: number) => {
    const task = adTasks.find(t => t.id === taskId);
    toast.loading("Opening ad player...", { id: `ad-${taskId}` });
    
    setTimeout(() => {
      toast.success(`+${task?.reward} ACN earned!`, { 
        id: `ad-${taskId}`,
        description: "Thank you for watching"
      });
    }, 2200);
  };

  const handleJoinChannel = (task: ChannelTask) => {
    if (task.status === 'claimed') {
      toast.info("Already claimed");
      return;
    }
    toast.loading(`Joining ${task.channel}...`, { id: `channel-${task.id}` });

    setTimeout(() => {
      toast.success(`+${task.reward} ACN earned!`, { 
        id: `channel-${task.id}`,
        description: "Channel joined successfully"
      });
    }, 1600);
  };

  if (!isReady) {
    return <div className="flex h-[60vh] items-center justify-center">Loading...</div>;
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold">
              {user?.first_name?.[0] || 'U'}
            </div>
            <div>
              <div className="font-semibold">WELCOME BACK</div>
              <div className="text-sm text-[#6B7280]">@{user?.username || 'user'} • PRO</div>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end">
            <div className="text-[#FF6B00] font-bold text-xl">{balance}</div>
            <div className="text-xs text-[#6B7280]">ACN</div>
          </div>
          <div className="text-[10px] text-[#6B7280]">≈ $1.24</div>
        </div>
      </div>

      {/* Today's Earnings Banner */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB] flex items-center justify-between">
        <div>
          <div className="text-xs text-[#6B7280]">TODAY'S EARNINGS</div>
          <div className="text-3xl font-bold text-[#FF6B00]">+{todayEarned} ACN</div>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-1 bg-[#E8F5E9] text-[#00C853] px-3 py-1 rounded-full text-xs font-semibold">
            <TrendingUp className="w-3 h-3" /> +32% from yesterday
          </div>
        </div>
      </div>

      {/* Today's Missions Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-xl">Today's Missions</div>
          <div className="text-sm text-[#6B7280]">Complete tasks daily to earn high bonus rewards</div>
        </div>
        <div className="bg-[#E8F5E9] text-[#00C853] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Gift className="w-3.5 h-3.5" /> BONUS XP
        </div>
      </div>

      {/* Watch Ads Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-[#FFF3E0] p-1.5 rounded-xl">
            <Play className="w-5 h-5 text-[#FF6B00]" />
          </div>
          <div>
            <div className="font-semibold text-lg">Watch Ads</div>
            <div className="text-xs text-[#6B7280]">Highest paying tasks right now</div>
          </div>
        </div>

        <div className="space-y-3">
          {adTasks.map((task) => (
            <div key={task.id} className="mission-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFF3E0] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Play className="w-5 h-5 text-[#FF6B00]" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg">{task.title}</div>
                      <div className="text-sm text-[#6B7280]">{task.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#FF6B00]">+{task.reward} ACN</div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(task.progress / task.total) * 100}%` }} />
                      </div>
                    </div>
                    <div className="text-xs text-[#6B7280] tabular-nums">
                      {task.progress}/{task.total}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => handleWatchAd(task.id)}
                      className="btn-primary px-8 py-2 text-sm flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" /> Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Telegram Channels Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-[#E8F5E9] p-1.5 rounded-xl">
            <Users className="w-5 h-5 text-[#00C853]" />
          </div>
          <div>
            <div className="font-semibold text-lg">Join Telegram Channels</div>
            <div className="text-xs text-[#6B7280]">Verified membership • Instant reward</div>
          </div>
        </div>

        <div className="space-y-3">
          {channelTasks.map((task) => (
            <div key={task.id} className="mission-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#E8F5E9] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#00C853]" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg">{task.title}</div>
                      <div className="text-sm text-[#00C853] font-medium">{task.channel}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#FF6B00]">+{task.reward} ACN</div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    {task.status === 'claimed' ? (
                      <div className="status-claimed flex items-center gap-1.5">✓ Claimed</div>
                    ) : (
                      <button 
                        onClick={() => handleJoinChannel(task)}
                        className="btn-primary px-7 py-2 text-sm"
                      >
                        Join &amp; Claim
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB]">
          <div className="text-xs text-[#6B7280]">Ads watched today</div>
          <div className="text-2xl font-bold mt-0.5">18</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB]">
          <div className="text-xs text-[#6B7280]">Channels joined</div>
          <div className="text-2xl font-bold mt-0.5">7</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB]">
          <div className="text-xs text-[#6B7280]">Streak</div>
          <div className="text-2xl font-bold mt-0.5 flex items-center gap-1">
            14 <span className="text-sm">days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
