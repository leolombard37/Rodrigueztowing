import { z } from "zod";

const SERVICE_TYPES = [
  "Light Duty Towing",
  "Heavy Duty Towing",
  "Roadside Assistance",
  "Impound Services",
] as const;

export const QuoteSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters")
    .regex(
      /^[\d\s\-+()]+$/,
      "Phone number can only contain digits, spaces, dashes, and parentheses"
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  service_type: z.enum(SERVICE_TYPES, {
    message: "Please select a valid service type",
  }),
  vehicle_info: z
    .string()
    .min(5, "Please provide vehicle details (year, make, model)")
    .max(200, "Vehicle info must be less than 200 characters")
    .trim(),
  pickup_location: z
    .string()
    .min(5, "Please provide a pickup location")
    .max(500, "Location must be less than 500 characters")
    .trim(),
  dropoff_location: z
    .string()
    .max(500, "Location must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .max(1000, "Notes must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type QuoteFormData = z.infer<typeof QuoteSchema>;
