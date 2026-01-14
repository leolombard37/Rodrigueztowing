import { Phone, FileText } from "lucide-react";
import { PHONE_NUMBER } from "@/data/constants";

export default function Hero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-brand-orange font-medium text-sm">
                  We&apos;re Available Right Now
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/30 rounded-full px-4 py-2">
                <span className="text-white font-medium text-sm">
                  🇺🇸 English / 🇲🇽 Español
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-brand-orange">24/7</span> Towing Service
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">Anywhere in Kentucky</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              Day or night, rain or shine — we never close. Stranded on I-75 or I-65?
              Call now for immediate roadside assistance across Lexington, Louisville,
              and Bowling Green.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center gap-3 bg-brand-orange hover:bg-safety-orange text-black font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Phone className="w-6 h-6" />
                Emergency Call
              </a>
              <a
                href="/quote"
                className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white hover:border-brand-orange hover:text-brand-orange text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                <FileText className="w-6 h-6" />
                Get a Quote
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-brand-orange font-bold text-2xl">15+</span>
                <span className="text-sm">Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand-orange font-bold text-2xl">50K+</span>
                <span className="text-sm">Vehicles Towed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand-orange font-bold text-2xl">30</span>
                <span className="text-sm">Min Avg Response</span>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
