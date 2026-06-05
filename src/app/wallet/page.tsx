"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";

const transactions = [
  { id: 1, type: "purchase" as const, label: "Handwoven Agaseke Basket", boutique: "Inzozi Atelier", amount: -45000, date: "Jun 3, 2026" },
  { id: 2, type: "topup" as const, label: "Mobile Money top-up", boutique: null, amount: 200000, date: "Jun 2, 2026" },
  { id: 3, type: "purchase" as const, label: "Bourbon Coffee × 2", boutique: "Gorilla Coffee House", amount: -36000, date: "Jun 1, 2026" },
  { id: 4, type: "refund" as const, label: "Refund — Ceramic Set", boutique: "Ishimwe Design", amount: 28000, date: "May 30, 2026" },
  { id: 5, type: "purchase" as const, label: "Kitenge Wrap Dress", boutique: "Umuco Fashion", amount: -65000, date: "May 28, 2026" },
  { id: 6, type: "topup" as const, label: "USDC deposit", boutique: null, amount: 500000, date: "May 25, 2026" },
];

const assets = [
  { symbol: "RWF", name: "Rwandan Franc", balance: "582,000", icon: "Fr" },
  { symbol: "USDC", name: "USD Coin", balance: "150.00", icon: "$" },
  { symbol: "BTC", name: "Bitcoin", balance: "0.0012", icon: "₿" },
];

function formatAmount(amount: number) {
  const abs = Math.abs(amount).toLocaleString();
  return amount < 0 ? `− RWF ${abs}` : `+ RWF ${abs}`;
}

type Tab = "overview" | "transactions" | "assets";

