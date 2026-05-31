import { GlassPanel, Pill } from "../../components/design-system";

export default function AboutPage() {
  return (
    <section className="px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-[1280px] space-y-8">
        <div>
          <Pill>About</Pill>
          <h1 className="mt-4 font-display text-5xl font-semibold text-primary">Built for Modern Beauty Teams</h1>
          <p className="mt-3 max-w-3xl text-on-surface-variant">
            OmniBook combines elegant customer experiences with practical tools for salon operations,
            scheduling, and performance growth.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <GlassPanel className="p-5">
            <h2 className="font-display text-2xl font-semibold text-primary">Our Mission</h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              Help beauty and wellness businesses deliver exceptional service through intuitive technology.
            </p>
          </GlassPanel>
          <GlassPanel className="p-5">
            <h2 className="font-display text-2xl font-semibold text-primary">Our Values</h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              Craft, care, reliability, and clarity in every interaction for both staff and clients.
            </p>
          </GlassPanel>
          <GlassPanel className="p-5">
            <h2 className="font-display text-2xl font-semibold text-primary">Our Promise</h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              A platform that scales with your studio while preserving a premium brand experience.
            </p>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
