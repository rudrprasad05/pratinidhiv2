import { signOut } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

export async function SignOutContext() {
  try {
    signOut().then(() => {
      toast.success("Signed Out");
    });
  } catch (error) {
    console.log("SIGNOUT", error);
  }
}
