'use client';

import React, { useState } from 'react';
import { Play, Users, TrendingUp, Gift } from 'lucide-react';
import { toast } from 'sonner';
import { useTelegram } from '@/lib/telegram';
import AdPlayer from '@/components/AdPlayer';
import { AdResult } from '@/lib/ads';

export default function EarnPage() {
  const { user, isReady } = useTelegram();
  const [balance, setBalance] = useState(1240);
  const [todayEarned, setTodayEarned] = useState(185);
  const [showAdPlayer, setShowAdPlayer] = useState(false);

  const handleAdComplete = (result: AdResult) => {
    setBalance(prev => prev + result.reward);
    setTodayEarned(prev => prev + result.reward);
    setShowAdPlayer(false);
    
    toast.success(`+${result.reward} ACN earned!`, {
      description: `Thank you for watching`,
    });
  };

  if (!isReady) {
    return <div className="flex h-64 items-center justify-center">Loading...</div>;
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header - Matching Original Screenshot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold text-lg">
            D
          </div>
          <div>
            <div className="font-bold text-xl">WELCOME BACK</div>
            <div className="text-sm text-[#6B7280]">@{user?.username || 'demo_user'} • PRO</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-[#FF6B00] font-bold text-4xl tabular-nums">{balance}</div>
          <div className="text-xs text-[#6B7280] -mt-1">ACN ≈ $1.24</div>
        </div>
      </div>

      {/* Today's Earnings */}
      <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB]">
        <div className="text-xs text-[#6B7280]">TODAY'S EARNINGS</div>
        <div className="flex items-end justify-between mt-1">
          <div>
            <div className="text-[#FF6B00] text-5xl font-bold">+{todayEarned}</div>
            <div className="text-2xl font-bold text-[#FF6B00]">ACN</div>
          </div>
          <div className="bg-[#E8F5E9] text-[#00C853] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +32% from yesterday
          </div>
        </div>
      </div>

      {/* Today's Missions Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-bold text-2xl">Today's Missions</div>
          <div className="text-sm text-[#6B7280]">Complete tasks daily to earn high bonus rewards</div>
        </div>
        <div className="bg-[#E8F5E9] text-[#00C853] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Gift className="w-3.5 h-3.5" /> BONUS XP
        </div>
      </div>

      {/* Watch Ads Card - Matching Original */}
      <div 
        onClick={() => setShowAdPlayer(true)}
        className="bg-white rounded-2xl p-5 border-2 border-[#FF6B00] active:scale-[0.985] transition-transform cursor-pointer"
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 bg-[#FFF3E0] rounded-2xl flex items-center justify-center flex-shrink-0">
            <Play className="w-6 h-6 text-[#FF6B00]" />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <div className="font-bold text-xl">Watch 10 ads</div>
                <div className="text-[#6B7280]">Watch real rewarded placements</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#FF6B00] text-xl">+150 ACN</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div className="h-full bg-[#FF6B00] w-[60%]" />
              </div>
              <div className="text-xs text-[#6B7280] mt-1.5">6/10</div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Channel */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-[#E8F5E9] rounded-2xl flex items-center justify-center">
            <Users className="w-5 h-5 text-[#00C853]" />
          </div>
          <div>
            <div className="font-bold text-xl">Join Telegram channel</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB]">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold">@EarnTapOfficial</div>
              <div className="text-sm text-[#6B7280]">+100 ACN</div>
            </div>
            <div className="bg-[#E8F5E9] text-[#00C853] px-4 py-1 rounded-full text-sm font-semibold">
              ✓ Claimed
            </div>
          </div>
        </div>
      </div>

      {/* Ad Player Modal */}
      {showAdPlayer && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-end justify-center">
          <div className="w-full max-w-[480px] bg-white rounded-t-3xl">
            <div className="p-4 flex justify-between border-b">
              <div className="font-semibold">Watch Rewarded Ads</div>
              <button onClick={() => setShowAdPlayer(false)} className="text-[#6B7280]">Close</button>
            </div>
            <div className="p-5">
              <AdPlayer 
                onComplete={handleAdComplete}
                onClose={() => setShowAdPlayer(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
