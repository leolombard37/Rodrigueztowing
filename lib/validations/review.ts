import { z } from "zod";

export const ReviewSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  city: z
    .string()
    .max(100, "City must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(2000, "Review must be less than 2000 characters")
    .trim(),
  service_type: z
    .string()
    .max(100, "Service type must be less than 100 characters")
    .optional()
    .or(z.literal("")),
});

export type ReviewFormData = z.infer<typeof ReviewSchema>;
