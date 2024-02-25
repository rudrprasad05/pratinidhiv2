"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import Link from "next/link";
import AuthButton from "./authButton";
import { NavLinks } from "./navLinks";

export const NavBar = () => {
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  useEffect(() => {
    setDomLoaded(true);
  }, [domLoaded]);
  const { data: user } = useSession();

  return (
    <>
      <nav className="absolute top-0 left-0 z-50 bg-background/50 w-screen">
        <main className="flex items-center justify-between  mx-auto py-10 w-4/5">
          <div className="opacity-80">
            <Image src={"/logo.png"} alt="Om Logo" height={40} width={40} />
          </div>
          <div className="flex gap-10">
            <NavLinks />
            {user?.user.role == "admin" && <Link href={"/admin"}>Admin</Link>}
          </div>

          <div>
            <AuthButton />
          </div>
        </main>
      </nav>
    </>
  );
};
