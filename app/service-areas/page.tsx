import { MapPin, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { KENTUCKY_CITIES, PHONE_NUMBER, PHONE_DISPLAY } from "@/data/constants";

export default function ServiceAreasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Service <span className="text-brand-orange">Areas</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Rodriguez Towing provides fast, reliable towing services throughout
            Kentucky. We cover all major highways and cities.
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Coverage Highlights */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-brand-black mb-6 text-center">
            Major Highway Coverage
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-brand-orange/10 rounded-xl">
              <div className="text-4xl font-bold text-brand-orange mb-2">I-75</div>
              <p className="text-gray-600">North-South through Central Kentucky</p>
            </div>
            <div className="text-center p-6 bg-brand-orange/10 rounded-xl">
              <div className="text-4xl font-bold text-brand-orange mb-2">I-65</div>
              <p className="text-gray-600">Louisville to Bowling Green</p>
            </div>
            <div className="text-center p-6 bg-brand-orange/10 rounded-xl">
              <div className="text-4xl font-bold text-brand-orange mb-2">I-64</div>
              <p className="text-gray-600">East-West through Louisville & Lexington</p>
            </div>
          </div>
        </div>

        {/* Cities Grid */}
        <h2 className="text-3xl font-bold text-brand-black mb-8 text-center">
          Cities We Serve
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KENTUCKY_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange transition-colors">
                  <MapPin className="w-6 h-6 text-brand-orange group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-brand-black mb-1 group-hover:text-brand-orange transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">{city.county}</p>
                  <p className="text-gray-600 text-sm mb-3">{city.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {city.highways.map((highway) => (
                      <span
                        key={highway}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {highway}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-orange transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Areas */}
        <div className="mt-12 bg-brand-black rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Don&apos;t See Your Area?
          </h3>
          <p className="text-gray-300 text-center mb-6 max-w-2xl mx-auto">
            We serve all of Kentucky! If your location isn&apos;t listed, give us a
            call. We&apos;ll do our best to get to you as quickly as possible.
          </p>
          <div className="flex justify-center">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-safety-orange text-black font-bold py-3 px-6 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
