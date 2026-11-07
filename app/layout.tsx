import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MiraDawn — Turn videos into blog posts that actually rank",
  description:
    "MiraDawn turns your webinars, lessons and videos into fact-checked, publish-ready blog posts — every claim anchored to the exact moment in the video. Built for coaches, course creators and solo creators.",
  openGraph: {
    title: "MiraDawn — Turn videos into blog posts that actually rank",
    description:
      "Fact-anchored, publish-ready blog posts from your YouTube videos. The last 10% other AI converters skip.",
    url: siteUrl,
    siteName: "MiraDawn",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiraDawn — Turn videos into blog posts that actually rank",
    description:
      "Fact-anchored, publish-ready blog posts from your YouTube videos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 font-sans text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
