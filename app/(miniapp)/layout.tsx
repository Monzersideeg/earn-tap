'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 max-w-[480px] mx-auto relative">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold text-lg">
              ET
            </div>
            <div>
              <div className="font-semibold text-lg tracking-tight">EarnTap</div>
              <div className="text-xs text-[#6B7280] -mt-0.5">Earn money in Telegram</div>
            </div>
          </div>
          
          {/* User Info */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-xs text-[#6B7280]">Welcome back</div>
              <div className="font-semibold text-sm">@username</div>
            </div>
            <div className="w-8 h-8 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-xs font-bold">
              U
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-4">
        {children}
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
                className={`nav-item flex-1 ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
