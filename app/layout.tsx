import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  generateLocalBusinessSchema,
  generateEmergencyServiceSchema,
} from "@/utils/json-ld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rodriguez Towing | 24/7 Emergency Towing in Kentucky",
  description:
    "Fast, reliable 24/7 towing services across Kentucky. Light duty, heavy duty, roadside assistance, and impound services. Serving Lexington, Louisville, Bowling Green, and I-75/I-65 corridors.",
  keywords: [
    "towing service Kentucky",
    "24/7 towing",
    "emergency towing",
    "Lexington towing",
    "Louisville towing",
    "heavy duty towing",
    "roadside assistance Kentucky",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const emergencyServiceSchema = generateEmergencyServiceSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(emergencyServiceSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
