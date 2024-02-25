import DropDownNav from "@/components/navbar/DropDownNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pratinidhi Sabha of Fiji",
  description: "Powered by Procyon",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <DropDownNav />
      <section className="w-full h-full">{children}</section>
    </main>
  );
}
