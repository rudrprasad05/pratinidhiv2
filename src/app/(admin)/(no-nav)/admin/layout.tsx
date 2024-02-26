import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Pratinidhi Sabha",
  description: "Developed & Powered by Procyon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grow h-screen">{children}</div>;
}
