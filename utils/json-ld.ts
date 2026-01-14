import { PHONE_NUMBER, KENTUCKY_CITIES, SERVICES } from "@/data/constants";

export interface LocalBusinessSchema {
  "@context": "https://schema.org";
  "@type": ["LocalBusiness", "EmergencyService"];
  "@id": string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email?: string;
  areaServed: AreaServed;
  openingHoursSpecification: OpeningHoursSpecification;
  address: PostalAddress;
  geo?: GeoCoordinates;
  priceRange?: string;
  image?: string;
  sameAs?: string[];
  hasOfferCatalog?: OfferCatalog;
}

interface AreaServed {
  "@type": "State";
  name: string;
  containsPlace?: Array<{
    "@type": "City";
    name: string;
  }>;
}

interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
}

interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

interface OfferCatalog {
  "@type": "OfferCatalog";
  name: string;
  itemListElement: Array<{
    "@type": "Offer";
    itemOffered: {
      "@type": "Service";
      name: string;
      description: string;
    };
  }>;
}

const SITE_URL = "https://kentuckytowing.com";
const BUSINESS_NAME = "Rodriguez Towing";

export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EmergencyService"],
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS_NAME,
    description:
      "24/7 emergency towing and roadside assistance services across Kentucky. Light duty, heavy duty semi-truck towing, and impound services.",
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    areaServed: {
      "@type": "State",
      name: "Kentucky",
      containsPlace: KENTUCKY_CITIES.map((city) => ({
        "@type": "City" as const,
        name: city.name,
      })),
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lexington",
      addressRegion: "KY",
      addressCountry: "US",
    },
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Towing Services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer" as const,
        itemOffered: {
          "@type": "Service" as const,
          name: service.name,
          description: service.description,
        },
      })),
    },
  };
}

export function generateEmergencyServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "@id": `${SITE_URL}/#emergency-service`,
    name: `${BUSINESS_NAME} - 24/7 Emergency Towing`,
    description:
      "Fast emergency towing response across Kentucky highways including I-75 and I-65. Average response time under 30 minutes.",
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    areaServed: {
      "@type": "State",
      name: "Kentucky",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: PHONE_NUMBER,
        contactType: "emergency",
        availableLanguage: ["English", "Spanish"],
        areaServed: "Kentucky",
      },
    },
  };
}

export function generateCityServiceSchema(citySlug: string) {
  const city = KENTUCKY_CITIES.find((c) => c.slug === citySlug);
  if (!city) return null;

  return {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "@id": `${SITE_URL}/service-areas/${citySlug}#service`,
    name: `${BUSINESS_NAME} - ${city.name}`,
    description: `${city.description}. Serving ${city.county} and ${city.highways.join(", ")} corridors.`,
    url: `${SITE_URL}/service-areas/${citySlug}`,
    telephone: PHONE_NUMBER,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: city.county,
      },
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };
}

// Helper to stringify schema for injection
export function schemaToScript(schema: object): string {
  return JSON.stringify(schema);
}
