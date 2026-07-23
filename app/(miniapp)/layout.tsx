'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTelegram } from '@/lib/telegram';
import { 
  Play, 
  CheckSquare, 
  Users, 
  Trophy, 
  Wallet 
} from 'lucide-react';

const navItems = [
  { href: '/earn', label: 'EARN', icon: Play },
  { href: '/missions', label: 'MISSIONS', icon: CheckSquare },
  { href: '/friends', label: 'FRIENDS', icon: Users },
  { href: '/arena', label: 'ARENA', icon: Trophy },
  { href: '/wallet', label: 'WALLET', icon: Wallet },
];

export default function MiniAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPath = pathname.split('/').pop() || 'earn';
  const { user, isReady, isInTelegram } = useTelegram();

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 max-w-[480px] mx-auto relative">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
        <div className="px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              ET
            </div>
            <div>
              <div className="font-bold text-xl tracking-tight">EarnTap</div>
              <div className="text-[11px] text-[#6B7280] -mt-0.5">Earn money in Telegram</div>
            </div>
          </div>
          
          {/* Real User Info */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-xs text-[#6B7280]">
                {isInTelegram ? 'Telegram User' : 'Demo Mode'}
              </div>
              <div className="font-semibold text-sm">
                @{user?.username || 'username'}
              </div>
            </div>
            <div className="w-9 h-9 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-sm font-bold overflow-hidden ring-2 ring-white flex-shrink-0">
              {user?.photo_url ? (
                <img src={user.photo_url} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                (user?.first_name?.[0] || 'U').toUpperCase()
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        {!isReady ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00]"></div>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t border-[#E5E7EB] z-50">
        <div className="flex items-center justify-around py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href.replace('/', '');
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className="flex flex-col items-center py-2 px-3 flex-1"
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#FF6B00]' : 'text-[#9CA3AF]'}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-[#FF6B00]' : 'text-[#9CA3AF]'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
