const COMPARE_ROWS: Array<{ label: string; others: string; us: string }> = [
  {
    label: "Output",
    others: "A 90% draft you still rewrite",
    us: "Publish-ready in one pass",
  },
  {
    label: "Accuracy",
    others: "Claims float free — hallucinations slip in",
    us: "Every claim anchored to the exact moment in your video",
  },
  {
    label: "Voice",
    others: "Robotic text that screams “AI”",
    us: "Human-quality pass tuned to your voice",
  },
  {
    label: "Google",
    others: "Prays it passes the helpful-content bar",
    us: "Structured for E-E-A-T from the first draft",
  },
  {
    label: "Publish",
    others: "Copy-paste into your CMS",
    us: "One click to WordPress, Ghost, Webflow & more",
  },
];

export function Compare() {
  return (
    <section id="compare" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="section-title">
          Every AI converter stops at 90%. <span className="gradient-text">That last 10% is the whole job.</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Users of the popular tools agree: the draft gets you close, then you spend an hour
          rewriting it. MiraDawn finishes the job.
        </p>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4 font-semibold">&nbsp;</th>
              <th className="px-6 py-4 font-semibold">Other AI converters</th>
              <th className="px-6 py-4 font-semibold text-brand-700">MiraDawn</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((r) => (
              <tr key={r.label} className="border-b border-slate-100 last:border-0">
                <td className="px-6 py-4 font-semibold text-slate-900">{r.label}</td>
                <td className="px-6 py-4 text-slate-500">
                  <span className="mr-2 text-rose-500">✕</span>
                  {r.others}
                </td>
                <td className="px-6 py-4 font-medium text-slate-800">
                  <span className="mr-2 text-emerald-500">✓</span>
                  {r.us}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    n: "01",
    title: "Fact-anchored writing",
    body: "Every paragraph links back to the exact moment in your video that supports it. Click any claim, watch the source. Hallucinations become impossible to miss — and impossible to publish.",
  },
  {
    n: "02",
    title: "Quality score on every post",
    body: "Readability, SEO structure and faithfulness are graded before you publish. You see exactly what to fix — or ship it with confidence when it’s already green.",
  },
  {
    n: "03",
    title: "From transcript to traffic",
    body: "Keyword targeting, internal links, meta description and schema are handled automatically. One click publishes to WordPress, Ghost, Webflow — or clean Markdown anywhere.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-y border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="section-title mt-4">Built for the last 10%</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.n}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-7 transition hover:border-brand-200 hover:bg-brand-50/40"
            >
              <div className="font-mono text-sm font-bold text-brand-500">{f.n}</div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2.5 leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Badges({ bad }: { bad?: boolean }) {
  return bad ? (
    <div className="mt-4 flex flex-wrap gap-2">
      <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">✗ Reads as AI</span>
      <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">✗ No sources</span>
      <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">✗ Rewrite required</span>
    </div>
  ) : (
    <div className="mt-4 flex flex-wrap gap-2">
      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">✓ 12/12 claims verified</span>
      <span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">Quality 94/100 · Publish-ready</span>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="section-title">
          Same video. <span className="gradient-text">Two very different blog posts.</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          A real section from a 12-minute video, converted two ways.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Before */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Typical AI converter
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">90% draft</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            “In this video, the speaker talks about podcast editing. Podcast editing is very
            important for podcasters. There are many tips and tricks for editing podcasts. Let’s
            explore some of them in this blog post. The speaker shares his workflow for editing.
            Editing can be done in many different ways depending on your needs…”
          </p>
          <Badges bad />
        </div>

        {/* After */}
        <div className="relative rounded-2xl border-2 border-brand-200 bg-white p-7 shadow-soft">
          <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-brand-600 to-fuchsia-600 px-3 py-1 text-xs font-bold text-white">
            MiraDawn
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Fact-anchored output
            </span>
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">Publish-ready</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            Batch-recording four episodes in one sitting
            <span className="mx-1 inline-flex -translate-y-px items-center rounded border border-brand-200 bg-brand-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-brand-700">02:15</span>
            cuts edit time by roughly 60% — but only if your session template stores mic gain per
            host
            <span className="mx-1 inline-flex -translate-y-px items-center rounded border border-brand-200 bg-brand-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-brand-700">04:12</span>.
          </p>
          <blockquote className="mt-3 border-l-2 border-brand-300 pl-3 text-sm italic leading-relaxed text-slate-600">
            “The timeline is a story. Cut for structure before you touch the polish.”
            <span className="not-italic mx-1 inline-flex -translate-y-px items-center rounded border border-brand-200 bg-brand-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-brand-700">07:48</span>
          </blockquote>
          <Badges />
        </div>
      </div>
    </section>
  );
}

const AUDIENCES = [
  {
    icon: "🎓",
    title: "Coaches & Course creators",
    body: "Turn webinars and cohort lessons into evergreen posts that sell while you sleep.",
  },
  {
    icon: "🎙️",
    title: "Podcasters & YouTubers",
    body: "Your back catalog is untapped SEO. Rank for the searches your videos already answer — without writing a word.",
  },
  {
    icon: "🤝",
    title: "Got an audience?",
    body: "Earn 30–50% sharing MiraDawn with your students or subscribers. You bring the audience; we bring the tool.",
  },
];

export function Audiences() {
  return (
    <section className="border-y border-slate-200 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">Built for people whose content already exists</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <div key={a.title} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-7">
              <div className="text-3xl">{a.icon}</div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
