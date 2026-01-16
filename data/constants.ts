export const PHONE_NUMBER = "+1-929-373-8832";
export const PHONE_DISPLAY = "(929) 373-8832";

export const SERVICES = [
  {
    id: "light-duty",
    name: "Light Duty Towing",
    description: "Cars, SUVs, and small trucks up to 10,000 lbs",
    icon: "Car",
  },
  {
    id: "heavy-duty",
    name: "Heavy Duty Towing",
    description: "Semi-trucks, buses, RVs, and commercial vehicles",
    icon: "Truck",
  },
  {
    id: "roadside-assistance",
    name: "Roadside Assistance",
    description: "Jump starts, tire changes, fuel delivery, and lockouts",
    icon: "Fuel",
  },
  {
    id: "impound",
    name: "Impound Services",
    description: "Private property towing and vehicle storage",
    icon: "ParkingSquare",
  },
] as const;

export const KENTUCKY_CITIES = [
  {
    slug: "lexington",
    name: "Lexington",
    county: "Fayette County",
    highways: ["I-75", "I-64"],
    description: "Serving Lexington and the heart of the Bluegrass Region",
  },
  {
    slug: "louisville",
    name: "Louisville",
    county: "Jefferson County",
    highways: ["I-65", "I-64", "I-71"],
    description: "24/7 towing services throughout the Louisville metro area",
  },
  {
    slug: "bowling-green",
    name: "Bowling Green",
    county: "Warren County",
    highways: ["I-65"],
    description: "Fast response times along I-65 and Warren County",
  },
  {
    slug: "richmond",
    name: "Richmond",
    county: "Madison County",
    highways: ["I-75"],
    description: "Covering I-75 corridor and Eastern Kentucky University area",
  },
  {
    slug: "georgetown",
    name: "Georgetown",
    county: "Scott County",
    highways: ["I-75", "US-62"],
    description: "Quick service to Georgetown and Scott County",
  },
] as const;

export type Service = (typeof SERVICES)[number];
export type KentuckyCity = (typeof KENTUCKY_CITIES)[number];
