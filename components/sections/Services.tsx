import { Car, Truck, Fuel, ParkingSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SERVICES } from "@/data/constants";

const iconMap = {
  Car: Car,
  Truck: Truck,
  Fuel: Fuel,
  ParkingSquare: ParkingSquare,
} as const;

export default function Services() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            Our <span className="text-brand-orange">Towing Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From compact cars to 18-wheelers, we have the equipment and expertise
            to handle any towing situation in Kentucky.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];

            return (
              <div
                key={service.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100 group"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-orange transition-colors">
                  <IconComponent className="w-7 h-7 text-brand-orange group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-brand-black mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-brand-black hover:bg-brand-dark text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
