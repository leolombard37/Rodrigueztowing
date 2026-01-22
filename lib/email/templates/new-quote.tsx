import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
} from "@react-email/components";

interface NewQuoteEmailProps {
  name: string;
  phone: string;
  email?: string | null;
  serviceType: string;
  vehicleInfo: string;
  pickupLocation: string;
  dropoffLocation?: string | null;
  notes?: string | null;
  createdAt: string;
  isUrgent?: boolean;
}

export default function NewQuoteEmail({
  name,
  phone,
  email,
  serviceType,
  vehicleInfo,
  pickupLocation,
  dropoffLocation,
  notes,
  createdAt,
  isUrgent,
}: NewQuoteEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {isUrgent && (
            <Section style={urgentBanner}>
              <Text style={urgentText}>URGENT - ROADSIDE ASSISTANCE</Text>
            </Section>
          )}

          <Heading style={h1}>New Quote Request</Heading>
          <Text style={subtitle}>
            A customer has submitted a quote request through the website.
          </Text>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Customer Information
            </Heading>

            <table style={table}>
              <tbody>
                <tr>
                  <td style={labelCell}>Name:</td>
                  <td style={valueCell}>{name}</td>
                </tr>
                <tr>
                  <td style={labelCell}>Phone:</td>
                  <td style={phoneCellStyle}>
                    <Link href={`tel:${phone}`} style={phoneLink}>
                      {phone}
                    </Link>
                  </td>
                </tr>
                {email && (
                  <tr>
                    <td style={labelCell}>Email:</td>
                    <td style={valueCell}>
                      <Link href={`mailto:${email}`}>{email}</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Section>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Service Details
            </Heading>

            <table style={table}>
              <tbody>
                <tr>
                  <td style={labelCell}>Service:</td>
                  <td style={valueCell}>{serviceType}</td>
                </tr>
                <tr>
                  <td style={labelCell}>Vehicle:</td>
                  <td style={valueCell}>{vehicleInfo}</td>
                </tr>
                <tr>
                  <td style={labelCell}>Pickup:</td>
                  <td style={valueCell}>{pickupLocation}</td>
                </tr>
                {dropoffLocation && (
                  <tr>
                    <td style={labelCell}>Drop-off:</td>
                    <td style={valueCell}>{dropoffLocation}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Section>

          {notes && (
            <Section style={section}>
              <Heading as="h2" style={h2}>
                Additional Notes
              </Heading>
              <Text style={notesText}>{notes}</Text>
            </Section>
          )}

          <Hr style={hr} />

          <Section style={ctaSection}>
            <Link href={`tel:${phone}`} style={ctaButton}>
              Call Customer Now
            </Link>
          </Section>

          <Text style={footer}>
            Submitted on {new Date(createdAt).toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
  borderRadius: "8px",
};

const urgentBanner = {
  backgroundColor: "#dc2626",
  padding: "12px",
  borderRadius: "6px",
  marginBottom: "20px",
};

const urgentText = {
  color: "#ffffff",
  fontWeight: "bold" as const,
  fontSize: "16px",
  textAlign: "center" as const,
  margin: 0,
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "28px",
  fontWeight: "bold" as const,
  margin: "0 0 8px",
};

const subtitle = {
  color: "#666666",
  fontSize: "16px",
  margin: "0 0 24px",
};

const h2 = {
  color: "#FFA500",
  fontSize: "18px",
  fontWeight: "600" as const,
  margin: "0 0 12px",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "24px 0",
};

const section = {
  marginBottom: "24px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const labelCell = {
  color: "#666666",
  fontSize: "14px",
  fontWeight: "600" as const,
  padding: "8px 16px 8px 0",
  width: "100px",
  verticalAlign: "top" as const,
};

const valueCell = {
  color: "#1a1a1a",
  fontSize: "14px",
  padding: "8px 0",
};

const phoneCellStyle = {
  ...valueCell,
  fontSize: "18px",
  fontWeight: "bold" as const,
};

const phoneLink = {
  color: "#FFA500",
  textDecoration: "none",
};

const notesText = {
  color: "#1a1a1a",
  fontSize: "14px",
  backgroundColor: "#f9fafb",
  padding: "16px",
  borderRadius: "6px",
  whiteSpace: "pre-wrap" as const,
  margin: 0,
};

const ctaSection = {
  textAlign: "center" as const,
  marginTop: "24px",
};

const ctaButton = {
  backgroundColor: "#FFA500",
  color: "#000000",
  fontWeight: "bold" as const,
  fontSize: "16px",
  padding: "14px 32px",
  borderRadius: "8px",
  textDecoration: "none",
  display: "inline-block",
};

const footer = {
  color: "#999999",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "24px",
};
