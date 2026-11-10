import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-fuchsia-600">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
              <path d="M9 6.5 L17 12 L9 17.5 Z" />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">MiraDawn</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" className="hover:text-brand-700">How it works</a>
          <a href="#compare" className="hover:text-brand-700">Compare</a>
          <a href="#pricing" className="hover:text-brand-700">Pricing</a>
          <a href="#faq" className="hover:text-brand-700">FAQ</a>
        </nav>
        <a
          href="#order"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Pilot post — $99
        </a>
      </div>
    </header>
  );
}
