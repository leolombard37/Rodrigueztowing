"use server";

import { headers } from "next/headers";
import { createServerClient } from "@/lib/supabase-server";
import { ReviewSchema, type ReviewFormData } from "@/lib/validations/review";
import { rateLimit } from "@/lib/rate-limit";
import { handleReviewNotification } from "@/lib/notifications";

export type ReviewFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof ReviewFormData, string[]>>;
};

export async function submitReview(
  prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  try {
    // Rate limiting
    const headersList = headers();
    const ip = rateLimit.getClientIP(headersList);
    const { success: withinLimit } = await rateLimit.check(ip, 3, "1m");

    if (!withinLimit) {
      return {
        success: false,
        error: "Too many requests. Please wait a moment and try again.",
      };
    }

    // Extract form data
    const rawData = {
      name: formData.get("name") as string,
      city: formData.get("city") as string,
      rating: parseInt(formData.get("rating") as string, 10),
      comment: formData.get("comment") as string,
      service_type: formData.get("service_type") as string,
    };

    // Validate with Zod
    const validated = ReviewSchema.safeParse(rawData);

    if (!validated.success) {
      const fieldErrors: Partial<Record<keyof ReviewFormData, string[]>> = {};
      for (const issue of validated.error.issues) {
        const field = issue.path[0] as keyof ReviewFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field]!.push(issue.message);
      }

      return {
        success: false,
        fieldErrors,
      };
    }

    // Insert into database
    const supabase = createServerClient();
    const { error: dbError } = await supabase.from("reviews").insert([
      {
        name: validated.data.name,
        city: validated.data.city || null,
        rating: validated.data.rating,
        comment: validated.data.comment,
        service_type: validated.data.service_type || null,
        is_approved: false, // Reviews require moderation
      },
    ]);

    if (dbError) {
      console.error("Review submission error:", dbError);
      return {
        success: false,
        error: "Failed to submit review. Please try again.",
      };
    }

    // Send notification to admin about new review (non-blocking)
    handleReviewNotification({
      name: validated.data.name,
      city: validated.data.city || null,
      rating: validated.data.rating,
      comment: validated.data.comment,
      service_type: validated.data.service_type || null,
    }).catch((err) => console.error("Notification error:", err));

    return { success: true };
  } catch (error) {
    console.error("Review action error:", error);
    return {
      success: false,
      error: "Failed to submit review. Please try again.",
    };
  }
}
