'use client';

import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { adService, AdResult } from '@/lib/ads';
import { toast } from 'sonner';

interface AdPlayerProps {
  onComplete?: (result: AdResult) => void;
  onClose?: () => void;
}

export default function AdPlayer({ onComplete, onClose }: AdPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const playAd = async (type: 'adsgram' | 'monetag') => {
    setIsPlaying(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 92) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 6;
      });
    }, 280);

    try {
      const result = await adService.watchAd(type);
      
      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setIsPlaying(false);
        setProgress(0);
        
        if (result.success) {
          toast.success(`+${result.reward} ACN earned!`, {
            description: `Thank you for watching • ${result.provider}`,
          });
          onComplete?.(result);
        } else {
          toast.error("Ad failed to play");
        }
      }, 600);

    } catch (error) {
      clearInterval(progressInterval);
      setIsPlaying(false);
      toast.error("Failed to load ad");
    }
  };

  if (isPlaying) {
    return (
      <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center">
        <div className="w-full max-w-md px-6 text-center text-white">
          <div className="mb-8">
            <div className="text-6xl mb-4">📺</div>
            <div className="text-2xl font-semibold">Watching Ad</div>
            <div className="text-white/70 mt-1">Please watch until the end</div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/20 h-2 rounded-full mb-4 overflow-hidden">
            <div 
              className="h-full bg-[#FF6B00] transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-white/70">{progress}% complete</div>

          <button 
            onClick={() => {
              setIsPlaying(false);
              setProgress(0);
              onClose?.();
            }}
            className="mt-8 text-white/60 hover:text-white flex items-center gap-2 mx-auto"
          >
            <X className="w-4 h-4" /> Skip (No reward)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
      <div className="text-center mb-6">
        <div className="text-5xl mb-4">🎥</div>
        <div className="font-semibold text-xl">Watch Rewarded Ads</div>
        <div className="text-[#6B7280] text-sm mt-1">Choose an ad network</div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => playAd('adsgram')}
          className="w-full btn-primary py-4 flex items-center justify-center gap-3 text-lg"
        >
          <Play className="w-6 h-6" /> Watch AdsGram Ad <span className="text-sm opacity-75">(+150 ACN)</span>
        </button>

        <div className="text-[10px] text-center text-[#6B7280] -mt-1">
          Powered by AdsGram
        </div>

        <button 
          onClick={() => playAd('monetag')}
          className="w-full btn-secondary py-4 flex items-center justify-center gap-3 text-lg"
        >
          <Play className="w-6 h-6" /> Watch Monetag Ad <span className="text-sm opacity-75">(+95 ACN)</span>
        </button>
      </div>

      <div className="text-center text-xs text-[#6B7280] mt-6">
        Ads are verified • Rewards are instant
      </div>
    </div>
  );
}
