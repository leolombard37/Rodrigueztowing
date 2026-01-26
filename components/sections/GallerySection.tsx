const galleryVideos = [
  {
    src: "/videos/video-1.mp4",
    title: "Towing Service in Action",
  },
  {
    src: "/videos/video-2.mp4",
    title: "Professional Recovery",
  },
  {
    src: "/videos/video-3.mp4",
    title: "Roadside Assistance",
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

        {/* Video Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryVideos.map((video, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/3] relative bg-black">
                <video
                  src={video.src}
                  className="w-full h-full object-cover"
                  controls
                  muted
                  playsInline
                  preload="metadata"
                />
              </div>
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                <h3 className="text-white font-bold text-lg">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
