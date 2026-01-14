import { notFound } from "next/navigation";
import { MapPin, Phone, Clock, Truck, CheckCircle } from "lucide-react";
import Link from "next/link";
import { KENTUCKY_CITIES, SERVICES, PHONE_NUMBER, PHONE_DISPLAY } from "@/data/constants";
import { generateCityServiceSchema } from "@/utils/json-ld";

interface CityPageProps {
  params: { city: string };
}

export function generateStaticParams() {
  return KENTUCKY_CITIES.map((city) => ({
    city: city.slug,
  }));
}

export function generateMetadata({ params }: CityPageProps) {
  const city = KENTUCKY_CITIES.find((c) => c.slug === params.city);
  if (!city) return {};

  return {
    title: `Towing in ${city.name}, KY | Rodriguez Towing - 24/7 Service`,
    description: `${city.description}. Fast, reliable towing and roadside assistance in ${city.name}, ${city.county}. Available 24/7. Call ${PHONE_DISPLAY}`,
  };
}

export default function CityPage({ params }: CityPageProps) {
  const city = KENTUCKY_CITIES.find((c) => c.slug === params.city);

  if (!city) {
    notFound();
  }

  const schema = generateCityServiceSchema(params.city);

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-brand-black py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-brand-orange" />
              <span className="text-brand-orange font-medium text-sm">
                {city.county}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Towing in <span className="text-brand-orange">{city.name}</span>, KY
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {city.description}. Fast response times on {city.highways.join(", ")} and
              throughout {city.county}.
            </p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="container mx-auto px-4 -mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Response Time</p>
                <p className="text-xl font-bold text-brand-black">~30 Minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Availability</p>
                <p className="text-xl font-bold text-brand-black">24/7 Service</p>
              </div>
            </div>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-4 bg-brand-orange rounded-xl p-4 hover:bg-safety-orange transition-colors"
            >
              <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-black/70">Call Now</p>
                <p className="text-xl font-bold text-black">{PHONE_DISPLAY}</p>
              </div>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Services */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-brand-black mb-6">
                Our Services in {city.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {SERVICES.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-xl p-6 shadow-md"
                  >
                    <h3 className="text-xl font-bold text-brand-black mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Link
                      href={`/services#${service.id}`}
                      className="text-brand-orange font-semibold hover:underline"
                    >
                      Learn More →
                    </Link>
                  </div>
                ))}
              </div>

              {/* Why Choose Us */}
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-brand-black mb-6">
                  Why Choose Rodriguez Towing in {city.name}?
                </h2>
                <div className="bg-white rounded-xl p-8 shadow-md">
                  <ul className="space-y-4">
                    {[
                      "Fast response times - typically under 30 minutes",
                      "Available 24 hours a day, 7 days a week",
                      "Bilingual operators (English & Spanish)",
                      `Local knowledge of ${city.name} and ${city.county}`,
                      `Strategic coverage of ${city.highways.join(" and ")}`,
                      "Competitive, upfront pricing",
                      "Fully licensed and insured",
                      "Modern fleet with flatbed and wheel-lift trucks",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-brand-black rounded-xl p-6 text-white sticky top-28">
                <h3 className="text-xl font-bold mb-4">
                  Need a Tow in {city.name}?
                </h3>
                <p className="text-gray-300 mb-6">
                  We&apos;re ready to help 24/7. Call us now or request a quote online.
                </p>
                <div className="space-y-4">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center justify-center gap-2 bg-brand-orange hover:bg-safety-orange text-black font-bold py-3 px-6 rounded-lg transition-colors w-full"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                  <Link
                    href="/quote"
                    className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-bold py-3 px-6 rounded-lg transition-colors w-full"
                  >
                    Get a Quote
                  </Link>
                </div>
                <p className="text-center mt-4 text-sm text-gray-400">
                  🇺🇸 English / 🇲🇽 Español
                </p>
              </div>

              {/* Highways */}
              <div className="bg-white rounded-xl p-6 shadow-md mt-6">
                <h3 className="text-lg font-bold text-brand-black mb-4">
                  Highway Coverage
                </h3>
                <div className="space-y-2">
                  {city.highways.map((highway) => (
                    <div
                      key={highway}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="w-2 h-2 bg-brand-orange rounded-full" />
                      {highway}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Cities */}
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-brand-black mb-8 text-center">
              Other Areas We Serve
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {KENTUCKY_CITIES.filter((c) => c.slug !== city.slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/service-areas/${c.slug}`}
                  className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow text-brand-black hover:text-brand-orange"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
