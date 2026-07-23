'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            username?: string;
            photo_url?: string;
          };
          start_param?: string;
        };
        onEvent: (event: string, callback: () => void) => void;
        MainButton: {
          show: () => void;
          hide: () => void;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
        };
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
      };
    };
  }
}

export interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
}

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready();
      tg.expand();

      const userData = tg.initDataUnsafe.user;
      if (userData) {
        setUser({
          id: userData.id,
          first_name: userData.first_name,
          username: userData.username,
          photo_url: userData.photo_url,
        });
      }

      setIsReady(true);
    } else {
      // Fallback for development / testing outside Telegram
      setUser({
        id: 123456789,
        first_name: "Demo",
        username: "demo_user",
        photo_url: undefined,
      });
      setIsReady(true);
    }
  }, []);

  return { user, isReady, tg: window.Telegram?.WebApp };
}
