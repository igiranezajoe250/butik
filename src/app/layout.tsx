import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Butik",
    template: "%s | Butik",
  },
  description:
    "The rebirth of commerce in Africa.",
  metadataBase: new URL("https://butik.rw"),
  openGraph: {
    title: "Butik",
    description: "The rebirth of commerce in Africa.",
    type: "website",
    locale: "en_US",
    siteName: "Butik",
  },
  twitter: {
    card: "summary_large_image",
    title: "Butik",
    description: "The rebirth of commerce in Africa.",
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
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>{children}</body>
    </html>
  );
}
