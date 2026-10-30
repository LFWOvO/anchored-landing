import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** 轻量埋点接收端：CTA 点击、注册转化等。
 *  默认仅 console.log；配置 WAITLIST_WEBHOOK_URL 后同样转发（type: "track"），
 *  方便接入 Make/Zapier 汇总到表格看 A/B 数据。 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  console.log("[track]", JSON.stringify(body));

  const hook = process.env.WAITLIST_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "track", event: body }),
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      /* 埋点转发失败不影响主流程 */
    }
  }

  return new NextResponse(null, { status: 204 });
}
