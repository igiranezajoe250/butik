import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 md:py-20 px-6 bg-warm-white border-t border-stone-200">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16">
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-5">
              Shop
            </h5>
            <ul className="space-y-3">
              {["Boutiques", "Collections", "New Arrivals", "Trending"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-5">
              Account
            </h5>
            <ul className="space-y-3">
              {["Wallet", "Orders", "Wishlist", "Settings"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-5">
              Company
            </h5>
            <ul className="space-y-3">
              {["About", "Careers", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-5">
              Legal
            </h5>
            <ul className="space-y-3">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-stone-200 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[13px] tracking-[0.3em] uppercase font-medium text-stone-900">
              Butik
            </span>
            <span className="text-xs text-stone-300">
              Kigali, Rwanda
            </span>
          </div>
          <p className="text-xs text-stone-400">
            &copy; {new Date().getFullYear()} Butik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
