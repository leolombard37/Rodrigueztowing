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

interface CustomerConfirmationEmailProps {
  name: string;
  type: "quote" | "contact";
  phone: string;
}

export default function CustomerConfirmationEmail({
  name,
  type,
  phone,
}: CustomerConfirmationEmailProps) {
  const isQuote = type === "quote";

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Text style={logoText}>Rodriguez Towing</Text>
          </Section>

          <Heading style={h1}>
            {isQuote ? "Quote Request Received!" : "Message Received!"}
          </Heading>

          <Text style={greeting}>Hi {name},</Text>

          <Text style={paragraph}>
            Thank you for reaching out to Rodriguez Towing. We have received
            your {isQuote ? "quote request" : "message"} and will get back to
            you as soon as possible.
          </Text>

          {isQuote && (
            <Text style={paragraph}>
              One of our team members will review your request and contact you
              shortly with pricing information.
            </Text>
          )}

          <Hr style={hr} />

          <Section style={urgentSection}>
            <Heading as="h2" style={h2}>
              Need Immediate Assistance?
            </Heading>
            <Text style={urgentText}>
              If this is an emergency or you need immediate towing service,
              please call us directly:
            </Text>
            <Link href={`tel:${phone}`} style={phoneButton}>
              {phone}
            </Link>
            <Text style={availabilityText}>Available 24/7</Text>
          </Section>

          <Hr style={hr} />

          <Section style={servicesSection}>
            <Text style={servicesTitle}>Our Services:</Text>
            <Text style={servicesList}>
              Light Duty Towing | Heavy Duty Towing | Roadside Assistance |
              Impound Services
            </Text>
          </Section>

          <Text style={footer}>
            Rodriguez Towing
            <br />
            Serving Kentucky - I-75 & I-65 Corridors
            <br />
            English / Espanol
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

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const logoText = {
  fontSize: "24px",
  fontWeight: "bold" as const,
  color: "#FFA500",
  margin: 0,
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "28px",
  fontWeight: "bold" as const,
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const h2 = {
  color: "#1a1a1a",
  fontSize: "18px",
  fontWeight: "600" as const,
  margin: "0 0 12px",
  textAlign: "center" as const,
};

const greeting = {
  color: "#1a1a1a",
  fontSize: "16px",
  margin: "0 0 16px",
};

const paragraph = {
  color: "#666666",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "32px 0",
};

const urgentSection = {
  textAlign: "center" as const,
  padding: "24px",
  backgroundColor: "#1a1a1a",
  borderRadius: "8px",
};

const urgentText = {
  color: "#cccccc",
  fontSize: "14px",
  margin: "0 0 16px",
};

const phoneButton = {
  backgroundColor: "#FFA500",
  color: "#000000",
  fontWeight: "bold" as const,
  fontSize: "20px",
  padding: "16px 32px",
  borderRadius: "8px",
  textDecoration: "none",
  display: "inline-block",
};

const availabilityText = {
  color: "#FFA500",
  fontSize: "14px",
  fontWeight: "600" as const,
  margin: "12px 0 0",
};

const servicesSection = {
  textAlign: "center" as const,
};

const servicesTitle = {
  color: "#666666",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0 0 8px",
};

const servicesList = {
  color: "#1a1a1a",
  fontSize: "14px",
  margin: 0,
};

const footer = {
  color: "#999999",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "32px",
  lineHeight: "1.6",
};
