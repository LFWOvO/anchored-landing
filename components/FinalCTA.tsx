export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-fuchsia-900 py-20">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Stop rewriting drafts. Start ranking.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
          Your videos already contain your best blog posts. Reserve a pilot slot for $29 — credited
          2× at launch, refunded in full any time before we start.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-brand-800 shadow-soft transition hover:bg-brand-50"
        >
          Reserve my pilot slot — $29
        </a>
        <p className="mt-4 text-sm text-brand-200">
          30-day money-back guarantee after launch · Cancel anytime
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-brand-600 to-fuchsia-600">
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white">
              <path d="M9 6.5 L17 12 L9 17.5 Z" />
            </svg>
          </span>
          <span className="font-bold text-slate-700">Anchored</span>
          <span>© 2026</span>
        </div>
        <p className="text-slate-400">Built for creators who publish.</p>
        <div className="flex items-center gap-5">
          <a href="/privacy" className="hover:text-slate-800">
            Privacy
          </a>
          <a href="mailto:hello@example.com" className="hover:text-slate-800">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
