// ==================== AD NETWORK CONFIGURATION ====================

export const AD_CONFIG = {
  // AdsGram Configuration
  adsgram: {
    blockId: "5e9484a44cd94d4d8897be5d0c03714d",
    reward: 150,
    enabled: true,
  },

  // Monetag Configuration
  monetag: {
    reward: 95,
    enabled: true,
  },

  // General Settings
  settings: {
    cooldownSeconds: 30,
    maxAdsPerDay: 50,
    minReward: 50,
  }
};

export type AdProvider = 'adsgram' | 'monetag';
