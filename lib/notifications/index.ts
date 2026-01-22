import { sendEmail, getBusinessEmail, isEmailConfigured } from "../email/client";
import { sendUrgentAlert, isSMSConfigured } from "../sms/client";
import NewQuoteEmail from "../email/templates/new-quote";
import NewContactEmail from "../email/templates/new-contact";
import NewReviewEmail from "../email/templates/new-review";
import CustomerConfirmationEmail from "../email/templates/customer-confirmation";
import { CTA_PHONE_DISPLAY } from "@/data/constants";

// Types for notification data
export interface QuoteNotificationData {
  name: string;
  phone: string;
  email?: string | null;
  service_type: string;
  vehicle_info: string;
  pickup_location: string;
  dropoff_location?: string | null;
  notes?: string | null;
  created_at?: string;
}

export interface ContactNotificationData {
  name: string;
  phone: string;
  email?: string | null;
  message: string;
  created_at?: string;
}

export interface ReviewNotificationData {
  name: string;
  city?: string | null;
  rating: number;
  comment: string;
  service_type?: string | null;
  created_at?: string;
}

/**
 * Check if a quote request is urgent (roadside assistance or contains urgent keywords)
 */
function isUrgentRequest(data: QuoteNotificationData): boolean {
  const urgentServices = ["Roadside Assistance"];
  const urgentKeywords = ["emergency", "urgent", "asap", "stranded", "accident"];

  if (urgentServices.includes(data.service_type)) {
    return true;
  }

  const notesLower = (data.notes || "").toLowerCase();
  return urgentKeywords.some((keyword) => notesLower.includes(keyword));
}

/**
 * Handle notifications for a new quote request
 */
export async function handleQuoteNotification(
  data: QuoteNotificationData
): Promise<void> {
  const createdAt = data.created_at || new Date().toISOString();
  const isUrgent = isUrgentRequest(data);
  const businessEmail = getBusinessEmail();

  // Run all notifications in parallel (non-blocking)
  const notifications: Promise<unknown>[] = [];

  // 1. Email to business owner
  if (isEmailConfigured() && businessEmail) {
    notifications.push(
      sendEmail({
        to: businessEmail,
        subject: isUrgent
          ? `URGENT: New Quote Request from ${data.name}`
          : `New Quote Request from ${data.name}`,
        react: NewQuoteEmail({
          name: data.name,
          phone: data.phone,
          email: data.email,
          serviceType: data.service_type,
          vehicleInfo: data.vehicle_info,
          pickupLocation: data.pickup_location,
          dropoffLocation: data.dropoff_location,
          notes: data.notes,
          createdAt,
          isUrgent,
        }),
        replyTo: data.email || undefined,
      })
    );
  }

  // 2. SMS alert for urgent requests
  if (isUrgent && isSMSConfigured()) {
    notifications.push(
      sendUrgentAlert({
        customerName: data.name,
        customerPhone: data.phone,
        serviceType: data.service_type,
        location: data.pickup_location,
      })
    );
  }

  // 3. Confirmation email to customer (if they provided email)
  if (data.email && isEmailConfigured()) {
    notifications.push(
      sendEmail({
        to: data.email,
        subject: "We Received Your Quote Request - Rodriguez Towing",
        react: CustomerConfirmationEmail({
          name: data.name,
          type: "quote",
          phone: CTA_PHONE_DISPLAY,
        }),
      })
    );
  }

  // Wait for all notifications to complete
  try {
    await Promise.allSettled(notifications);
  } catch (error) {
    console.error("Error sending quote notifications:", error);
  }
}

/**
 * Handle notifications for a new contact submission
 */
export async function handleContactNotification(
  data: ContactNotificationData
): Promise<void> {
  const createdAt = data.created_at || new Date().toISOString();
  const businessEmail = getBusinessEmail();

  const notifications: Promise<unknown>[] = [];

  // 1. Email to business owner
  if (isEmailConfigured() && businessEmail) {
    notifications.push(
      sendEmail({
        to: businessEmail,
        subject: `New Contact Message from ${data.name}`,
        react: NewContactEmail({
          name: data.name,
          phone: data.phone,
          email: data.email,
          message: data.message,
          createdAt,
        }),
        replyTo: data.email || undefined,
      })
    );
  }

  // 2. Confirmation email to customer (if they provided email)
  if (data.email && isEmailConfigured()) {
    notifications.push(
      sendEmail({
        to: data.email,
        subject: "We Received Your Message - Rodriguez Towing",
        react: CustomerConfirmationEmail({
          name: data.name,
          type: "contact",
          phone: CTA_PHONE_DISPLAY,
        }),
      })
    );
  }

  try {
    await Promise.allSettled(notifications);
  } catch (error) {
    console.error("Error sending contact notifications:", error);
  }
}

/**
 * Handle notifications for a new review submission
 */
export async function handleReviewNotification(
  data: ReviewNotificationData
): Promise<void> {
  const createdAt = data.created_at || new Date().toISOString();
  const businessEmail = getBusinessEmail();

  // Only send email to business (reviews need approval, no customer confirmation)
  if (isEmailConfigured() && businessEmail) {
    try {
      await sendEmail({
        to: businessEmail,
        subject: `New Review from ${data.name} (${data.rating} stars)`,
        react: NewReviewEmail({
          name: data.name,
          city: data.city,
          rating: data.rating,
          comment: data.comment,
          serviceType: data.service_type,
          createdAt,
        }),
      });
    } catch (error) {
      console.error("Error sending review notification:", error);
    }
  }
}

/**
 * Get notification system status
 */
export function getNotificationStatus(): {
  email: boolean;
  sms: boolean;
  businessEmail: string;
} {
  return {
    email: isEmailConfigured(),
    sms: isSMSConfigured(),
    businessEmail: getBusinessEmail(),
  };
}
