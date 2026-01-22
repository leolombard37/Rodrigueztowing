"use server";

import { headers } from "next/headers";
import { createServerClient } from "@/lib/supabase-server";
import { QuoteSchema, type QuoteFormData } from "@/lib/validations/quote";
import { rateLimit } from "@/lib/rate-limit";
import { handleQuoteNotification } from "@/lib/notifications";

export type QuoteFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof QuoteFormData, string[]>>;
};

export async function submitQuote(
  prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  try {
    // Rate limiting
    const headersList = headers();
    const ip = rateLimit.getClientIP(headersList);
    const { success: withinLimit } = await rateLimit.check(ip, 5, "1m");

    if (!withinLimit) {
      return {
        success: false,
        error: "Too many requests. Please wait a moment and try again.",
      };
    }

    // Extract form data
    const rawData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      service_type: formData.get("service_type") as string,
      vehicle_info: formData.get("vehicle_info") as string,
      pickup_location: formData.get("pickup_location") as string,
      dropoff_location: formData.get("dropoff_location") as string,
      notes: formData.get("notes") as string,
    };

    // Validate with Zod
    const validated = QuoteSchema.safeParse(rawData);

    if (!validated.success) {
      const fieldErrors: Partial<Record<keyof QuoteFormData, string[]>> = {};
      for (const issue of validated.error.issues) {
        const field = issue.path[0] as keyof QuoteFormData;
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
    const { error: dbError } = await supabase.from("quote_requests").insert([
      {
        name: validated.data.name,
        phone: validated.data.phone,
        email: validated.data.email || null,
        service_type: validated.data.service_type,
        vehicle_info: validated.data.vehicle_info,
        pickup_location: validated.data.pickup_location,
        dropoff_location: validated.data.dropoff_location || null,
        notes: validated.data.notes || null,
        status: "pending",
      },
    ]);

    if (dbError) {
      console.error("Quote submission error:", dbError);
      return {
        success: false,
        error: "Something went wrong. Please call us directly.",
      };
    }

    // Send notifications (non-blocking - don't wait for completion)
    // Urgent requests (roadside assistance) will automatically trigger SMS
    handleQuoteNotification({
      name: validated.data.name,
      phone: validated.data.phone,
      email: validated.data.email || null,
      service_type: validated.data.service_type,
      vehicle_info: validated.data.vehicle_info,
      pickup_location: validated.data.pickup_location,
      dropoff_location: validated.data.dropoff_location || null,
      notes: validated.data.notes || null,
    }).catch((err) => console.error("Notification error:", err));

    return { success: true };
  } catch (error) {
    console.error("Quote action error:", error);
    return {
      success: false,
      error: "Something went wrong. Please call us directly.",
    };
  }
}
