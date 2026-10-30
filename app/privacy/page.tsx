import type { Metadata } from "next";
import Link from "next/link";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com";

export const metadata: Metadata = {
  title: "Privacy Policy — Anchored",
  robots: { index: false },
};

export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: October 2026</p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-900">What we collect</h2>
          <p className="mt-2">
            When you reserve a pilot slot we collect your email address, your answers to the
            questions on the reservation form (what you make, publishing volume, and where your
            audience is), the page variant you were shown (A/B testing), and standard technical
            information such as your browser user agent.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">Your deposit and payment details</h2>
          <p className="mt-2">
            The $29 pilot deposit is paid through a third-party payment provider (PayPal, Wise or
            Alipay), not through this site. We never receive or store your card or bank details —
            we only see the transaction reference, the amount, and the email address you used.
            If you cancel before we begin work on your material, the deposit is refunded in full.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">Your content</h2>
          <p className="mt-2">
            If you send us video, audio or written material for a pilot build, we use it only to
            produce your deliverable. We do not resell it, republish it, or use it to train models.
            You keep all rights to everything you give us, including every draft and every
            published post.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">How we use it</h2>
          <p className="mt-2">
            We use this information solely to manage the pilot batch, deliver your build, handle
            refunds, and improve the product. We do not sell or rent your personal information to
            anyone.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">How long we keep it</h2>
          <p className="mt-2">
            If you reserve a slot but do not complete the deposit, we delete your record within 30
            days. Customers who complete a pilot keep their reservation record for as long as they
            are a customer, and it is deleted on request.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">Cookies & analytics</h2>
          <p className="mt-2">
            We store your A/B test group locally in your browser so you see a consistent
            experience. We may use privacy-friendly analytics to understand aggregate traffic.
            Advertising pixels, if any, will be disclosed here before use.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">Your rights</h2>
          <p className="mt-2">
            You can ask us to delete your data at any time by emailing the contact address below.
            We will confirm deletion within 30 days.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">Contact</h2>
          <p className="mt-2">
            Questions? Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-mono text-sm text-brand-700 underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>

      <Link href="/" className="mt-10 inline-block text-sm font-semibold text-brand-700 hover:underline">
        ← Back to home
      </Link>
    </main>
  );
}
