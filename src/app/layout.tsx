import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TabVisibilityAnimator from "@/components/TabVisibilityAnimator";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sachin Kumar | Portfolio",
  description: "Sachin Kumar is a Creative Developer & Full-Stack Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TabVisibilityAnimator />
        {children}
      </body>
    </html>
  );
}
