'use client';

import { useEffect, useState } from 'react';

export interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
}

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isInTelegram, setIsInTelegram] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const detectAndSetUser = () => {
      const tg = (window as any).Telegram?.WebApp;

      // Aggressive detection for Telegram environment
      const isTelegramEnv = !!tg || 
                           window.navigator.userAgent.includes('Telegram') ||
                           document.referrer.includes('t.me') ||
                           window.location.href.includes('t.me');

      if (isTelegramEnv) {
        setIsInTelegram(true);

        // Try to get real user data from Telegram
        if (tg && tg.initDataUnsafe?.user) {
          const realUser = tg.initDataUnsafe.user;
          setUser({
            id: realUser.id,
            first_name: realUser.first_name,
            username: realUser.username || `user${realUser.id}`,
            photo_url: realUser.photo_url,
          });
        } else {
          // We're in Telegram but SDK didn't provide user data
          // Generate realistic Telegram username
          const randomId = Math.floor(Math.random() * 100000) + 700000;
          setUser({
            id: randomId,
            first_name: "Telegram User",
            username: `tg_user_${randomId.toString().slice(-5)}`,
          });
        }
      } else {
        // Not in Telegram
        setIsInTelegram(false);
        setUser({
          id: 987654321,
          first_name: "Demo User",
          username: "demo_user",
        });
      }

      setIsReady(true);
    };

    detectAndSetUser();

    // Multiple detection attempts
    setTimeout(detectAndSetUser, 500);
    setTimeout(detectAndSetUser, 1200);
    setTimeout(detectAndSetUser, 2000);
  }, []);

  return { user, isReady, isInTelegram };
}
