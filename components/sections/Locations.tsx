import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { KENTUCKY_CITIES } from "@/data/constants";

export default function Locations() {
  // Extended list of counties for SEO
  const additionalCounties = [
    "Boone County",
    "Kenton County",
    "Campbell County",
    "Hardin County",
    "Daviess County",
    "Bullitt County",
    "Oldham County",
    "Shelby County",
    "Clark County",
    "Jessamine County",
    "Woodford County",
    "Franklin County",
    "Nelson County",
    "Pulaski County",
    "Pike County",
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-black text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Serving <span className="text-brand-orange">All of Kentucky</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            With strategic locations along I-75 and I-65, we provide fast towing
            services to cities and counties throughout the Commonwealth.
          </p>
        </div>

        {/* Primary Cities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {KENTUCKY_CITIES.slice(0, 3).map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="bg-brand-dark rounded-xl p-6 hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-brand-orange transition-colors">
                    {city.name} Towing
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{city.county}</p>
                  <p className="text-gray-500 text-sm">{city.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {city.highways.map((highway) => (
                      <span
                        key={highway}
                        className="text-xs bg-brand-orange/20 text-brand-orange px-2 py-1 rounded"
                      >
                        {highway}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* County List for SEO */}
        <div className="bg-brand-dark rounded-xl p-8">
          <h3 className="text-xl font-bold mb-6 text-center">
            Kentucky Counties We Serve
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 text-sm">
            {/* Primary service area counties */}
            {KENTUCKY_CITIES.map((city) => (
              <Link
                key={city.county}
                href={`/service-areas/${city.slug}`}
                className="text-gray-300 hover:text-brand-orange transition-colors"
              >
                {city.county}
              </Link>
            ))}
            {/* Additional counties */}
            {additionalCounties.map((county) => (
              <span key={county} className="text-gray-400">
                {county}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-safety-orange text-black font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Find Your Service Area
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
