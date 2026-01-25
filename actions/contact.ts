"use server";

import { createSimpleClient } from "@/lib/supabase-server";

export type ContactFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<string, string[]>>;
};

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // Extract form data
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Basic validation
    if (!name || !phone || !message) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      };
    }

    // Insert into database using RPC function (bypasses RLS)
    const supabase = createSimpleClient();
    const { error: dbError } = await supabase.rpc("submit_contact", {
      p_name: name,
      p_phone: phone,
      p_email: email || null,
      p_message: message,
    });

    if (dbError) {
      console.error("Contact submission error:", dbError);
      return {
        success: false,
        error: "Something went wrong. Please call us directly.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Contact action error:", error);
    return {
      success: false,
      error: "Something went wrong. Please call us directly.",
    };
  }
}
