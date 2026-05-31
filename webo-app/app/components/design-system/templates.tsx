import { AdminSideNav, TopNav } from "./navigation";
import { GlassButton, GlassPanel, Pill, SectionHeader } from "./primitives";

const adminNav = [
  "Home",
  "Calendar",
  "Bookings",
  "Services",
  "Website Builder",
  "Settings",
].map((label, index) => ({ label, active: index === 0 }));

const metrics = [
  { label: "Total Appointments Today", value: "24", delta: "+12%" },
  { label: "Pending Confirmations", value: "5", delta: "Needs attention" },
  { label: "Revenue Today", value: "$1,240", delta: "+8%" },
];

const ledgerRows = [
  ["#BK-1042", "Sarah Jenkins", "Premium Consultation", "Dr. Rivera", "10:30 AM", "Confirmed"],
  ["#BK-1043", "Ronal Lewis", "Wellness Assessment", "Nurse Mila", "11:45 AM", "Pending"],
  ["#BK-1044", "Amara Cline", "Therapy Session", "Dr. Ford", "1:00 PM", "Cancelled"],
];

const wizardSteps = ["Select Service", "Date & Time", "Details", "Confirm"];

export function AdminDashboardTemplate() {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Admin Dashboard"
        title="Overview"
        description="Glass-first dashboard shell with reusable side navigation, KPI cards, and agenda timeline layout."
      />
      <GlassPanel className="overflow-hidden p-0">
        <div className="flex min-h-[420px]">
          <AdminSideNav
            title="OmniBook Admin"
            subtitle="Business Manager"
            cta="New Booking"
            items={adminNav}
          />
          <div className="flex-1 p-5 md:p-7">
            <div className="grid gap-3 md:grid-cols-3">
              {metrics.map((metric) => (
                <GlassPanel key={metric.label} className="space-y-2 p-4">
                  <p className="text-sm text-on-surface-variant">{metric.label}</p>
                  <p className="font-display text-3xl font-bold text-on-surface">{metric.value}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-tertiary">{metric.delta}</p>
                </GlassPanel>
              ))}
            </div>
            <GlassPanel className="mt-4 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">Daily Agenda</h3>
                <GlassButton variant="ghost">Today</GlassButton>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <span>09:00</span>
                  <span className="text-on-surface-variant">Consultation with Marcus Allen</span>
                </div>
                <div className="flex items-start justify-between rounded-xl border border-primary/40 bg-primary/10 px-3 py-2">
                  <span className="text-primary">10:30</span>
                  <span>Current slot: Premium Session - Sarah Jenkins</span>
                </div>
                <div className="flex items-start justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <span>12:00</span>
                  <span className="text-on-surface-variant">Team sync and walkthrough</span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}

