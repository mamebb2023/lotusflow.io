import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LotusFlow | Craft, then just Copy & Paste",
  description:
    "LotusFlow is the AI-powered component builder that empowers developers to design, generate and deploy single UI components effortlessly. With natural-language prompts you can instantly create clean, production-ready components, customize styling, preview changes live and export directly to Next.js or Vite projects. Whether you’re exploring templates in the free plan or scaling to full team workflows, LotusFlow keeps you in full control—build faster, better and beautifully.",
  keywords: [
    "ai",
    "AI component builder",
    "UI component generation",
    "Single component design",
    "Natural-language UI prompts",
    "Production-ready UI code",
    "Build UI faster",
  ],
  creator: "Team - Mohammednur",
  publisher: "Team - Mohammednur",
  category: "ai, productivity, tools",
  applicationName: "LotusFlow",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "LoutsFlow | AI Component Generator",
    description:
      "LotusFlow is the AI-powered component builder that empowers developers to design, generate and deploy single UI components effortlessly. ",
    creator: "@mohammednur2025",
    site: "@mohammednur2025",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "LoutsFlow | AI Component Generator",
      },
    ],
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "any" }],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.className} antialiased bg-black text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
