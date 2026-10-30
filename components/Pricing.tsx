"use client";

import { track } from "@/lib/client";

const PLANS = [
  {
    name: "Creator",
    price: 29,
    was: 58,
    blurb: "For solo creators publishing weekly.",
    features: [
      "8 videos / month · up to 90 min each",
      "Fact-anchor citations on every claim",
      "Quality & faithfulness score",
      "WordPress, Ghost, Webflow & Markdown export",
      "1 connected site",
    ],
    cta: "Reserve my slot — $29 (Creator)",
    popular: false,
  },
  {
    name: "Pro",
    price: 59,
    was: 118,
    blurb: "For channels that publish everywhere.",
    features: [
      "25 videos / month",
      "Channel sync — new videos convert automatically",
      "Auto internal links & keyword targeting",
      "A/B title suggestions",
      "3 connected sites",
    ],
    cta: "Reserve my slot — $29 (Pro)",
    popular: true,
  },
  {
    name: "Agency",
    price: 149,
    was: 298,
    blurb: "For teams running client accounts.",
    features: [
      "100 videos / month",
      "10 connected sites · multi-client workspaces",
      "QA approval gates before publish",
      "White-label exports",
      "Priority support",
      "Have an audience, not a client roster? Ask about the 30–50% partner plan.",
    ],
    cta: "Reserve my slot — $29 (Agency)",
    popular: false,
  },
];

export default function Pricing() {
  function pick(plan: string) {
    window.dispatchEvent(new CustomEvent("anchored:plan", { detail: { plan } }));
    track("pricing_cta", { plan });
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="eyebrow">Pricing</span>
        <h2 className="section-title mt-4">Simple pricing. Serious output.</h2>
        <p className="mt-4 text-lg text-slate-600">
          A <strong className="text-brand-700">$29 deposit</strong> reserves your pilot build
          slot. It is credited <strong className="text-brand-700">2×</strong> against any plan at
          launch, or refunded in full any time before we start.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-2xl border bg-white p-7 ${
              p.popular ? "border-brand-300 shadow-soft ring-1 ring-brand-200" : "border-slate-200 shadow-card"
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-600 to-fuchsia-600 px-3 py-1 text-xs font-bold text-white">
                Most popular
              </div>
            )}
            <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900">${p.price}</span>
              <span className="text-sm text-slate-400 line-through">${p.was}</span>
              <span className="text-sm text-slate-500">/mo</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{p.blurb}</p>
            <ul className="mt-5 flex-1 space-y-2.5 text-sm text-slate-600">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-0.5 text-emerald-500">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => pick(p.name)}
              className={`mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold transition ${
                p.popular
                  ? "bg-brand-600 text-white hover:bg-brand-700"
                  : "border border-slate-200 bg-white text-slate-800 hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        All plans: 30-day money-back guarantee after launch · Cancel anytime · $29 deposit
        refunded in full any time before your build starts
      </p>
    </section>
  );
}
