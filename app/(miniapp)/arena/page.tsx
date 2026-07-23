'use client';

import React from 'react';
import { Trophy, Zap, Target } from 'lucide-react';

export default function ArenaPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-semibold text-2xl">Arena</div>
        <div className="text-[#6B7280]">Compete and win big rewards</div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold">Weekly Leaderboard</div>
          <div className="text-xs px-3 py-1 bg-[#FFF3E0] text-[#FF6B00] rounded-full">Ends in 4d</div>
        </div>

        <div className="space-y-3">
          {[
            { rank: 1, name: "@crypto_king", points: 12480, reward: "1200 ACN" },
            { rank: 2, name: "@earnmaster", points: 9870, reward: "800 ACN" },
            { rank: 3, name: "@you", points: 6420, reward: "500 ACN" },
          ].map((player, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${player.rank === 3 ? 'bg-[#FF6B00] text-white' : 'bg-white border'}`}>
                  {player.rank}
                </div>
                <div>{player.name}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{player.points}</div>
                <div className="text-xs text-[#00C853]">{player.reward}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Games */}
      <div>
        <div className="font-semibold mb-3">Mini Games</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="mission-card text-center p-5">
            <div className="text-4xl mb-3">🎰</div>
            <div className="font-semibold">Lucky Spin</div>
            <div className="text-xs text-[#6B7280] mt-1">1 free spin daily</div>
            <button className="mt-4 btn-primary w-full text-sm py-2">Spin Now</button>
          </div>
          
          <div className="mission-card text-center p-5">
            <div className="text-4xl mb-3">🎯</div>
            <div className="font-semibold">Tap Challenge</div>
            <div className="text-xs text-[#6B7280] mt-1">Beat your high score</div>
            <button className="mt-4 btn-secondary w-full text-sm py-2">Play</button>
          </div>
        </div>
      </div>

      {/* Daily Spin Preview */}
      <div className="bg-gradient-to-br from-[#FF6B00] to-[#E55A00] text-white rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div>
            <div className="font-semibold">Daily Lucky Spin</div>
            <div className="text-sm opacity-90 mt-1">You have 1 free spin left today</div>
          </div>
          <button className="ml-auto bg-white text-[#FF6B00] px-6 py-2 rounded-xl font-semibold text-sm">Spin</button>
        </div>
      </div>
    </div>
  );
}
