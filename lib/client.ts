"use client";

export type Variant = "a" | "b";

/**
 * A/B 分组逻辑（优先级）：
 * 1. URL 参数 ?v=a / ?v=b （广告分账、自己检查时用，会写入 localStorage）
 * 2. localStorage 里已存的分组（老访客保持一致）
 * 3. 随机 50/50
 */
export function resolveVariant(): Variant {
  if (typeof window === "undefined") return "a";
  try {
    const p = new URLSearchParams(window.location.search).get("v");
    if (p === "a" || p === "b") {
      localStorage.setItem("ab_variant", p);
      return p;
    }
    const saved = localStorage.getItem("ab_variant");
    if (saved === "a" || saved === "b") return saved;
    const v: Variant = Math.random() < 0.5 ? "a" : "b";
    localStorage.setItem("ab_variant", v);
    return v;
  } catch {
    return "a";
  }
}

export function getVariant(): Variant {
  if (typeof window === "undefined") return "a";
  try {
    const s = localStorage.getItem("ab_variant");
    return s === "b" ? "b" : "a";
  } catch {
    return "a";
  }
}

/** 采集 UTM / ref 参数（首次进站存 sessionStorage，之后一直带上） */
export function getUtms(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const keys = ["utm_source", "utm_medium", "utm_campaign", "ref"];
  try {
    const cached = sessionStorage.getItem("utms");
    if (cached) return JSON.parse(cached);
    const out: Record<string, string> = {};
    const sp = new URLSearchParams(window.location.search);
    let found = false;
    for (const k of keys) {
      const v = sp.get(k);
      if (v) {
        out[k] = v;
        found = true;
      }
    }
    if (found) sessionStorage.setItem("utms", JSON.stringify(out));
    return out;
  } catch {
    return {};
  }
}

/** 轻量埋点：CTA 点击等。转发到 /api/track（console + 可选 webhook） */
export async function track(
  event: string,
  payload: Record<string, unknown> = {}
): Promise<void> {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, variant: getVariant(), ...getUtms(), ...payload, ts: Date.now() }),
      keepalive: true,
    });
  } catch {
    /* 埋点失败不影响主流程 */
  }
}

/** email → 短 referral slug（客户端本地生成，与服务端同算法） */
export function makeSlug(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}
