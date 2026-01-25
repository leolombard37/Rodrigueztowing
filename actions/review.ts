"use server";

import { createSimpleClient } from "@/lib/supabase-server";

export type ReviewFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<string, string[]>>;
};

export async function submitReview(
  prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  try {
    // Extract form data
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const rating = parseInt(formData.get("rating") as string, 10);
    const comment = formData.get("comment") as string;
    const service_type = formData.get("service_type") as string;

    // Basic validation
    if (!name || !rating || !comment) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      };
    }

    // Insert into database using RPC function (bypasses RLS)
    const supabase = createSimpleClient();
    const { error: dbError } = await supabase.rpc("submit_review", {
      p_name: name,
      p_rating: rating,
      p_comment: comment,
      p_city: city || null,
      p_service_type: service_type || null,
    });

    if (dbError) {
      console.error("Review submission error:", dbError);
      return {
        success: false,
        error: "Failed to submit review. Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Review action error:", error);
    return {
      success: false,
      error: "Failed to submit review. Please try again.",
    };
  }
}
