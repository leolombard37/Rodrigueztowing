import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PHONE_NUMBER, PHONE_DISPLAY, KENTUCKY_CITIES, SERVICES } from "@/data/constants";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-brand-orange mb-4">
              Rodriguez Towing
            </h3>
            <p className="text-gray-400 mb-6">
              Professional 24/7 towing and roadside assistance throughout Kentucky.
              Fast, reliable, and always here when you need us.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>🇺🇸 English</span>
              <span>/</span>
              <span>🇲🇽 Español</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@rodrigueztowing.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-brand-orange transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  info@rodrigueztowing.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                Kentucky (I-75 & I-65)
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Clock className="w-5 h-5" />
                Open 24/7
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-gray-400 hover:text-brand-orange transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/quote"
                  className="text-brand-orange hover:text-safety-orange transition-colors font-semibold"
                >
                  Get a Quote →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-lg font-bold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {KENTUCKY_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/service-areas/${city.slug}`}
                    className="text-gray-400 hover:text-brand-orange transition-colors"
                  >
                    {city.name}, KY
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="text-brand-orange hover:text-safety-orange transition-colors font-semibold"
                >
                  All Areas →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Rodriguez Towing & Recovery. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/contact"
                className="text-gray-500 hover:text-brand-orange transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/services"
                className="text-gray-500 hover:text-brand-orange transition-colors"
              >
                Services
              </Link>
              <Link
                href="/quote"
                className="text-gray-500 hover:text-brand-orange transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
