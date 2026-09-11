import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://niyogdisha-frontend.onrender.com"),
  title: {
    default: "NiyogDisha — Latest Government Jobs, Admit Cards & Results",
    template: "%s | NiyogDisha",
  },
  description:
    "Verified Central and State government recruitment notifications, exam dates, syllabus, admit cards, answer keys, and results from official sources.",
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
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-brand-text antialiased`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
