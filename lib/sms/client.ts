import twilio from "twilio";

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client =
  accountSid && authToken ? twilio(accountSid, authToken) : null;

export interface SendSMSOptions {
  to: string;
  message: string;
}

/**
 * Send a single SMS message
 */
export async function sendSMS(options: SendSMSOptions): Promise<boolean> {
  if (!client || !twilioPhoneNumber) {
    console.warn("Twilio not configured - skipping SMS");
    return false;
  }

  try {
    await client.messages.create({
      body: options.message,
      from: twilioPhoneNumber,
      to: options.to,
    });
    return true;
  } catch (error) {
    console.error("SMS send error:", error);
    return false;
  }
}

/**
 * Send SMS to multiple recipients
 */
export async function sendSMSToMultiple(
  recipients: string[],
  message: string
): Promise<{ sent: number; failed: number }> {
  if (!client || !twilioPhoneNumber) {
    console.warn("Twilio not configured - skipping SMS");
    return { sent: 0, failed: recipients.length };
  }

  let sent = 0;
  let failed = 0;

  await Promise.all(
    recipients.map(async (to) => {
      try {
        await client.messages.create({
          body: message,
          from: twilioPhoneNumber,
          to: to,
        });
        sent++;
      } catch (error) {
        console.error(`Failed to send SMS to ${to}:`, error);
        failed++;
      }
    })
  );

  return { sent, failed };
}

/**
 * Send urgent alert to all configured business phone numbers
 */
export async function sendUrgentAlert(data: {
  customerName: string;
  customerPhone: string;
  serviceType: string;
  location: string;
}): Promise<boolean> {
  const alertNumbers = process.env.ALERT_PHONE_NUMBERS;

  if (!alertNumbers) {
    console.warn("ALERT_PHONE_NUMBERS not configured - skipping urgent alert");
    return false;
  }

  const recipients = alertNumbers
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    return false;
  }

  const message = `URGENT TOW REQUEST
${data.serviceType}
Customer: ${data.customerName}
Phone: ${data.customerPhone}
Location: ${data.location}

Call customer ASAP!`;

  const result = await sendSMSToMultiple(recipients, message);
  return result.sent > 0;
}

/**
 * Check if SMS is configured
 */
export function isSMSConfigured(): boolean {
  return !!(client && twilioPhoneNumber);
}

/**
 * Get configured alert phone numbers
 */
export function getAlertPhoneNumbers(): string[] {
  const alertNumbers = process.env.ALERT_PHONE_NUMBERS;
  if (!alertNumbers) return [];

  return alertNumbers
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);
}
