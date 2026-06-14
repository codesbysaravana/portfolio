import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader, Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/lib/scroll/smooth-scroll-provider";
import { GSAPProvider } from "@/lib/motion/gsap-provider";
import { ProgressBar } from "@/components/layout/progress-bar";
import { NavFloat } from "@/components/layout/nav-float";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A premium personal portfolio — crafted with intention.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Portfolio",
    description: "A premium personal portfolio — crafted with intention.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="grain">
        {/* Skip link for accessibility */}
        <a href="#identity" className="skip-link">
          Skip to content
        </a>

        <GSAPProvider>
          <SmoothScrollProvider>
            <ProgressBar />
            <NavFloat />
            {children}
          </SmoothScrollProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
