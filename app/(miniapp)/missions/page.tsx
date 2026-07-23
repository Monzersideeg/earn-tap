'use client';

import React, { useState } from 'react';
import { Flame, Calendar, Gift, Target } from 'lucide-react';
import { toast } from 'sonner';

interface DailyTask {
  id: number;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  type: string;
}

export default function MissionsPage() {
  const [streak] = useState(14);
  const [xp] = useState(1240);

  const dailyTasks: DailyTask[] = [
    {
      id: 1,
      title: "Watch 10 ads",
      description: "Complete daily ad watching goal",
      reward: 200,
      progress: 6,
      total: 10,
      type: "ad",
    },
    {
      id: 2,
      title: "Join 2 channels",
      description: "Join verified Telegram channels",
      reward: 120,
      progress: 1,
      total: 2,
      type: "channel",
    },
    {
      id: 3,
      title: "Invite 1 friend",
      description: "Share your referral link",
      reward: 300,
      progress: 0,
      total: 1,
      type: "referral",
    },
  ];

  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const handleComplete = (taskId: number, reward: number) => {
    if (completedTasks.includes(taskId)) return;

    setCompletedTasks([...completedTasks, taskId]);
    toast.success(`+${reward} ACN earned!`, {
      description: "Daily mission completed",
    });
  };

  return (
    <div className="space-y-6">
      {/* Streak & XP Header */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-[#FF6B00] to-[#E55A00] text-white rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs opacity-90">CURRENT STREAK</div>
              <div className="text-3xl font-bold">{streak} days</div>
            </div>
          </div>
          <div className="mt-3 text-xs opacity-75">Keep it up! Bonus at 30 days</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E8F5E9] rounded-2xl flex items-center justify-center">
              <Gift className="w-5 h-5 text-[#00C853]" />
            </div>
            <div>
              <div className="text-xs text-[#6B7280]">TOTAL XP</div>
              <div className="text-3xl font-bold text-[#FF6B00]">{xp}</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-[#6B7280]">Level 12 • 340 XP to next level</div>
        </div>
      </div>

      {/* Daily Missions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-semibold text-xl">Daily Missions</div>
            <div className="text-sm text-[#6B7280]">Complete these to earn bonus rewards</div>
          </div>
          <div className="bg-[#FFF3E0] text-[#FF6B00] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Resets in 14h
          </div>
        </div>

        <div className="space-y-3">
          {dailyTasks.map((task) => {
            const isCompleted = completedTasks.includes(task.id);
            const progressPercent = (task.progress / task.total) * 100;

            return (
              <div key={task.id} className="mission-card">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#FFF3E0] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-[#FF6B00]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{task.title}</div>
                        <div className="text-sm text-[#6B7280] mt-0.5">{task.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#FF6B00]">+{task.reward} ACN</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                        <div className="flex-1 progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${progressPercent}%` }} 
                          />
                        </div>
                        <div>{task.progress}/{task.total}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      {isCompleted ? (
                        <div className="status-claimed">✓ Completed</div>
                      ) : (
                        <button 
                          onClick={() => handleComplete(task.id, task.reward)}
                          className="btn-primary px-6 py-2 text-sm"
                        >
                          Complete Mission
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bonus Section */}
      <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB]">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🎁</div>
          <div className="flex-1">
            <div className="font-semibold">Weekly Bonus</div>
            <div className="text-sm text-[#6B7280]">Complete 25 missions this week</div>
            <div className="text-xs text-[#FF6B00] mt-1">12/25 completed • +800 ACN reward</div>
          </div>
          <button className="btn-secondary px-5 py-2 text-sm">View</button>
        </div>
      </div>
    </div>
  );
}
