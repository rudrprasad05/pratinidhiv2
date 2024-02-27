import AdminCommand from "@/components/global/AdminCommand";
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
  return (
    <main className="relative h-full">
      <div className="grow">{children}</div>
    </main>
  );
}
