"use client";

import { useEffect, useState } from "react";
import { resolveVariant, track, type Variant } from "@/lib/client";

const COPY = {
  a: {
    eyebrow: "For coaches, course creators & newsletter writers",
    h1: "Turn your videos into blog posts that actually rank.",
    sub: "Every claim anchored to a video timestamp. Fact-checked, publish-ready, and written to sell your course — not another 90%-done draft you have to rewrite.",
  },
  b: {
    eyebrow: "For coaches, course creators & newsletter writers",
    h1: "You already made the content. We turn it into traffic.",
    sub: "Each webinar, lesson and video becomes a keyword-targeted, fact-checked blog post — published on autopilot while you coach.",
  },
} as const;

function TimestampChip({ t }: { t: string }) {
  return (
    <span className="mx-0.5 inline-flex -translate-y-px items-center rounded border border-brand-200 bg-brand-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-brand-700">
      {t}
    </span>
  );
}

export default function Hero() {
  const [variant, setVariant] = useState<Variant>("a");

  useEffect(() => {
    setVariant(resolveVariant());
  }, []);

  const copy = COPY[variant];

  return (
    <section className="relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-brand-200/60 to-fuchsia-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:pb-28 lg:pt-24">
        <div className="animate-fadeUp">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
            {variant === "a" ? (
              <>
                Turn your videos into blog posts that{" "}
                <span className="gradient-text">actually rank</span>.
              </>
            ) : (
              <>
                You already made the content.{" "}
                <span className="gradient-text">We turn it into traffic.</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">{copy.sub}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#waitlist"
              className="btn-primary"
              onClick={() => track("cta_click", { location: "hero", variant })}
            >
              Reserve my pilot slot — $29 today, credited 2× at launch
            </a>
            <a href="#compare" className="btn-secondary">
              See the difference ↓
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Your content stays yours · Full refund before we start building · Built by an ML
            engineer, not marketers
          </p>
        </div>

        {/* 产品示意卡 */}
        <div className="relative animate-fadeUp lg:justify-self-end">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-500/10 to-fuchsia-500/10 blur-xl" />
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-brand-500 via-violet-500 to-fuchsia-500">
                <svg viewBox="0 0 24 24" className="absolute inset-0 m-auto h-5 w-5 fill-white/95">
                  <path d="M9 6.5 L17 12 L9 17.5 Z" />
                </svg>
                <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1 font-mono text-[9px] text-white">
                  12:04
                </span>
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">
                  How I edit podcasts in 20 minutes
                </div>
                <div className="text-xs text-slate-500">YouTube → Blog · 1,842 words</div>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
              <p>
                Batch-recording four episodes in one sitting
                <TimestampChip t="02:15" /> cuts edit time by roughly 60% — but only if your
                session template stores mic gain per host
                <TimestampChip t="04:12" />.
              </p>
              <p>
                “The timeline is a story. Cut for structure before you touch the polish.”
                <TimestampChip t="07:48" />
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                ✓ 12/12 claims verified
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                Quality 94/100 · Publish-ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
