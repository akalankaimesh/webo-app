import { GlassPanel, Pill } from "../../components/design-system";

const galleryItems = [
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80",
];

export default function GalleryPage() {
  return (
    <section className="px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <Pill>Gallery</Pill>
        <h1 className="mt-4 font-display text-5xl font-semibold text-primary">Inside OmniBook</h1>
        <p className="mt-3 max-w-3xl text-on-surface-variant">
          A visual look at our ambience, treatments, and client transformations.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryItems.map((src, index) => (
            <GlassPanel key={src + index} className="overflow-hidden p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Gallery item ${index + 1}`}
                className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-52"
              />
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
