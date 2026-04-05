import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout";

export const metadata: Metadata = {
  title: "Freedom Mobile",
  description: "Freedom Mobile - Wireless for the people",
  icons: {
    icon: "/logos/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
