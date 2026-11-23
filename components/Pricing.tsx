"use client";

import { track } from "@/lib/client";

type Tier = {
  name: string;
  price: string;
  tagline: string;
  delivery: string;
  features: string[];
  plan: string;
  featured: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Instant Draft",
    price: "$19",
    tagline: "Machine-checked · no human review",
    delivery: "Delivered within 24h — usually much faster",
    features: [
      "Pipeline-processed: transcript → anchored draft",
      "Mechanical fact-check report included",
      "Every claim anchored to the exact moment in your video",
      "Flagged items disclosed — you polish the rest",
    ],
    plan: "Instant Draft — $19",
    featured: false,
  },
  {
    name: "Pilot Post",
    price: "$49",
    tagline: "Human-verified · publish-ready",
    delivery: "Outline in 24h · full post in 48h",
    features: [
      "Everything in Instant Draft",
      "Human pass: every flagged item reviewed and cleared",
      "Outline approval before you pay",
      "1,500–2,500 words · SEO structure · meta included",
      "One revision round",
    ],
    plan: "Pilot Post — $49",
    featured: true,
  },
  {
    name: "Deep Dive",
    price: "$75",
    tagline: "For long recordings & series",
    delivery: "Outline in 24h · full post in 48h",
    features: [
      "Everything in Pilot Post",
      "Recordings up to 120 minutes",
      "2,000–2,500 words",
      "Meta description + headline options",
      "Two revision rounds",
    ],
    plan: "Deep Dive — $75",
    featured: false,
  },
];

export default function Pricing() {
  function pick(plan: string) {
    window.dispatchEvent(new CustomEvent("anchored:plan", { detail: { plan } }));
    track("pricing_cta", { plan });
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="eyebrow">Pricing</span>
        <h2 className="section-title mt-4">One video in. One publish-ready post out.</h2>
        <p className="mt-4 text-lg text-slate-600">
          Pick your level of certainty: <strong className="text-brand-700">$19</strong> gets you a
          machine-checked draft within 24h, <strong className="text-brand-700">$49</strong> adds a
          human pass so it&apos;s publish-ready, <strong className="text-brand-700">$75</strong>{" "}
          handles the long recordings. On the human tiers you approve the outline before you pay
          anything.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`relative flex flex-col rounded-2xl border-2 bg-white p-6 shadow-soft sm:p-8 ${
              t.featured
                ? "border-brand-400 ring-1 ring-brand-200 lg:-mt-3 lg:mb-3"
                : "border-slate-200"
            }`}
          >
            {t.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-600 to-fuchsia-600 px-4 py-1.5 text-sm font-bold text-white">
                Most popular
              </div>
            )}
            <h3 className="text-lg font-bold text-slate-900">{t.name}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900">{t.price}</span>
            </div>
            <div className="mt-1 text-xs font-medium text-slate-500">{t.tagline}</div>
            <div className="mt-2 text-xs text-slate-400">{t.delivery}</div>

            <ul className="mt-5 flex-1 space-y-2.5 text-sm text-slate-600">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="mt-0.5 text-emerald-500">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => pick(t.plan)}
              className={`mt-7 w-full rounded-xl px-6 py-3.5 text-base font-semibold text-white transition ${
                t.featured ? "bg-brand-600 hover:bg-brand-700" : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              Order {t.name} — {t.price}
            </button>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-4 text-sm text-slate-600 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <div className="font-bold text-slate-900">5 slots / week</div>
          <div className="mt-1 text-xs">Real delivery capacity — each post gets hand verification</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <div className="font-bold text-slate-900">Launch pricing</div>
          <div className="mt-1 text-xs">Intro rates while we build our review base</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <div className="font-bold text-slate-900">Teams later</div>
          <div className="mt-1 text-xs">Subscription plans from $29/mo arrive after launch</div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Have an audience, not a blog? Ask about the 30–50% partner plan · Payment via card or bank
        transfer after outline approval
      </p>
    </section>
  );
}
