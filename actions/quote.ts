"use server";

import { createSimpleClient } from "@/lib/supabase-server";

export type QuoteFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<string, string[]>>;
};

export async function submitQuote(
  prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  try {
    // Extract form data
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const service_type = formData.get("service_type") as string;
    const vehicle_info = formData.get("vehicle_info") as string;
    const pickup_location = formData.get("pickup_location") as string;
    const dropoff_location = formData.get("dropoff_location") as string;
    const notes = formData.get("notes") as string;

    // Basic validation
    if (!name || !phone || !service_type || !vehicle_info || !pickup_location) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      };
    }

    // Insert into database using RPC function (bypasses RLS)
    const supabase = createSimpleClient();
    const { error: dbError } = await supabase.rpc("submit_quote", {
      p_name: name,
      p_phone: phone,
      p_email: email || null,
      p_service_type: service_type,
      p_vehicle_info: vehicle_info,
      p_pickup_location: pickup_location,
      p_dropoff_location: dropoff_location || null,
      p_notes: notes || null,
      p_is_urgent: false,
    });

    if (dbError) {
      console.error("Quote submission error:", dbError);
      return {
        success: false,
        error: "Something went wrong. Please call us directly.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Quote action error:", error);
    return {
      success: false,
      error: "Something went wrong. Please call us directly.",
    };
  }
}
