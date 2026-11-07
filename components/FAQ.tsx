// 导出供 app/page.tsx 生成 FAQPage JSON-LD（GEO：让 AI 引擎直接引用问答）
export const FAQS = [
  {
    q: "Will Google penalize AI-generated content?",
    a: "Google rewards helpful content regardless of how it was produced — what gets penalized is unedited, unverified spam. MiraDawn posts are fact-checked against your video, cite it as the primary source, and come with a quality score so you stay in control of what ships.",
  },
  {
    q: "How is this different from VideoToBlog or other converters?",
    a: "Those tools stop at a rough draft — “90% there” is their own users’ phrasing. MiraDawn handles the last 10%: timestamp-anchored claims, a faithfulness check on every paragraph, and a publish-ready edit tuned to your voice.",
  },
  {
    q: "What does “fact-anchored” mean exactly?",
    a: "Every substantive claim in the post is linked to the exact moment in your video that supports it. You can click any claim to verify it in one click. If our model can’t anchor a claim, it flags it for review instead of inventing it.",
  },
  {
    q: "Does it handle multi-speaker videos or noisy audio?",
    a: "Yes. In the pilot batch, speaker separation and transcript cleanup are done by hand on your source material. Automated separation ships with the product — but we will not hand you a raw transcript and call it a blog post.",
  },
  {
    q: "Where can I publish?",
    a: "WordPress, Ghost, Webflow, Shopify and Medium at launch, plus clean Markdown/HTML export everywhere else. More destinations ship by user vote.",
  },
  {
    q: "What languages are supported?",
    a: "English output at launch. Input videos in major languages work from day one; choosing your output language follows shortly after.",
  },
  {
    q: "Who owns the content?",
    a: "You do. Every draft, transcript and published post is yours. We claim nothing, and we do not resell or republish your material.",
  },
  {
    q: "I teach live cohorts, not YouTube — does that work?",
    a: "Yes. Session replays, webinar recordings and cohort lesson recordings are all valid input. That is the workflow most coaches tell us they actually need — a course that keeps selling after the live call ends.",
  },
  {
    q: "Why a $29 deposit?",
    a: "It funds your pilot build slot and filters out people who will never ship. The deposit is credited 2× against whichever plan you pick at launch, and it is refunded in full any time before we start working on your material.",
  },
  {
    q: "When do I get access?",
    a: "Pilot slots are taken in small batches so every build gets hand-checked. Once your slot is confirmed we convert your first video as a live pilot, and you approve the output before anything goes near your site.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title mt-4">Questions, answered</h2>
        </div>
        <div className="mt-10 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-xl border border-slate-200 bg-slate-50/60 px-5 transition open:border-brand-200 open:bg-brand-50/40">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-left font-semibold text-slate-900">
                {f.q}
                <span className="shrink-0 text-brand-500 transition-transform group-open:rotate-45">＋</span>
              </summary>
              <p className="pb-5 leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
