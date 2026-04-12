import Footer from "../components/Footer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HSD BEUN | Huawei Student Developers",
  description: "Zonguldak Bülent Ecevit Üniversitesi HSD Topluluğu resmi web sitesi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased bg-black text-white">
        <Navbar />
        {children} {/* Sadece BİR TANE olmalı */}
        <Footer />
      </body>
    </html>
  );
}
