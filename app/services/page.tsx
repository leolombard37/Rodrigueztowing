import { Car, Truck, Fuel, ParkingSquare, Phone, CheckCircle } from "lucide-react";
import Link from "next/link";
import { SERVICES, PHONE_NUMBER, PHONE_DISPLAY } from "@/data/constants";

const iconMap = {
  Car: Car,
  Truck: Truck,
  Fuel: Fuel,
  ParkingSquare: ParkingSquare,
} as const;

const serviceDetails = {
  "light-duty": {
    title: "Light Duty Towing",
    description: "Professional towing for cars, SUVs, and small trucks",
    features: [
      "Cars, sedans, and coupes",
      "SUVs and crossovers",
      "Small trucks and vans",
      "Motorcycles",
      "Flatbed and wheel-lift options",
      "Damage-free towing guaranteed",
    ],
    image: "🚗",
  },
  "heavy-duty": {
    title: "Heavy Duty Towing",
    description: "Specialized equipment for large vehicles and commercial fleets",
    features: [
      "Semi-trucks and 18-wheelers",
      "Buses and RVs",
      "Construction equipment",
      "Commercial vehicles",
      "Load shifts and recovery",
      "Nationwide transport available",
    ],
    image: "🚛",
  },
  "roadside-assistance": {
    title: "Roadside Assistance",
    description: "Quick help when you need it most - we come to you",
    features: [
      "Jump starts / dead battery",
      "Flat tire changes",
      "Fuel delivery",
      "Lockout service",
      "Winch outs",
      "Minor mechanical repairs",
    ],
    image: "🔧",
  },
  "impound": {
    title: "Impound Services",
    description: "Professional private property towing and secure storage",
    features: [
      "Private property enforcement",
      "Parking lot management",
      "Secure storage facility",
      "24/7 vehicle release",
      "HOA and business contracts",
      "Legal compliance guaranteed",
    ],
    image: "🏢",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-brand-orange">Services</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From light duty towing to heavy haul recovery, we have the equipment
            and expertise to handle any situation across Kentucky.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-16">
          {SERVICES.map((service, index) => {
            const details = serviceDetails[service.id as keyof typeof serviceDetails];
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}
              >
                {/* Icon/Image Side */}
                <div className="flex-shrink-0 w-full lg:w-1/3">
                  <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
                    <div className="text-8xl mb-4">{details.image}</div>
                    <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-10 h-10 text-brand-orange" />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
                    {details.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
                    {details.description}
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                    {details.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-safety-orange text-black font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Call {PHONE_DISPLAY}
                    </a>
                    <Link
                      href="/quote"
                      className="inline-flex items-center justify-center gap-2 bg-brand-black hover:bg-brand-dark text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-brand-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a Tow <span className="text-brand-orange">Right Now?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            We&apos;re available 24/7, 365 days a year. Call us anytime for fast,
            reliable service.
          </p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center justify-center gap-3 bg-brand-orange hover:bg-safety-orange text-black font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            <Phone className="w-6 h-6" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
}
