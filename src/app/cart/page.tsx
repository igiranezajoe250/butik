"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";

interface CartItem {
  id: number;
  name: string;
  boutique: string;
  price: number;
  quantity: number;
  color: string;
}

const initialItems: CartItem[] = [
  { id: 1, name: "Handwoven Agaseke Basket", boutique: "Inzozi Atelier", price: 45000, quantity: 1, color: "#c8b9a6" },
  { id: 2, name: "Single-Origin Bourbon Coffee", boutique: "Gorilla Coffee House", price: 18000, quantity: 2, color: "#7a6850" },
  { id: 3, name: "Kitenge Wrap Dress", boutique: "Umuco Fashion", price: 65000, quantity: 1, color: "#8a7060" },
];

function formatPrice(amount: number) {
  return `RWF ${amount.toLocaleString()}`;
}

type Step = "cart" | "shipping" | "confirm" | "success";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [step, setStep] = useState<Step>("cart");
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shipping, setShipping] = useState({ firstName: "", lastName: "", phone: "", address: "", city: "", district: "" });

  const goToStep = useCallback((next: Step) => {
    setIsTransitioning(true);
    setTimeout(() => { setStep(next); setIsTransitioning(false); window.scrollTo({ top: 0, behavior: "smooth" }); }, 300);
  }, []);

  const updateQuantity = (id: number, delta: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (item.quantity + delta <= 0) {
      setRemovingId(id);
      setTimeout(() => { setItems((prev) => prev.filter((i) => i.id !== id)); setRemovingId(null); }, 400);
      return;
    }
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + delta } : i));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = items.length > 0 ? 3000 : 0;
  const total = subtotal + delivery;
  const stepIndex = ["cart", "shipping", "confirm", "success"].indexOf(step);
  const canShip = shipping.firstName && shipping.phone && shipping.address && shipping.city;

  return (
    <PageShell title={step === "success" ? "Complete" : "Cart"} subtitle={step === "success" ? "Order confirmed" : `${items.length} items`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-8 sm:py-12">

        {/* Step indicator — dots like the search mode picker */}
        {step !== "success" && (
          <div className="flex items-center gap-3 mb-10 sm:mb-14 animate-fade-up">
            {["Cart", "Shipping", "Confirm"].map((label, i) => (
              <button
                key={label}
                onClick={() => i < stepIndex ? goToStep(["cart", "shipping", "confirm"][i] as Step) : undefined}
                className={`flex items-center gap-2 transition-all duration-300 ${i < stepIndex ? "cursor-pointer" : ""}`}
              >
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i === stepIndex ? "bg-ink scale-125" : i < stepIndex ? "bg-green-ink/50" : "bg-ink/12"
                }`} />
                <span className={`text-[0.62rem] font-semibold tracking-[0.16em] uppercase transition-colors duration-500 ${
                  i === stepIndex ? "text-ink" : i < stepIndex ? "text-ink/40 hover:text-green-ink" : "text-ink/20"
                }`}>{label}</span>
              </button>
            ))}
          </div>
        )}

        <div className={`transition-all duration-300 ${isTransitioning ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}>

          {/* ─── Cart ─── */}
          {step === "cart" && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
              <div>
                {items.length === 0 ? (
                  <div className="py-20 text-center animate-fade-up">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-ink/[0.04] flex items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/20"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                    </div>
                    <p className="text-ink/35 text-[0.88rem] mb-6">Your cart is empty</p>
                    <Link href="/" className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase text-ink border border-ink/80 px-6 py-3.5 rounded-full hover:bg-ink hover:text-white transition-all duration-200">
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, i) => (
                      <div
                        key={item.id}
                        className="flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white/50 border border-ink/[0.04] transition-all duration-400 animate-fade-up"
                        style={{
                          opacity: removingId === item.id ? 0 : 1,
                          transform: removingId === item.id ? "translateX(-20px) scale(0.98)" : "translateX(0) scale(1)",
                          animationDelay: `${i * 80}ms`,
                        }}
                      >
                        <div className="w-20 h-24 sm:w-22 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden" style={{ backgroundColor: item.color }}>
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white/15 text-[0.42rem] tracking-[0.2em] uppercase font-bold">{item.boutique}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <h3 className="text-[0.82rem] sm:text-[0.88rem] font-medium text-ink">{item.name}</h3>
                            <p className="text-[0.64rem] text-ink/35 tracking-[0.02em] mt-1">{item.boutique}</p>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center rounded-full border border-ink/8 overflow-hidden">
                              <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-ink/40 hover:text-ink hover:bg-ink/[0.04] transition-all duration-200 text-sm">−</button>
                              <span className="w-7 h-8 flex items-center justify-center text-[0.75rem] font-semibold text-ink tabular-nums">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-ink/40 hover:text-ink hover:bg-ink/[0.04] transition-all duration-200 text-sm">+</button>
                            </div>
                            <span className="text-[0.88rem] font-medium text-ink tabular-nums">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="lg:sticky lg:top-24 self-start animate-fade-up delay-200">
                  <div className="rounded-2xl p-6 sm:p-7" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", border: "1px solid rgba(17,17,16,0.05)", boxShadow: "0 8px 32px rgba(0,0,0,0.04)" }}>
                    <h2 className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-ink/30 mb-5">Summary</h2>
                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between text-[0.82rem]">
                        <span className="text-ink/45">Subtotal</span>
                        <span className="font-medium text-ink tabular-nums">{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-[0.82rem]">
                        <span className="text-ink/45">Delivery</span>
                        <span className="font-medium text-ink tabular-nums">{formatPrice(delivery)}</span>
                      </div>
                    </div>
                    <div className="border-t border-ink/[0.06] pt-4 mb-6">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[0.82rem] font-semibold text-ink">Total</span>
                        <span className="text-lg font-normal text-ink tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{formatPrice(total)}</span>
                      </div>
                    </div>
                    <button onClick={() => goToStep("shipping")} className="w-full h-12 bg-ink text-white text-[0.66rem] font-semibold tracking-[0.16em] uppercase rounded-full hover:bg-ink/88 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_16px_rgba(17,17,16,0.12)]">
                      Continue
                    </button>
                    <Link href="/" className="block text-center mt-4 text-[0.6rem] font-semibold tracking-[0.14em] uppercase text-ink/25 hover:text-ink/50 transition-colors duration-200">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── Shipping ─── */}
          {step === "shipping" && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
              <div>
                <h2 className="text-xl sm:text-2xl font-normal text-ink mb-8" style={{ fontFamily: "var(--font-display)" }}>Shipping</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="First Name" placeholder="Joseph" value={shipping.firstName} onChange={(v) => setShipping({ ...shipping, firstName: v })} delay={0} />
                    <InputField label="Last Name" placeholder="Igiraneza" value={shipping.lastName} onChange={(v) => setShipping({ ...shipping, lastName: v })} delay={50} />
                  </div>
                  <InputField label="Phone" placeholder="+250 7XX XXX XXX" value={shipping.phone} onChange={(v) => setShipping({ ...shipping, phone: v })} delay={100} />
                  <InputField label="Address" placeholder="KG 123 Street" value={shipping.address} onChange={(v) => setShipping({ ...shipping, address: v })} delay={150} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="City" placeholder="Kigali" value={shipping.city} onChange={(v) => setShipping({ ...shipping, city: v })} delay={200} />
                    <InputField label="District" placeholder="Gasabo" value={shipping.district} onChange={(v) => setShipping({ ...shipping, district: v })} delay={250} />
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-24 self-start">
                <div className="rounded-2xl p-6 sm:p-7" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", border: "1px solid rgba(17,17,16,0.05)", boxShadow: "0 8px 32px rgba(0,0,0,0.04)" }}>
                  <h2 className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-ink/30 mb-4">Order</h2>
                  <div className="space-y-2.5 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-[0.78rem]">
                        <span className="text-ink/50 truncate mr-3">{item.name} × {item.quantity}</span>
                        <span className="font-medium text-ink tabular-nums flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-ink/[0.06] pt-3 mb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[0.82rem] font-semibold text-ink">Total</span>
                      <span className="text-lg font-normal text-ink tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <button onClick={() => canShip ? goToStep("confirm") : undefined} className={`w-full h-12 text-[0.66rem] font-semibold tracking-[0.16em] uppercase rounded-full transition-all duration-200 ${canShip ? "bg-ink text-white hover:bg-ink/88 active:scale-[0.98] shadow-[0_4px_16px_rgba(17,17,16,0.12)]" : "bg-ink/12 text-ink/30 cursor-not-allowed"}`}>
                    Review Order
                  </button>
                  <button onClick={() => goToStep("cart")} className="block w-full text-center mt-4 text-[0.6rem] font-semibold tracking-[0.14em] uppercase text-ink/25 hover:text-ink/50 transition-colors duration-200">
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Confirm ─── */}
          {step === "confirm" && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
              <div>
                <h2 className="text-xl sm:text-2xl font-normal text-ink mb-8" style={{ fontFamily: "var(--font-display)" }}>Confirm</h2>

                <div className="space-y-6">
                  {/* Shipping summary */}
                  <div className="animate-fade-up">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-ink/28">Shipping to</p>
                      <button onClick={() => goToStep("shipping")} className="text-[0.58rem] font-semibold tracking-[0.12em] uppercase text-ink/25 hover:text-ink/50 transition-colors duration-200">Edit</button>
                    </div>
                    <div className="rounded-xl border border-ink/[0.05] px-5 py-4 bg-white/40">
                      <p className="text-[0.84rem] font-medium text-ink">{shipping.firstName} {shipping.lastName}</p>
                      <p className="text-[0.74rem] text-ink/40 mt-1">{shipping.address}, {shipping.city}</p>
                      <p className="text-[0.74rem] text-ink/40">{shipping.phone}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="animate-fade-up delay-100">
                    <p className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-ink/28 mb-3">Items</p>
                    <div className="rounded-xl border border-ink/[0.05] overflow-hidden divide-y divide-ink/[0.04]">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between px-5 py-3.5">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-lg flex-shrink-0" style={{ backgroundColor: item.color }} />
                            <div className="min-w-0">
                              <p className="text-[0.78rem] font-medium text-ink truncate">{item.name}</p>
                              <p className="text-[0.6rem] text-ink/30">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="text-[0.78rem] font-medium text-ink/70 flex-shrink-0 ml-4 tabular-nums">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="animate-fade-up delay-200">
                    <p className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-ink/28 mb-3">Payment</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {["Mobile Money", "Card", "Wallet", "Lightning"].map((method) => (
                        <button
                          key={method}
                          onClick={() => setSelectedPayment(method)}
                          className={`h-11 text-[0.7rem] font-medium rounded-xl transition-all duration-200 ${
                            selectedPayment === method
                              ? "bg-ink text-white shadow-[0_4px_16px_rgba(17,17,16,0.12)]"
                              : "border border-ink/8 text-ink/45 hover:border-ink/20 hover:text-ink/70"
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-24 self-start">
                <div className="rounded-2xl p-6 sm:p-7" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", border: "1px solid rgba(17,17,16,0.05)", boxShadow: "0 8px 32px rgba(0,0,0,0.04)" }}>
                  <div className="space-y-2.5 pb-4 mb-4 border-b border-ink/[0.05]">
                    <div className="flex justify-between text-[0.82rem]">
                      <span className="text-ink/45">Subtotal</span>
                      <span className="font-medium text-ink tabular-nums">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[0.82rem]">
                      <span className="text-ink/45">Delivery</span>
                      <span className="font-medium text-ink tabular-nums">{formatPrice(delivery)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-[0.82rem] font-semibold text-ink">Total</span>
                    <span className="text-lg font-normal text-ink tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{formatPrice(total)}</span>
                  </div>
                  <button
                    onClick={() => selectedPayment ? goToStep("success") : undefined}
                    className={`w-full h-12 text-[0.66rem] font-semibold tracking-[0.16em] uppercase rounded-full transition-all duration-200 ${
                      selectedPayment ? "bg-ink text-white hover:bg-ink/88 active:scale-[0.98] shadow-[0_4px_16px_rgba(17,17,16,0.12)]" : "bg-ink/12 text-ink/30 cursor-not-allowed"
                    }`}
                  >
                    Place Order
                  </button>
                  <button onClick={() => goToStep("shipping")} className="block w-full text-center mt-4 text-[0.6rem] font-semibold tracking-[0.14em] uppercase text-ink/25 hover:text-ink/50 transition-colors duration-200">
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Success + Wallet ─── */}
          {step === "success" && (
            <div className="max-w-[520px] mx-auto py-12 sm:py-20">
              <div className="text-center mb-10 sm:mb-14">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-green-ink/10 flex items-center justify-center animate-fade-up">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-ink"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-normal text-ink mb-2 animate-fade-up delay-100" style={{ fontFamily: "var(--font-display)" }}>Order Placed</h2>
                <p className="text-[0.82rem] text-ink/40 animate-fade-up delay-200">{formatPrice(total)} via {selectedPayment}</p>
              </div>

              <div className="animate-fade-up delay-300">
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(17,17,16,0.05)", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}>
                  <div className="bg-ink text-white p-5 sm:p-6 rounded-t-2xl">
                    <p className="text-[0.56rem] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Wallet</p>
                    <p className="text-xl sm:text-2xl font-normal tabular-nums" style={{ fontFamily: "var(--font-display)" }}>RWF {(582000 - total).toLocaleString()}</p>
                    <p className="text-[0.6rem] text-white/25 mt-1 tabular-nums">− {formatPrice(total)} from this order</p>
                  </div>
                  <div className="bg-white/60 divide-y divide-ink/[0.04]">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between px-5 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 rounded-lg flex-shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-[0.74rem] text-ink/55 truncate">{item.name}</span>
                        </div>
                        <span className="text-[0.74rem] font-medium text-ink/40 tabular-nums flex-shrink-0 ml-3">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <Link href="/" className="h-12 px-8 bg-ink text-white text-[0.66rem] font-semibold tracking-[0.16em] uppercase rounded-full inline-flex items-center justify-center hover:bg-ink/88 transition-all duration-200 shadow-[0_4px_16px_rgba(17,17,16,0.12)]">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function InputField({ label, placeholder, value, onChange, delay = 0 }: {
  label: string; placeholder: string; value: string; onChange: (val: string) => void; delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <label className={`block text-[0.6rem] font-semibold tracking-[0.16em] uppercase mb-2 transition-colors duration-200 ${focused ? "text-ink" : "text-ink/35"}`}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full h-12 rounded-xl bg-white/50 border border-ink/6 px-4 text-[0.88rem] text-ink placeholder:text-ink/20 focus:outline-none focus:border-ink/30 focus:bg-white transition-all duration-200"
      />
    </div>
  );
}
