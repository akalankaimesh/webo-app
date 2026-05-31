import { GlassButton, GlassPanel, Pill } from "../../components/design-system";

export default function ServicesPage() {
  const services = [
    { title: "Hair Styling", detail: "Signature cuts, color, and styling sessions.", duration: "45 min", price: "$45+" },
    { title: "Facial Treatment", detail: "Hydrating and restorative organic skin therapies.", duration: "60 min", price: "$80+" },
    { title: "Manicure", detail: "Nail shaping, cuticle care, and premium polish.", duration: "45 min", price: "$35+" },
    { title: "Scalp Therapy", detail: "Deep cleanse and nourishment for healthy scalp care.", duration: "50 min", price: "$55+" },
    { title: "Bridal Styling", detail: "Event-ready hair and makeup prep for bridal looks.", duration: "120 min", price: "$180+" },
    { title: "Wellness Massage", detail: "Tension relief and relaxation with therapeutic touch.", duration: "75 min", price: "$95+" },
  ];

  return (
    <section className="px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <Pill>Services</Pill>
        <h1 className="mt-4 font-display text-5xl font-semibold text-primary">Our Service Catalog</h1>
        <p className="mt-3 max-w-3xl text-on-surface-variant">
          Explore premium salon and wellness services tailored to your schedule and personal style.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <GlassPanel key={service.title} className="space-y-3 p-5">
              <div className="flex items-start justify-between">
                <h2 className="font-display text-2xl font-semibold text-primary">{service.title}</h2>
                <span className="rounded border border-white/20 bg-white/5 px-2 py-1 text-xs text-primary">{service.price}</span>
              </div>
              <p className="text-sm text-on-surface-variant">{service.detail}</p>
              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-sm text-on-surface-variant">
                <span>{service.duration}</span>
                <GlassButton variant="ghost" className="px-3 py-1.5 text-xs">
                  Book Now
                </GlassButton>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
