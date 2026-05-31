import { GlassButton, cn } from "./primitives";

type SideNavItem = {
  label: string;
  active?: boolean;
};

type AdminSideNavProps = {
  title: string;
  subtitle: string;
  cta: string;
  items: SideNavItem[];
};

export function AdminSideNav({ title, subtitle, cta, items }: AdminSideNavProps) {
  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-white/10 bg-surface-container-lowest/30 p-5 backdrop-blur-2xl lg:flex">
      <div className="mb-8">
        <h3 className="font-display text-2xl font-semibold text-on-surface">{title}</h3>
        <p className="mt-1 text-xs text-on-surface-variant">{subtitle}</p>
      </div>
      <GlassButton variant="primary" className="mb-6 w-full">
        {cta}
      </GlassButton>
      <nav className="space-y-1.5">
        {items.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "block rounded-xl border px-3 py-2 text-sm transition-colors",
              item.active
                ? "border-primary/40 bg-primary/15 font-semibold text-primary"
                : "border-transparent text-on-surface-variant hover:border-white/15 hover:bg-white/5 hover:text-on-surface"
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

type TopNavProps = {
  brand: string;
  links: string[];
};

export function TopNav({ brand, links }: TopNavProps) {
  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
      <strong className="font-display text-xl text-primary md:text-2xl">{brand}</strong>
      <div className="hidden items-center gap-2 md:flex">
        {links.map((link, index) => (
          <a
            key={link}
            href="#"
            className={cn(
              "rounded-lg px-3 py-2 text-sm transition-colors",
              index === 0
                ? "bg-primary/15 text-primary"
                : "text-on-surface-variant hover:bg-white/10 hover:text-on-surface"
            )}
          >
            {link}
          </a>
        ))}
      </div>
      <GlassButton variant="tint" className="md:hidden">
        Menu
      </GlassButton>
    </nav>
  );
}
