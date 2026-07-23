import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FF6B00] rounded-xl flex items-center justify-center text-white font-bold">ET</div>
            <div className="font-semibold text-xl tracking-tight">EarnTap</div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/earn" className="px-5 py-2.5 text-sm font-medium hover:bg-[#F8F9FA] rounded-xl transition-colors">
              Open Mini App
            </Link>
            <Link 
              href="/earn" 
              className="btn-primary px-6 py-2.5 text-sm"
            >
              Launch in Telegram
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border rounded-full text-sm mb-6">
          <div className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse" />
          18,492 users earning today
        </div>

        <h1 className="text-7xl font-bold tracking-tighter leading-none">
          Earn real money.<br />In Telegram.
        </h1>
        <p className="mt-6 text-2xl text-[#6B7280] max-w-md mx-auto">
          Complete simple tasks and get paid instantly.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/earn" className="btn-primary px-9 py-4 text-lg">Open Mini App →</Link>
          <a href="https://t.me/earntap_bot" target="_blank" className="btn-secondary px-9 py-4 text-lg">Add to Telegram</a>
        </div>

        <div className="mt-8 text-sm text-[#6B7280]">No KYC • Withdraw to TON, USDT, PayPal • Minimum $3</div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 pb-20">
        {[
          { icon: "📺", title: "Watch Ads", desc: "Earn from premium ad placements" },
          { icon: "📢", title: "Join Channels", desc: "Verified Telegram channel tasks" },
          { icon: "👥", title: "Refer Friends", desc: "Earn 20% from your referrals" },
        ].map((f, i) => (
          <div key={i} className="bg-white border border-[#E5E7EB] rounded-3xl p-8 text-center">
            <div className="text-5xl mb-4">{f.icon}</div>
            <div className="font-semibold text-xl">{f.title}</div>
            <div className="text-[#6B7280] mt-2">{f.desc}</div>
          </div>
        ))}
      </div>

      <div className="text-center pb-16 text-xs text-[#6B7280]">
        Built for Telegram • Powered by real earnings
      </div>
    </div>
  );
}