export default function WalletPage() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <PageShell title="Wallet" subtitle="Payments & assets">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-8 sm:py-12">

        {/* Balance card */}
        <div className="bg-ink text-white p-6 sm:p-10 mb-8 sm:mb-12 rounded-2xl animate-fade-up">
          <p className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-white/30 mb-2.5">Balance</p>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-none mb-6 tabular-nums" style={{ fontFamily: "var(--font-display)" }}>
            RWF 582,000
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="h-10 sm:h-11 px-5 sm:px-6 rounded-full bg-white text-ink text-[0.64rem] font-semibold tracking-[0.16em] uppercase hover:bg-white/92 transition-colors duration-200">
              Add Funds
            </button>
            <button className="h-10 sm:h-11 px-5 sm:px-6 rounded-full border border-white/16 text-white/80 text-[0.64rem] font-semibold tracking-[0.16em] uppercase hover:border-white/40 hover:text-white transition-all duration-200">
              Send
            </button>
            <button className="h-10 sm:h-11 px-5 sm:px-6 rounded-full border border-white/16 text-white/80 text-[0.64rem] font-semibold tracking-[0.16em] uppercase hover:border-white/40 hover:text-white transition-all duration-200">
              Withdraw
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 sm:mb-10 border-b border-ink/[0.06] animate-fade-up delay-100">
          {(["overview", "transactions", "assets"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 sm:px-5 py-3 text-[0.66rem] sm:text-[0.7rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${
                tab === t ? "text-ink border-b-[1.5px] border-ink -mb-px" : "text-ink/30 hover:text-ink/55"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-fade-up">
            {/* Quick assets */}
            <div>
              <h3 className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-ink/35 mb-5">Your Assets</h3>
              <div className="divide-y divide-ink/[0.05] rounded-2xl overflow-hidden border border-ink/[0.05] bg-white/40">
                {assets.map((asset) => (
                  <div key={asset.symbol} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-ink/[0.06] flex items-center justify-center">
                        <span className="text-sm font-bold text-ink/60">{asset.icon}</span>
                      </div>
                      <div>
                        <p className="text-[0.82rem] font-semibold text-ink">{asset.symbol}</p>
                        <p className="text-[0.62rem] text-ink/40">{asset.name}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-ink">{asset.balance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent transactions */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-ink/35">Recent Activity</h3>
                <button onClick={() => setTab("transactions")} className="text-[0.62rem] font-bold tracking-[0.1em] uppercase text-ink/30 hover:text-ink transition-colors">
                  View All
                </button>
              </div>
              <div className="divide-y divide-ink/[0.05] rounded-2xl overflow-hidden border border-ink/[0.05] bg-white/40">
                {transactions.slice(0, 4).map((tx) => (
                  <TransactionRow key={tx.id} tx={tx} />
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "transactions" && (
          <div className="max-w-[800px] animate-fade-up">
            <div className="divide-y divide-ink/[0.05] rounded-2xl overflow-hidden border border-ink/[0.05] bg-white/40">
              {transactions.map((tx) => (
                <TransactionRow key={tx.id} tx={tx} />
              ))}
            </div>
          </div>
        )}

        {tab === "assets" && (
          <div className="max-w-[800px] animate-fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {assets.map((asset) => (
                <div key={asset.symbol} className="rounded-2xl border border-ink/[0.05] p-6 sm:p-8 bg-white/40">
                  <div className="w-12 h-12 rounded-full bg-ink/[0.06] flex items-center justify-center mb-5">
                    <span className="text-lg font-bold text-ink/60">{asset.icon}</span>
                  </div>
                  <p className="text-[0.68rem] font-bold tracking-[0.12em] uppercase text-ink/40 mb-1">{asset.name}</p>
                  <p className="text-xl sm:text-2xl font-medium text-ink" style={{ fontFamily: "var(--font-display)" }}>
                    {asset.balance}
                  </p>
                  <p className="text-[0.68rem] text-ink/40 mt-1">{asset.symbol}</p>
                  <div className="flex gap-2 mt-5">
                    <button className="flex-1 h-9 rounded-full bg-ink text-white text-[0.6rem] font-semibold tracking-[0.14em] uppercase hover:bg-ink/88 transition-all duration-200">
                      Send
                    </button>
                    <button className="flex-1 h-9 rounded-full border border-ink/10 text-ink text-[0.6rem] font-semibold tracking-[0.14em] uppercase hover:border-ink/30 transition-all duration-200">
                      Receive
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment methods */}
            <div className="mt-10 sm:mt-12">
              <h3 className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-ink/35 mb-5">Payment Methods</h3>
              <div className="divide-y divide-ink/[0.05] rounded-2xl overflow-hidden border border-ink/[0.05] bg-white/40">
                {[
                  { method: "MTN Mobile Money", detail: "078 *** ** 45", connected: true },
                  { method: "Airtel Money", detail: "073 *** ** 12", connected: true },
                  { method: "Visa Card", detail: "•••• 6411", connected: false },
                ].map((pm) => (
                  <div key={pm.method} className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="text-[0.82rem] font-semibold text-ink">{pm.method}</p>
                      <p className="text-[0.62rem] text-ink/40 mt-0.5">{pm.detail}</p>
                    </div>
                    <span className={`text-[0.62rem] font-bold tracking-[0.1em] uppercase ${pm.connected ? "text-green-ink" : "text-ink/30"}`}>
                      {pm.connected ? "Connected" : "Add"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

function TransactionRow({ tx }: { tx: (typeof transactions)[number] }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
          tx.amount > 0 ? "bg-green-ink/10" : "bg-ink/[0.06]"
        }`}>
          {tx.amount > 0 ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-ink"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/35"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[0.78rem] sm:text-[0.82rem] font-semibold text-ink truncate">{tx.label}</p>
          <p className="text-[0.58rem] sm:text-[0.62rem] text-ink/40">{tx.boutique || tx.date}</p>
        </div>
      </div>
      <div className="text-right flex-shrink-0 ml-4">
        <p className={`text-[0.78rem] sm:text-sm font-medium ${tx.amount > 0 ? "text-green-ink" : "text-ink"}`}>
          {formatAmount(tx.amount)}
        </p>
        <p className="text-[0.55rem] text-ink/30 mt-0.5 hidden sm:block">{tx.date}</p>
      </div>
    </div>
  );
}
