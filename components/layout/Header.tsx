"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X, Truck } from "lucide-react";
import { PHONE_NUMBER, PHONE_DISPLAY } from "@/data/constants";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/quote", label: "Get a Quote" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-black shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Truck className="w-8 h-8 md:w-10 md:h-10 text-brand-orange" />
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg md:text-xl leading-tight">
                Rodriguez
              </span>
              <span className="text-brand-orange font-bold text-sm md:text-base leading-tight">
                TOWING
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-brand-orange transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Call Now Button - Always Visible */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-2 bg-brand-orange hover:bg-safety-orange text-black font-bold py-3 px-4 md:px-6 rounded-lg transition-colors shadow-lg"
          >
            <Phone className="w-5 h-5" />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">CALL NOW</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden ml-2 p-2 text-white hover:text-brand-orange transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-white hover:text-brand-orange transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