export function BookingLedgerTemplate() {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Booking Ledger"
        title="Operational Table Pattern"
        description="Toolbar, filtering controls, and glass table scaffolding extracted from the booking ledger UI."
      />
      <GlassPanel className="space-y-4 p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <GlassButton variant="ghost">Search</GlassButton>
            <GlassButton variant="ghost">Filter</GlassButton>
            <GlassButton variant="ghost">Date Range</GlassButton>
          </div>
          <GlassButton variant="tint">Export</GlassButton>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead className="bg-surface-container-highest/40 text-on-surface-variant">
              <tr>
                {[
                  "ID",
                  "Customer Name",
                  "Service",
                  "Staff / Resource",
                  "Time",
                  "Status",
                ].map((head) => (
                  <th key={head} className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.08em]">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ledgerRows.map((row) => (
                <tr key={row[0]} className="border-t border-white/10 bg-white/[0.03] hover:bg-primary/10">
                  {row.map((cell, index) => (
                    <td key={cell + index} className="px-4 py-3 text-on-surface">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </section>
  );
}

export function BookingWizardTemplate() {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Booking Wizard"
        title="Step Flow Components"
        description="Progress indicator, bento-style service cards, and sticky booking summary panel for conversion-focused booking flows."
      />
      <GlassPanel className="p-5 md:p-7">
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {wizardSteps.map((step, index) => (
            <div key={step} className="relative rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-surface-container-low text-xs font-semibold">
                {index + 1}
              </span>
              <p className="text-xs text-on-surface-variant">{step}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Standard Cleaning", "$120"],
              ["Deep Cleaning Premium", "$250"],
              ["Move-In / Move-Out", "$300"],
            ].map(([name, price], index) => (
              <GlassPanel
                key={name}
                className={index === 1 ? "border-primary/40 bg-primary/10 p-4" : "p-4"}
              >
                <p className="font-display text-lg font-semibold">{name}</p>
                <p className="mt-2 text-sm text-on-surface-variant">Starting from</p>
                <p className="mt-1 font-display text-2xl text-primary">{price}</p>
                <GlassButton variant={index === 1 ? "primary" : "ghost"} className="mt-4 w-full">
                  {index === 1 ? "Selected" : "Select"}
                </GlassButton>
              </GlassPanel>
            ))}
          </div>
          <GlassPanel className="h-fit p-4">
            <h3 className="font-display text-xl font-semibold">Booking Summary</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Service</span>
                <span>Deep Cleaning Premium</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Tax (Est.)</span>
                <span>$15.00</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">$265.00</span>
              </div>
            </div>
            <GlassButton variant="primary" className="mt-5 w-full">
              Continue to Details
            </GlassButton>
          </GlassPanel>
        </div>
      </GlassPanel>
    </section>
  );
}

export function CmsEditorTemplate() {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="CMS Editor"
        title="Split-Pane Editor System"
        description="Composable left tree, center preview canvas, and right inspector controls from the website builder crafted UI."
      />
      <GlassPanel className="overflow-hidden p-0">
        <div className="flex min-h-[420px] flex-col lg:flex-row">
          <div className="w-full border-b border-white/10 bg-surface/20 p-4 lg:w-64 lg:border-b-0 lg:border-r">
            <p className="font-display text-lg">Site Structure</p>
            <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
              <li className="rounded-lg bg-primary/15 px-3 py-2 text-primary">Hero Section</li>
              <li className="rounded-lg bg-white/5 px-3 py-2">Services Grid</li>
              <li className="rounded-lg bg-white/5 px-3 py-2">About Us</li>
              <li className="rounded-lg bg-white/5 px-3 py-2">Contact Form</li>
            </ul>
          </div>
          <div className="flex-1 border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
            <div className="rounded-2xl border border-white/15 bg-slate-950/50 p-5">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-on-surface-variant">Live Preview</p>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="font-display text-2xl text-primary">Your Beauty, Our Priority</p>
                <p className="mt-2 text-sm text-on-surface-variant">Composable storefront modules render in this central canvas.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">Service Card Module</div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">Promo Banner Module</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-surface/20 p-4 lg:w-72">
            <p className="font-display text-lg">Inspector</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-on-surface-variant">Typography Scale</p>
                <p className="mt-1">Display / Headline / Body</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-on-surface-variant">Spacing Grid</p>
                <p className="mt-1">8px baseline with fluid gutters</p>
              </div>
              <GlassButton variant="primary" className="w-full">
                Publish Changes
              </GlassButton>
            </div>
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}

export function StorefrontTemplate() {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Storefront Homepage"
        title="Marketing Surface Components"
        description="Top nav, hero blocks, service cards, and promotional strips rebuilt as reusable storefront sections."
      />
      <div className="space-y-4">
        <TopNav brand="OmniBook" links={["Services", "Pricing", "About", "Contact"]} />
        <GlassPanel className="overflow-hidden p-0">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4">
              <Pill>Premium Care</Pill>
              <h3 className="font-display text-4xl font-bold tracking-tight text-primary md:text-5xl">
                Your Beauty, Our Priority
              </h3>
              <p className="max-w-xl text-on-surface-variant">
                Expert styling and treatments tailored for you. This hero module supports CTA stacks and marketing highlights.
              </p>
              <div className="flex flex-wrap gap-3">
                <GlassButton variant="primary">Book Appointment</GlassButton>
                <GlassButton variant="ghost">View Services</GlassButton>
              </div>
            </div>
            <GlassPanel className="border-white/20 bg-white/10 p-4">
              <p className="font-display text-lg text-on-surface">Seasonal Special</p>
              <p className="mt-2 text-sm text-on-surface-variant">20% off all facial treatments. Ends in 48h.</p>
              <GlassButton variant="tint" className="mt-4 w-full">
                Claim Offer
              </GlassButton>
            </GlassPanel>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
