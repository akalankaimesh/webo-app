const kpis = [
  {
    title: "Total Appointments Today",
    value: "24",
    sub: "12% vs yesterday",
    accent: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    title: "Pending Confirmations",
    value: "5",
    sub: "Requires attention",
    accent: "text-error",
    iconBg: "bg-error/10",
  },
  {
    title: "Revenue Today",
    value: "$1,240",
    sub: "8% vs last week",
    accent: "text-tertiary",
    iconBg: "bg-tertiary/10",
  },
];

const timelineItems = [
  {
    time: "09:00",
    title: "Consultation - Sarah Jenkins",
    detail: "Completed • Service: Initial Strategy",
    muted: true,
    duration: "45m",
  },
  {
    time: "10:00",
    title: "Onboarding Call - Mark Robinson",
    detail: "In Progress • Zoom Link",
    duration: "1h",
    revenue: "$150.00",
    active: true,
  },
  {
    time: "11:30",
    title: "Team Sync - Weekly Review",
    detail: "Internal • Conference Room A",
    duration: "30m",
  },
  {
    time: "13:00",
    title: "Client Discovery - TechCorp Inc.",
    detail: "Pending Confirmation",
    duration: "1h 30m",
    warning: true,
  },
];

export default function AdminHomePage() {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {kpis.map((kpi) => (
          <article
            key={kpi.title}
            className="flex flex-col justify-between rounded-lg border border-outline-variant/30 bg-surface-container-lowest/10 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition-colors hover:border-primary/50"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-on-surface-variant">{kpi.title}</p>
              <span className={`inline-flex h-8 w-8 items-center justify-center rounded ${kpi.iconBg} ${kpi.accent}`}>●</span>
            </div>
            <div className="flex items-baseline gap-3">
              <p className="font-display text-5xl font-bold tracking-tight text-on-surface">{kpi.value}</p>
              <p className={`font-mono text-xs ${kpi.accent}`}>{kpi.sub}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="min-h-[560px] overflow-hidden rounded-lg border border-outline-variant/30 bg-surface-container-lowest/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md">
        <header className="flex items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest/20 px-6 py-4">
          <h3 className="font-display text-xl font-semibold text-on-surface">Daily Agenda</h3>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded border border-outline-variant/50 bg-surface-container-lowest/30 p-2 text-on-surface-variant hover:text-primary">
              ‹
            </button>
            <button
              type="button"
              className="rounded border border-outline-variant/50 bg-surface-container-lowest/30 px-3 py-2 text-sm text-on-surface-variant hover:text-primary"
            >
              Today
            </button>
            <button type="button" className="rounded border border-outline-variant/50 bg-surface-container-lowest/30 p-2 text-on-surface-variant hover:text-primary">
              ›
            </button>
          </div>
        </header>

        <div className="relative space-y-4 p-6">
          <div className="pointer-events-none absolute left-6 right-6 top-[35%] flex items-center">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="ml-1 h-px flex-1 bg-primary/60" />
            <span className="ml-2 font-mono text-xs text-primary">10:30 AM</span>
          </div>

          {timelineItems.map((item) => (
            <article key={`${item.time}-${item.title}`} className="relative flex pl-16">
              <div className="absolute left-0 top-0 flex w-12 flex-col items-center">
                <span className={`mt-3 font-mono text-xs ${item.active ? "font-bold text-on-surface" : "text-on-surface-variant"}`}>
                  {item.time}
                </span>
                <div className="my-1 h-16 w-px bg-outline-variant/30" />
              </div>

              <div
                className={
                  item.active
                    ? "flex w-full items-start justify-between rounded-r border border-outline-variant/30 border-l-4 border-l-primary bg-primary/10 p-4 shadow-sm backdrop-blur-sm"
                    : item.warning
                      ? "flex w-full items-start justify-between rounded border border-dashed border-error/50 bg-surface-container-lowest/10 p-4 backdrop-blur-sm"
                      : item.muted
                        ? "flex w-full items-start justify-between rounded border border-outline-variant/30 bg-surface-container-lowest/10 p-4 opacity-60 backdrop-blur-sm"
                        : "flex w-full items-start justify-between rounded border border-outline-variant/30 bg-surface-container-lowest/10 p-4 backdrop-blur-sm"
                }
              >
                <div>
                  <h4 className="text-sm text-on-surface">{item.title}</h4>
                  <p className={`mt-1 font-mono text-xs ${item.warning ? "text-error" : "text-on-surface-variant"}`}>{item.detail}</p>
                </div>

                <div className="text-right">
                  <p className="rounded bg-surface-container-high/50 px-2 py-0.5 font-mono text-xs text-on-surface-variant">{item.duration}</p>
                  {item.revenue ? <p className="mt-1 font-mono text-xs text-on-surface-variant">{item.revenue}</p> : null}
                  {item.warning ? <p className="mt-1 font-mono text-xs text-primary">Confirm Now</p> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
