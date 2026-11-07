import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { Compare, Features, BeforeAfter, Audiences } from "@/components/Sections";
import Pricing from "@/components/Pricing";
import FAQ, { FAQS } from "@/components/FAQ";
import Waitlist from "@/components/Waitlist";
import { FinalCTA, Footer } from "@/components/FinalCTA";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// GEO：结构化数据，让 Google 富结果与 ChatGPT/Perplexity 等 AI 引擎
// 能直接解析产品信息与 FAQ 问答（来源验证：ChatGPT 推荐流量的购买意愿最高）
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "MiraDawn",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteUrl,
      description:
        "Turns webinars, lessons and videos into publish-ready, fact-checked blog posts. Every claim is anchored to the exact moment in the source video.",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "29",
        highPrice: "149",
        priceCurrency: "USD",
        offerCount: "3",
      },
    },
    {
      "@type": "WebSite",
      name: "MiraDawn",
      url: siteUrl,
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Compare />
        <Features />
        <BeforeAfter />
        <Audiences />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
