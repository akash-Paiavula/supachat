import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SupaChat Frontend",
  description: "Conversational analytics frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}