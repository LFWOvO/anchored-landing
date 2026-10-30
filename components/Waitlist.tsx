"use client";

import { useEffect, useState } from "react";
import { getUtms, getVariant, makeSlug, track, type Variant } from "@/lib/client";

const ROLES = [
  "Cohort courses & webinars",
  "YouTube videos",
  "Podcast",
  "Email newsletter",
  "I run client accounts",
  "Other",
];
const VOLUMES = ["1 video / week", "2–4 videos / week", "5+ videos / week"];
const AUDIENCES = ["YouTube", "Podcast", "Email list", "Cohort courses", "LinkedIn"];
const DEPOSIT_URL = process.env.NEXT_PUBLIC_DEPOSIT_PAYMENT_URL ?? "";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [volume, setVolume] = useState(VOLUMES[1]);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [plan, setPlan] = useState<string | null>(null);
  const [variant, setVariant] = useState<Variant>("a");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [refLink, setRefLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setVariant(getVariant());
    const onPlan = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.plan) setPlan(detail.plan);
    };
    window.addEventListener("anchored:plan", onPlan);
    return () => window.removeEventListener("anchored:plan", onPlan);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          role,
          videosPerWeek: volume,
          audience,
          plan,
          variant,
          utm: getUtms(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setState("error");
        setErrorMsg(data.error || "Something went wrong. Try again?");
        return;
      }
      const slug = data.refSlug || makeSlug(email.trim().toLowerCase());
      setRefLink(`${window.location.origin}/?ref=${slug}`);
      setState("done");
      track("deposit_reservation", { plan, audience, role });
    } catch {
      setState("error");
      setErrorMsg("Network error. Try again?");
    }
  }

  async function copyRef() {
    try {
      await navigator.clipboard.writeText(refLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard 不可用时忽略 */
    }
  }

  return (
    <section id="waitlist" className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {state !== "done" ? (
          <>
            <div className="text-center">
              <h2 className="section-title">Reserve your pilot build slot — $29</h2>
              <p className="mt-4 text-lg text-slate-600">
                $29 reserves your slot in the pilot batch. It is credited 2× against any plan at
                launch, or refunded in full any time before we start building.
              </p>
            </div>

            <form
              onSubmit={submit}
              className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"
            >
              {plan && (
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700">
                  Interested in: {plan}
                  <button
                    type="button"
                    onClick={() => setPlan(null)}
                    className="text-brand-400 hover:text-brand-700"
                    aria-label="clear plan"
                  >
                    ✕
                  </button>
                </div>
              )}

              <label className="block text-sm font-semibold text-slate-800" htmlFor="wl-email">
                Email
              </label>
              <input
                id="wl-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourchannel.com"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-800" htmlFor="wl-role">
                    What do you make?
                  </label>
                  <select
                    id="wl-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  >
                    {ROLES.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800" htmlFor="wl-vol">
                    Publishing volume
                  </label>
                  <select
                    id="wl-vol"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  >
                    {VOLUMES.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-800" htmlFor="wl-aud">
                  Where is your audience?
                </label>
                <select
                  id="wl-aud"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
                >
                  {AUDIENCES.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>

              <button type="submit" disabled={state === "sending"} className="btn-primary mt-6 w-full disabled:opacity-60">
                {state === "sending" ? "Reserving…" : "Reserve my slot — $29 deposit"}
              </button>
              {state === "error" && (
                <p className="mt-3 text-center text-sm text-rose-600">{errorMsg}</p>
              )}
              <p className="mt-3 text-center text-xs text-slate-400">
                No spam, ever. One email with your payment link, and one when your build starts.
              </p>
            </form>
          </>
        ) : (
          <div className="rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-card">
            <div className="text-4xl">🎉</div>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">Your pilot slot is reserved.</h2>
            <p className="mt-2 text-slate-600">
              Slot held for <span className="font-semibold text-slate-800">{email}</span>. Pay the
              $29 deposit to lock it in — credited 2× against any plan at launch, or refunded in
              full any time before we start.
            </p>

            {DEPOSIT_URL ? (
              <a
                href={DEPOSIT_URL}
                className="btn-primary mt-6 inline-flex w-full items-center justify-center"
                onClick={() => track("deposit_paid", { plan, audience })}
              >
                Pay the $29 deposit
              </a>
            ) : (
              <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Your payment link arrives by email within 24 hours. Prefer another route? Reply to
                that email and we will send PayPal or Wise instructions instead.
              </p>
            )}

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-sm font-semibold text-slate-800">
                Coach or newsletter writer with an audience?
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Earn 30–50% of every subscription your students or subscribers sign up through your
                link.
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  readOnly
                  value={refLink}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-600"
                />
                <button
                  onClick={copyRef}
                  className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
