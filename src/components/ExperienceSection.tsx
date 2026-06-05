const pillars = [
  {
    number: "01",
    title: "Conversation-first",
    description:
      "Tell us what you need in your own words. Our network of boutique agents and real people find exactly what you're looking for.",
  },
  {
    number: "02",
    title: "Seamless payments",
    description:
      "Pay how you want. Mobile money, card, stablecoin, or lightning. Your wallet holds your assets and transaction history in one place.",
  },
  {
    number: "03",
    title: "Direct from source",
    description:
      "No middlemen. Every transaction connects you directly with verified boutiques and artisans across Rwanda's markets.",
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-stone-900 text-stone-100">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-xl mb-14 md:mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3">
            How it works
          </p>
          <h3
            className="text-3xl md:text-4xl font-light text-stone-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Commerce, reimagined
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {pillars.map((p) => (
            <div key={p.number} className="space-y-4">
              <span className="text-xs text-stone-500 tracking-widest">
                {p.number}
              </span>
              <h4 className="text-lg font-medium text-stone-100">
                {p.title}
              </h4>
              <p className="text-sm text-stone-400 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-16 border-t border-stone-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "200+", label: "Boutiques" },
              { value: "50K+", label: "Products" },
              { value: "30", label: "Districts" },
              { value: "24/7", label: "Available" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl md:text-3xl font-light text-stone-100 mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs tracking-[0.15em] uppercase text-stone-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
