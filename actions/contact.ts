"use server";

import { headers } from "next/headers";
import { createServerClient } from "@/lib/supabase-server";
import { ContactSchema, type ContactFormData } from "@/lib/validations/contact";
import { rateLimit } from "@/lib/rate-limit";
import { handleContactNotification } from "@/lib/notifications";

export type ContactFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof ContactFormData, string[]>>;
};

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
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
      message: formData.get("message") as string,
    };

    // Validate with Zod
    const validated = ContactSchema.safeParse(rawData);

    if (!validated.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string[]>> = {};
      for (const issue of validated.error.issues) {
        const field = issue.path[0] as keyof ContactFormData;
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
    const { error: dbError } = await supabase.from("contacts").insert([
      {
        name: validated.data.name,
        phone: validated.data.phone,
        email: validated.data.email || null,
        message: validated.data.message,
      },
    ]);

    if (dbError) {
      console.error("Contact submission error:", dbError);
      return {
        success: false,
        error: "Something went wrong. Please call us directly.",
      };
    }

    // Send notifications (non-blocking - don't wait for completion)
    handleContactNotification({
      name: validated.data.name,
      phone: validated.data.phone,
      email: validated.data.email || null,
      message: validated.data.message,
    }).catch((err) => console.error("Notification error:", err));

    return { success: true };
  } catch (error) {
    console.error("Contact action error:", error);
    return {
      success: false,
      error: "Something went wrong. Please call us directly.",
    };
  }
}
