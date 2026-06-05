"use client";

import { useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const cartItems = [
  { id: 1, name: "Handwoven Agaseke Basket", boutique: "Inzozi Atelier", price: 45000, quantity: 1, color: "#d4c5b2" },
  { id: 2, name: "Single-Origin Bourbon Coffee", boutique: "Gorilla Coffee House", price: 18000, quantity: 2, color: "#8b7355" },
  { id: 3, name: "Kitenge Wrap Dress", boutique: "Umuco Fashion", price: 65000, quantity: 1, color: "#8b6f5e" },
];

function formatPrice(amount: number) {
  return `RWF ${amount.toLocaleString()}`;
}

export default function CartPage() {
  const [items, setItems] = useState(cartItems);
  const [step, setStep] = useState<"cart" | "shipping" | "confirm">("cart");

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 3000;
  const total = subtotal + delivery;

  return (
    <PageShell title="Checkout" subtitle={`${items.length} items`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-8 sm:py-12">

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-10 sm:mb-14">
          {["Cart", "Shipping", "Confirm"].map((label, i) => {
            const stepIndex = ["cart", "shipping", "confirm"].indexOf(step);
            return (
              <div key={label} className="flex items-center gap-2">
                {i > 0 && <div className={`w-8 sm:w-12 h-px ${i <= stepIndex ? "bg-ink" : "bg-ink/10"}`} />}
                <span className={`text-[0.62rem] sm:text-[0.68rem] font-bold tracking-[0.14em] uppercase ${i <= stepIndex ? "text-ink" : "text-ink/30"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {step === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 animate-fade-up">
            {/* Items */}
            <div>
              {items.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-ink/40 text-sm mb-6">Your cart is empty</p>
                  <Link href="/" className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink border border-ink px-6 py-3.5 hover:bg-ink hover:text-white transition-all">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-ink/[0.06]">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 sm:gap-6 py-6 first:pt-0">
                      <div className="w-20 h-24 sm:w-24 sm:h-32 flex-shrink-0" style={{ backgroundColor: item.color }}>
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white/15 text-[0.45rem] tracking-[0.2em] uppercase font-bold">{item.boutique}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <h3 className="text-[0.82rem] sm:text-sm font-semibold text-ink">{item.name}</h3>
                          <p className="text-[0.68rem] text-ink/40 tracking-wide mt-1">{item.boutique}</p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-ink/10">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-ink/50 hover:text-ink transition-colors text-sm">−</button>
                            <span className="w-8 h-8 flex items-center justify-center text-[0.75rem] font-semibold text-ink border-x border-ink/10">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-ink/50 hover:text-ink transition-colors text-sm">+</button>
                          </div>
                          <span className="text-sm font-medium text-ink">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="lg:sticky lg:top-24 self-start">
                <div className="bg-white/60 border border-ink/[0.06] p-6 sm:p-8">
                  <h2 className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink/60 mb-6">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-ink/60">Subtotal</span>
                      <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-ink/60">Delivery</span>
                      <span className="font-medium text-ink">{formatPrice(delivery)}</span>
                    </div>
                  </div>
                  <div className="border-t border-ink/[0.08] pt-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-ink">Total</span>
                      <span className="text-base font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep("shipping")}
                    className="w-full h-12 sm:h-14 bg-ink text-white text-[0.72rem] font-bold tracking-[0.14em] uppercase hover:bg-ink/90 transition-colors"
                  >
                    Continue to Shipping
                  </button>
                  <Link href="/" className="block text-center mt-4 text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-ink/40 hover:text-ink transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {step === "shipping" && (
          <div className="max-w-[560px] animate-fade-up">
            <h2 className="text-xl sm:text-2xl font-medium text-ink mb-8" style={{ fontFamily: "var(--font-display)" }}>Shipping Details</h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField label="First Name" placeholder="Joseph" />
                <InputField label="Last Name" placeholder="Igiraneza" />
              </div>
              <InputField label="Phone" placeholder="+250 7XX XXX XXX" />
              <InputField label="Address" placeholder="KG 123 Street" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField label="City" placeholder="Kigali" />
                <InputField label="District" placeholder="Gasabo" />
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button onClick={() => setStep("confirm")} className="flex-1 h-12 sm:h-14 bg-ink text-white text-[0.72rem] font-bold tracking-[0.14em] uppercase hover:bg-ink/90 transition-colors">
                  Review Order
                </button>
                <button onClick={() => setStep("cart")} className="h-12 sm:h-14 px-6 border border-ink/15 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink/60 hover:text-ink hover:border-ink/40 transition-colors">
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="max-w-[560px] animate-fade-up">
            <h2 className="text-xl sm:text-2xl font-medium text-ink mb-8" style={{ fontFamily: "var(--font-display)" }}>Confirm Order</h2>

            <div className="space-y-6">
              {/* Items summary */}
              <div className="border border-ink/[0.06] divide-y divide-ink/[0.06]">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 flex-shrink-0 rounded-sm" style={{ backgroundColor: item.color }} />
                      <div className="min-w-0">
                        <p className="text-[0.78rem] font-semibold text-ink truncate">{item.name}</p>
                        <p className="text-[0.62rem] text-ink/40">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-[0.78rem] font-medium text-ink flex-shrink-0 ml-4">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-4 border-t border-ink/[0.08]">
                <span className="text-sm font-semibold text-ink">Total</span>
                <span className="text-lg font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>{formatPrice(total)}</span>
              </div>

              {/* Payment method */}
              <div>
                <p className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-ink/60 mb-4">Payment Method</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Mobile Money", "Card", "Wallet", "Lightning"].map((method) => (
                    <button key={method} className="h-12 border border-ink/10 text-[0.72rem] font-semibold text-ink/70 hover:border-ink/40 hover:text-ink transition-all">
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 h-12 sm:h-14 bg-ink text-white text-[0.72rem] font-bold tracking-[0.14em] uppercase hover:bg-ink/90 transition-colors">
                  Place Order
                </button>
                <button onClick={() => setStep("shipping")} className="h-12 sm:h-14 px-6 border border-ink/15 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink/60 hover:text-ink hover:border-ink/40 transition-colors">
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

function InputField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-[0.68rem] font-bold tracking-[0.12em] uppercase text-ink/50 mb-2">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-12 bg-white/60 border border-ink/10 px-4 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/40 transition-colors"
      />
    </div>
  );
}
