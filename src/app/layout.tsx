import type { Metadata } from "next";
import "./globals.css";
import { CampaignProvider } from "@/contexts/CampaignContext";

export const metadata: Metadata = {
  title: "IndieFauxFaux - The Crowdfunding Parody",
  description: "A crowdfunding platform for creative projects, comedy sketches, and film production. No actual payments - just pure entertainment!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CampaignProvider>
          {children}
        </CampaignProvider>
      </body>
    </html>
  );
}
