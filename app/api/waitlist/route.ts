import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function makeSlug(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  const record = {
    email,
    role: body.role ?? null,
    videosPerWeek: body.videosPerWeek ?? null,
    audience: body.audience ?? null,
    plan: body.plan ?? null,
    variant: body.variant ?? null,
    utm: body.utm ?? null,
    ua: req.headers.get("user-agent") ?? null,
    ts: new Date().toISOString(),
  };

  // 本地开发 / 无 webhook 时打日志兜底
  console.log("[waitlist]", JSON.stringify(record));

  // 有 webhook（飞书机器人 / Make / Formspree 等）就转发
  const hook = process.env.WAITLIST_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "waitlist", record }),
        signal: AbortSignal.timeout(8000),
      });
    } catch (e) {
      console.error("[waitlist] webhook forward failed", e);
    }
  }

  return NextResponse.json({ ok: true, refSlug: makeSlug(email) });
}
