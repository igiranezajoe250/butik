import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Butik",
    template: "%s | Butik",
  },
  description:
    "The future of commerce. Connecting you to Rwanda's finest boutiques through conversation.",
  metadataBase: new URL("https://butik.rw"),
  openGraph: {
    title: "Butik",
    description: "The future of commerce.",
    type: "website",
    locale: "en_US",
    siteName: "Butik",
  },
  twitter: {
    card: "summary_large_image",
    title: "Butik",
    description: "The future of commerce.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
