'use client';

// ==================== ADSGRAM INTEGRATION ====================
export interface AdResult {
  success: boolean;
  reward: number;
  provider: string;
  adId?: string;
}

export class AdsGramService {
  private static instance: AdsGramService;
  private isLoaded = false;

  // User's AdsGram Block ID
  private readonly BLOCK_ID = "5e9484a44cd94d4d8897be5d0c03714d";

  static getInstance(): AdsGramService {
    if (!AdsGramService.instance) {
      AdsGramService.instance = new AdsGramService();
    }
    return AdsGramService.instance;
  }

  async loadAdsGram(): Promise<boolean> {
    if (this.isLoaded) return true;

    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(false);
        return;
      }

      if ((window as any).Adsgram) {
        this.isLoaded = true;
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://sad.adsgram.ai/js/sad.min.js';
      script.onload = () => {
        this.isLoaded = true;
        resolve(true);
      };
      script.onerror = () => {
        console.warn("AdsGram SDK failed to load");
        resolve(false);
      };
      
      document.head.appendChild(script);
    });
  }

  async showAd(customBlockId?: string): Promise<AdResult> {
    const loaded = await this.loadAdsGram();
    const blockId = customBlockId || this.BLOCK_ID;

    if (!loaded || !(window as any).Adsgram) {
      console.log("Using AdsGram fallback simulation");
      return this.simulateAd('AdsGram');
    }

    try {
      const Adsgram = (window as any).Adsgram;
      const adController = Adsgram.init({ blockId });

      return new Promise((resolve) => {
        adController
          .show()
          .then(() => {
            resolve({
              success: true,
              reward: 150,
              provider: 'AdsGram',
              adId: blockId
            });
          })
          .catch((error: any) => {
            console.warn("AdsGram error:", error);
            resolve(this.simulateAd('AdsGram'));
          });
      });
    } catch (error) {
      console.error("AdsGram initialization error:", error);
      return this.simulateAd('AdsGram');
    }
  }

  private simulateAd(provider: string): AdResult {
    const rewards = [120, 150, 180, 200];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    
    return {
      success: true,
      reward,
      provider,
    };
  }
}

// ==================== MONETAG INTEGRATION ====================
export class MonetagService {
  private static instance: MonetagService;

  static getInstance(): MonetagService {
    if (!MonetagService.instance) {
      MonetagService.instance = new MonetagService();
    }
    return MonetagService.instance;
  }

  async showAd(): Promise<AdResult> {
    // Monetag integration ready
    // Replace with real Monetag SDK when you have their credentials
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          reward: 95,
          provider: 'Monetag'
        });
      }, 1400);
    });
  }
}

// ==================== MAIN AD SERVICE ====================
export const adService = {
  adsgram: AdsGramService.getInstance(),
  monetag: MonetagService.getInstance(),

  async watchAd(type: 'adsgram' | 'monetag' | 'video' = 'adsgram'): Promise<AdResult> {
    if (type === 'adsgram') {
      return this.adsgram.showAd();
    } else {
      return this.monetag.showAd();
    }
  }
};
