import { GlassButton, GlassPanel, Pill } from "../../components/design-system";

export default function PriceingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: ["Online booking", "Basic customer list", "Email reminders"],
    },
    {
      name: "Growth",
      price: "$79",
      period: "/month",
      features: ["Everything in Starter", "Staff scheduling", "Promo campaigns"],
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "/month",
      features: ["Everything in Growth", "Advanced analytics", "Priority support"],
    },
  ];

  return (
    <section className="px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <Pill>Priceing</Pill>
        <h1 className="mt-4 font-display text-5xl font-semibold text-primary">Simple Transparent Plans</h1>
        <p className="mt-3 max-w-3xl text-on-surface-variant">
          Choose the plan that fits your salon operations and scale with confidence.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <GlassPanel key={plan.name} className={index === 1 ? "border-primary/40 bg-primary/10 p-6" : "p-6"}>
              <h2 className="font-display text-3xl font-semibold text-primary">{plan.name}</h2>
              <p className="mt-2 font-display text-4xl font-bold text-on-surface">
                {plan.price}
                <span className="text-base font-medium text-on-surface-variant">{plan.period}</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-on-surface-variant">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <GlassButton variant={index === 1 ? "primary" : "ghost"} className="mt-6 w-full">
                Get Started
              </GlassButton>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
