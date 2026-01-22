import { Resend } from "resend";

// Initialize Resend client
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Email configuration
const FROM_EMAIL =
  process.env.FROM_EMAIL || "Rodriguez Towing <onboarding@resend.dev>";
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || "";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  replyTo?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  if (!resend) {
    console.warn("RESEND_API_KEY not configured - skipping email");
    return false;
  }

  if (!options.to || (Array.isArray(options.to) && options.to.length === 0)) {
    console.warn("No recipient specified - skipping email");
    return false;
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      react: options.react,
      replyTo: options.replyTo,
    });

    if (error) {
      console.error("Failed to send email:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

export function getBusinessEmail(): string {
  return BUSINESS_EMAIL;
}

export function isEmailConfigured(): boolean {
  return !!resend && !!BUSINESS_EMAIL;
}
