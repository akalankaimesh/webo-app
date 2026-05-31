import { GlassButton, GlassPanel, Pill } from "../../components/design-system";

export default function ContactPage() {
  return (
    <section className="px-4 py-12 md:px-8">
      <div className="mx-auto grid w-full max-w-[1280px] gap-6 lg:grid-cols-[1fr_1.1fr]">
        <GlassPanel className="p-6">
          <Pill>Contact</Pill>
          <h1 className="mt-4 font-display text-5xl font-semibold text-primary">Let Us Talk</h1>
          <p className="mt-3 text-on-surface-variant">
            Need help with bookings, pricing, or onboarding? Reach out and our team will respond quickly.
          </p>
          <div className="mt-6 space-y-2 text-sm text-on-surface-variant">
            <p>Email: hello@omnibook.com</p>
            <p>Phone: +94 77 123 4567</p>
            <p>Address: 21, Flower Road, Colombo 07</p>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h2 className="font-display text-3xl font-semibold text-primary">Send a Message</h2>
          <form className="mt-5 space-y-4">
            <input
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant"
              placeholder="Your Name"
              type="text"
            />
            <input
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant"
              placeholder="Email Address"
              type="email"
            />
            <textarea
              className="h-32 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant"
              placeholder="How can we help?"
            />
            <GlassButton variant="primary" className="w-full" type="submit">
              Send Message
            </GlassButton>
          </form>
        </GlassPanel>
      </div>
    </section>
  );
}
