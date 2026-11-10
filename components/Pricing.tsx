"use client";

import { track } from "@/lib/client";

const INCLUDED = [
  "Outline in 24h — approve before you pay",
  "Full post within 48h of outline approval",
  "1,500–2,500 words · SEO structure · meta included",
  "Every claim anchored to the exact moment in your video",
  "Mechanical fact-check: zero unverified claims shipped",
  "Quality scorecard (readability · SEO · faithfulness)",
  "WordPress, Ghost, Webflow & Markdown delivery",
  "One revision round included",
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
          <strong className="text-brand-700">$99 per pilot post</strong> — beta pricing for the
          first 20 orders, then <span className="line-through">$149</span>. You approve the
          outline before you pay anything.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <div className="relative rounded-2xl border-2 border-brand-300 bg-white p-8 shadow-soft ring-1 ring-brand-200 sm:p-10">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-600 to-fuchsia-600 px-4 py-1.5 text-sm font-bold text-white">
            Pilot post — beta pricing
          </div>

          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-900">Pilot Post</h3>
            <div className="text-right">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900">$99</span>
                <span className="text-sm text-slate-400 line-through">$149</span>
              </div>
              <div className="text-xs text-slate-500">per post · beta pricing</div>
            </div>
          </div>

          <p className="mt-3 text-sm text-slate-600">
            One video or webinar recording in — a fact-checked, publish-ready blog post out.
            48h delivery after you approve the outline.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            {INCLUDED.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span className="mt-0.5 text-emerald-500">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => pick("Pilot Post")}
            className="mt-8 w-full rounded-xl bg-brand-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-brand-700"
          >
            Order my pilot post — $99
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">
            You approve the outline before paying. Nothing is charged for the outline itself.
          </p>
        </div>

        <div className="mt-8 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <div className="font-bold text-slate-900">5 slots / week</div>
            <div className="mt-1 text-xs">Real delivery capacity — each post gets hand verification</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <div className="font-bold text-slate-900">Beta: $99</div>
            <div className="mt-1 text-xs">First 20 orders, then $149/post</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <div className="font-bold text-slate-900">Teams later</div>
            <div className="mt-1 text-xs">Subscription plans from $29/mo arrive after beta</div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Have an audience, not a blog? Ask about the 30–50% partner plan · Payment via Wise or
          card after outline approval
        </p>
      </div>
    </section>
  );
}
