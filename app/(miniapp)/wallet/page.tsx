'use client';

import React, { useState } from 'react';
import { Wallet, ArrowUpRight, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function WalletPage() {
  const [balance] = useState(1240);
  const [pending] = useState(185);
  const [totalEarned] = useState(8740);

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState<'ton' | 'usdt' | 'paypal'>('ton');

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (!amount || amount < 3) {
      toast.error("Minimum withdrawal is $3");
      return;
    }
    
    if (amount > balance / 1000) {
      toast.error("Insufficient balance");
      return;
    }

    toast.success("Withdrawal request submitted!", {
      description: `$${amount} via ${withdrawMethod.toUpperCase()} • Processing in 24h`,
    });
    
    setWithdrawAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="balance-card">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm opacity-90">AVAILABLE BALANCE</div>
            <div className="text-5xl font-bold tracking-tighter mt-1">{balance}</div>
            <div className="text-sm opacity-75">ACN ≈ ${(balance / 1000).toFixed(2)}</div>
          </div>
          <Wallet className="w-9 h-9 opacity-75" />
        </div>

        <div className="mt-6 pt-6 border-t border-white/20 flex justify-between text-sm">
          <div>
            <div className="opacity-75">Pending</div>
            <div className="font-semibold">+{pending} ACN</div>
          </div>
          <div className="text-right">
            <div className="opacity-75">Total Earned</div>
            <div className="font-semibold">${(totalEarned / 1000).toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Withdraw Section */}
      <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB]">
        <div className="font-semibold mb-4">Withdraw Funds</div>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[#6B7280]">Amount (ACN)</label>
            <input 
              type="number" 
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="300" 
              className="w-full mt-1 px-4 py-3 border border-[#E5E7EB] rounded-xl text-lg focus:outline-none focus:border-[#FF6B00]" 
            />
            <div className="text-xs text-[#6B7280] mt-1">Minimum: 300 ACN ($3)</div>
          </div>

          <div>
            <label className="text-xs text-[#6B7280]">Withdrawal Method</label>
            <div className="flex gap-2 mt-2">
              {(['ton', 'usdt', 'paypal'] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => setWithdrawMethod(method)}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${withdrawMethod === method 
                    ? 'bg-[#FF6B00] text-white' 
                    : 'bg-[#F8F9FA] border border-[#E5E7EB]'}`}
                >
                  {method.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleWithdraw}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
          >
            <ArrowUpRight className="w-4 h-4" /> Request Withdrawal
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="font-semibold mb-3 flex items-center justify-between">
          Recent Transactions
          <span className="text-xs text-[#6B7280]">View all</span>
        </div>
        
        <div className="space-y-2 text-sm">
          {[
            { type: "Ad Reward", amount: "+85", date: "2h ago", status: "completed" },
            { type: "Channel Join", amount: "+100", date: "yesterday", status: "completed" },
            { type: "Withdrawal", amount: "-500", date: "3d ago", status: "completed" },
          ].map((tx, i) => (
            <div key={i} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div>
                <div>{tx.type}</div>
                <div className="text-xs text-[#6B7280]">{tx.date}</div>
              </div>
              <div className={`font-semibold ${tx.amount.startsWith('+') ? 'text-[#00C853]' : 'text-[#FF6B00]'}`}>
                {tx.amount} ACN
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
