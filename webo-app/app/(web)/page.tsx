import { GlassButton, GlassPanel, Pill } from "../components/design-system";

export default function Home() {
  const services = [
    {
      name: "Hair Styling",
      description: "Expert cuts, coloring, and styling tailored to your unique look.",
      duration: "45 min",
      price: "$45+",
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "Facial Treatment",
      description: "Rejuvenating skincare treatments using premium organic products.",
      duration: "60 min",
      price: "$80+",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "Manicure",
      description: "Professional nail care, shaping, and premium polish application.",
      duration: "45 min",
      price: "$35+",
      image:
        "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1400&q=80",
    },
  ];

  const packages = [
    {
      badge: "Best Value",
      title: "The Ultimate Spa Day",
      description:
        "A full day of pampering including a 90-minute massage, organic facial, and luxury manicure/pedicure combo.",
      oldPrice: "$250",
      price: "$199",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
    },
    {
      badge: "Popular",
      title: "Bridal Glow Package",
      description:
        "Complete hair styling, professional makeup application, and a pre-event glow facial for your special day.",
      oldPrice: "$300",
      price: "$249",
      image:
        "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const team = [
    {
      name: "Sarah Jenkins",
      role: "Master Stylist",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "David Chen",
      role: "Lead Esthetician",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Maya Patel",
      role: "Nail Specialist",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "James Wilson",
      role: "Color Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Elena Brooks",
      role: "Skin Therapist",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Noah Rivera",
      role: "Wellness Specialist",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const testimonials = [
    {
      text: "Absolutely incredible experience. Sarah listened exactly to what I wanted and gave me the best haircut I've had in years.",
      person: "Emily R.",
      service: "Haircut & Style",
    },
    {
      text: "The signature facial with David was life-changing. My skin has never felt so glowing and hydrated.",
      person: "Michael T.",
      service: "Signature Facial",
    },
    {
      text: "Beautiful salon, spotlessly clean, and Maya did a fantastic job on my gel manicure.",
      person: "Jessica L.",
      service: "Gel Manicure",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 px-4 py-14 md:px-8 md:py-24">
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 md:flex-row">
          <div className="w-full space-y-5 text-center md:w-1/2 md:text-left">
            <h1 className="font-display text-5xl font-bold tracking-tight text-primary md:text-6xl">
              Your Beauty,
              <br />
              Our Priority
            </h1>
            <p className="mx-auto max-w-xl text-on-surface-variant md:mx-0">
              Expert styling and treatments tailored for you. Experience premium care in a modern, relaxing environment.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row md:justify-start">
              <GlassButton variant="primary" className="w-full sm:w-auto">
                Book Appointment
              </GlassButton>
              <GlassButton variant="ghost" className="w-full sm:w-auto">
                View Services
              </GlassButton>
            </div>
          </div>
          <div className="relative w-full md:w-1/2">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=80"
                alt="Salon interior"
                className="h-[340px] w-full object-cover md:h-[420px]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md md:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-container/80 text-on-secondary">
                ★
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">Top Rated</p>
                <p className="text-xs text-on-surface-variant">4.9 / 5 Average</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-primary/10 px-4 py-6 backdrop-blur-md md:px-8">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <Pill className="mb-2 border-error/50 bg-error/80 text-on-error">Ends in 48h</Pill>
            <h2 className="font-display text-2xl font-semibold text-primary">Seasonal Special: 20% Off All Facial Treatments</h2>
            <p className="text-sm text-on-surface-variant">Rejuvenate your skin with our premium organic facials.</p>
          </div>
          <GlassButton variant="tint">Claim Offer</GlassButton>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mb-10 text-center">
            <h2 className="font-display text-4xl font-semibold text-primary">Featured Services</h2>
            <p className="mt-2 text-on-surface-variant">Premium treatments designed to make you look and feel your best.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {services.map((service) => (
              <GlassPanel key={service.name} className="overflow-hidden rounded-xl p-0">
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
                  <span className="absolute right-3 top-3 rounded border border-white/10 bg-black/50 px-2 py-1 text-xs text-primary">
                    {service.price}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-2xl font-semibold text-primary">{service.name}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant">{service.description}</p>
                  <div className="mt-4 flex items-center border-t border-white/10 pt-3 text-sm text-on-surface-variant">
                    <span>{service.duration}</span>
                    <span className="ml-auto text-secondary">Book</span>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <GlassButton variant="ghost">View All Services</GlassButton>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-12 md:px-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mb-10 text-center">
            <h2 className="font-display text-4xl font-semibold text-primary">Premium Packages</h2>
            <p className="mt-2 text-on-surface-variant">Curated experiences for ultimate relaxation and transformation.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {packages.map((item) => (
              <GlassPanel key={item.title} className="relative rounded-2xl p-6">
                <span className="absolute right-0 top-0 rounded-bl-lg border border-white/10 bg-primary/80 px-3 py-1 text-xs font-semibold text-on-primary">
                  {item.badge}
                </span>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="h-32 w-full overflow-hidden rounded-xl border border-white/10 md:w-40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="font-display text-2xl font-semibold text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm text-on-surface-variant">{item.description}</p>
                    <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-3">
                      <div>
                        <p className="text-sm text-on-surface-variant line-through">{item.oldPrice}</p>
                        <p className="font-display text-3xl font-semibold text-primary">{item.price}</p>
                      </div>
                      <GlassButton variant="ghost">Book Package</GlassButton>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-12 md:px-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mb-8">
            <h2 className="font-display text-4xl font-semibold text-primary">Meet Our Experts</h2>
            <p className="mt-2 text-on-surface-variant">Highly trained professionals dedicated to providing exceptional service.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 md:gap-6">
            {team.map((member) => (
              <div key={member.name} className="group text-center">
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-2 border-white/10 transition-colors duration-300 group-hover:border-primary/50 md:h-32 md:w-32">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover opacity-90 mix-blend-luminosity transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:mix-blend-normal"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <h4 className="mt-3 text-sm font-semibold text-primary md:text-base">{member.name}</h4>
                <p className="text-sm text-on-surface-variant">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-12 md:px-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mb-8 text-center">
            <h2 className="font-display text-4xl font-semibold text-primary">Client Stories</h2>
            <p className="mt-2 text-on-surface-variant">Do not just take our word for it.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <GlassPanel key={item.person} className="flex h-full flex-col rounded-xl p-6">
                <div className="mb-4 text-secondary">★★★★★</div>
                <p className="mb-6 flex-grow text-on-surface">{item.text}</p>
                <div className="border-t border-white/10 pt-3">
                  <p className="font-semibold text-primary">{item.person}</p>
                  <p className="text-sm text-on-surface-variant">{item.service}</p>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-[48px] md:px-[48px]">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-[80px]">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg">
            <h3 className="mb-[24px] font-display text-2xl font-semibold text-primary">Visit Us</h3>
            <div className="space-y-[12px] text-sm text-on-surface-variant">
              <p>21, Flower Road, Colombo 07</p>
              <p>Open: Mon-Sat, 9.00 AM - 8.00 PM</p>
              <p>+94 77 123 4567</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80"
              alt="Location map preview"
              className="h-64 w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
