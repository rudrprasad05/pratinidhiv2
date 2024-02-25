"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import EditProfileSheet from "../global/EditProfileSheet";
import AvatarComponent from "../global/AvatarComponent";
import clsx from "clsx";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <>
      {!session?.user ? (
        <Link
          className={clsx(
            "rounded-full",
            buttonVariants({ variant: "default" })
          )}
          href={"/auth"}
        >
          Login
        </Link>
      ) : (
        <div className="mt-auto flex items-end">
          <EditProfileSheet user={session?.user}>
            <AvatarComponent
              fallback={session.user.name?.slice(0, 2).toUpperCase() || "AD"}
              src={session?.user?.image}
            />
          </EditProfileSheet>
        </div>
      )}
    </>
  );
}
