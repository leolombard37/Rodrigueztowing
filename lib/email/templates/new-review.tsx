import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";

interface NewReviewEmailProps {
  name: string;
  city?: string | null;
  rating: number;
  comment: string;
  serviceType?: string | null;
  createdAt: string;
}

export default function NewReviewEmail({
  name,
  city,
  rating,
  comment,
  serviceType,
  createdAt,
}: NewReviewEmailProps) {
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Review Submitted</Heading>
          <Text style={subtitle}>
            A customer has submitted a review that needs approval.
          </Text>

          <Hr style={hr} />

          <Section style={ratingSection}>
            <Text style={starsText}>{stars}</Text>
            <Text style={ratingLabel}>{rating} out of 5 stars</Text>
          </Section>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Reviewer
            </Heading>

            <table style={table}>
              <tbody>
                <tr>
                  <td style={labelCell}>Name:</td>
                  <td style={valueCell}>{name}</td>
                </tr>
                {city && (
                  <tr>
                    <td style={labelCell}>City:</td>
                    <td style={valueCell}>{city}</td>
                  </tr>
                )}
                {serviceType && (
                  <tr>
                    <td style={labelCell}>Service:</td>
                    <td style={valueCell}>{serviceType}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Section>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Review Content
            </Heading>
            <Text style={reviewText}>{comment}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={actionSection}>
            <Text style={actionText}>
              Log in to your admin dashboard to approve or reject this review.
            </Text>
          </Section>

          <Text style={footer}>
            Submitted on{" "}
            {new Date(createdAt).toLocaleString("en-US", {
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

const ratingSection = {
  textAlign: "center" as const,
  padding: "20px",
  backgroundColor: "#fffbeb",
  borderRadius: "8px",
  marginBottom: "24px",
};

const starsText = {
  fontSize: "36px",
  color: "#facc15",
  margin: "0 0 8px",
  letterSpacing: "4px",
};

const ratingLabel = {
  color: "#666666",
  fontSize: "14px",
  margin: 0,
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

const reviewText = {
  color: "#1a1a1a",
  fontSize: "14px",
  backgroundColor: "#f9fafb",
  padding: "16px",
  borderRadius: "6px",
  whiteSpace: "pre-wrap" as const,
  margin: 0,
  lineHeight: "1.6",
  fontStyle: "italic" as const,
};

const actionSection = {
  textAlign: "center" as const,
  padding: "16px",
  backgroundColor: "#f3f4f6",
  borderRadius: "8px",
};

const actionText = {
  color: "#666666",
  fontSize: "14px",
  margin: 0,
};

const footer = {
  color: "#999999",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "24px",
};
