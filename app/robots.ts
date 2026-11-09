import type { MetadataRoute } from "next";

// 生产域名 miradawn.com（env 未设置时的兜底）。
// ⚠️ 环境变量 NEXT_PUBLIC_SITE_URL 在 Vercel 上仍指向旧域名，需在 Vercel 后台同步更新。
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.miradawn.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `https://www.miradawn.com/sitemap.xml`,
  };
}
