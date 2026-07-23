'use client';

import React from 'react';
import { Users, Gift, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function FriendsPage() {
  const referralCode = "ET-8X9K2P";
  const totalReferrals = 47;
  const totalEarned = 1240;

  const copyReferral = () => {
    navigator.clipboard.writeText(`https://t.me/earntap_bot?start=${referralCode}`);
    toast.success("Referral link copied!");
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="font-semibold text-2xl">Invite Friends</div>
        <div className="text-[#6B7280]">Earn up to 2 levels of referral rewards</div>
      </div>

      {/* Referral Stats */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-[#6B7280]">Your Referral Code</div>
            <div className="font-mono text-3xl font-bold tracking-wider text-[#FF6B00] mt-1">{referralCode}</div>
          </div>
          <button onClick={copyReferral} className="btn-primary px-4 py-2 flex items-center gap-2">
            <Copy className="w-4 h-4" /> Copy Link
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#F8F9FA] rounded-xl p-4">
            <div className="text-xs text-[#6B7280]">Friends Invited</div>
            <div className="text-3xl font-bold mt-1">{totalReferrals}</div>
          </div>
          <div className="bg-[#F8F9FA] rounded-xl p-4">
            <div className="text-xs text-[#6B7280]">Earned from Referrals</div>
            <div className="text-3xl font-bold mt-1 text-[#FF6B00]">+{totalEarned} ACN</div>
          </div>
        </div>
      </div>

      {/* Referral Levels */}
      <div>
        <div className="font-semibold mb-3">Referral Rewards</div>
        
        <div className="space-y-3">
          <div className="mission-card flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFF3E0] rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-[#FF6B00]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Level 1 Friends</div>
              <div className="text-sm text-[#6B7280]">20% of their earnings forever</div>
            </div>
            <div className="font-bold text-[#FF6B00]">+20%</div>
          </div>

          <div className="mission-card flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E8F5E9] rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-[#00C853]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Level 2 Friends</div>
              <div className="text-sm text-[#6B7280]">5% of their earnings</div>
            </div>
            <div className="font-bold text-[#FF6B00]">+5%</div>
          </div>
        </div>
      </div>

      {/* Recent Referrals */}
      <div>
        <div className="font-semibold mb-3">Recent Referrals</div>
        <div className="space-y-2 text-sm">
          {[
            { name: "@john_doe", earned: 340, time: "2h ago" },
            { name: "@sarah_k", earned: 180, time: "yesterday" },
            { name: "@mike_92", earned: 95, time: "3 days ago" },
          ].map((ref, i) => (
            <div key={i} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div>{ref.name}</div>
              <div className="text-right">
                <div className="font-semibold text-[#FF6B00]">+{ref.earned} ACN</div>
                <div className="text-xs text-[#6B7280]">{ref.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
