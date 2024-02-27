import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/global/loading";

export const metadata: Metadata = {
  title: "Websites",
  description: "Powered by Proyon",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-full flex">
      <div className="grow">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </main>
  );
}
