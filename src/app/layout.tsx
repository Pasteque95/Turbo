import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}