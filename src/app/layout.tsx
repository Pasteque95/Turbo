import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
    <html lang="nl">
      <body className="flex min-h-screen flex-col bg-zinc-950">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}