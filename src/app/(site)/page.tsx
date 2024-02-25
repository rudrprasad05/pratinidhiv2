"use client";

import { useSession } from "next-auth/react";
import { Hero } from "./_components/Hero";
import DropDownNav from "@/components/navbar/DropDownNav";

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <main>
      <DropDownNav />
      <Hero />
    </main>
  );
}
