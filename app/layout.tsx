import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://parthsarthisaxena.dev"),
  title: {
    default: "Parth Sarthi Saxena — Quant Developer & Software Engineer",
    template: "%s | Parth Sarthi Saxena",
  },
  description:
    "Portfolio of Parth Sarthi Saxena — quantitative developer and software engineer specializing in algorithmic trading systems, statistical modeling, C++, and backend engineering.",
  keywords: [
    "quantitative developer",
    "software engineer",
    "algorithmic trading",
    "C++",
    "Python",
    "backtesting",
    "statistical modeling",
    "DSA",
    "backend engineer",
  ],
  authors: [{ name: "Parth Sarthi Saxena" }],
  creator: "Parth Sarthi Saxena",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parthsarthisaxena.dev",
    siteName: "Parth Sarthi Saxena",
    title: "Parth Sarthi Saxena — Quant Developer & Software Engineer",
    description:
      "Building data-driven systems across quantitative finance, backend engineering, and algorithmic research.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Parth Sarthi Saxena Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Sarthi Saxena — Quant Developer & Software Engineer",
    description:
      "Building data-driven systems across quantitative finance, backend engineering, and algorithmic research.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
