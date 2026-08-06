import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Turbo",
  description:
    "Turbo is een digitaal logboek voor oefentrajecten van het praktijkexamen rijbewijs B.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={poppins.variable}>
      <body className="flex min-h-screen flex-col bg-zinc-950 font-sans">
        <Header />

        <main className="flex flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}