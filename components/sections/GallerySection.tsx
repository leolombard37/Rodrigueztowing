import Image from "next/image";

const galleryImages = [
  {
    src: "/images/gallery/gallery-1.jpg",
    alt: "Light duty towing service",
    title: "Light Duty Towing",
  },
  {
    src: "/images/gallery/gallery-2.jpg",
    alt: "Heavy duty towing service",
    title: "Heavy Duty Towing",
  },
  {
    src: "/images/gallery/gallery-3.jpg",
    alt: "Roadside assistance",
    title: "Roadside Assistance",
  },
  {
    src: "/images/gallery/gallery-4.jpg",
    alt: "Flatbed towing",
    title: "Flatbed Towing",
  },
  {
    src: "/images/gallery/gallery-5.jpg",
    alt: "Emergency towing",
    title: "Emergency Towing",
  },
  {
    src: "/images/gallery/gallery-6.jpg",
    alt: "Commercial towing",
    title: "Commercial Towing",
  },
];

export default function GallerySection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            Our <span className="text-brand-orange">Work</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            See our team in action. We handle everything from light duty towing
            to heavy commercial vehicle recovery across Kentucky.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
