import { GetUserOnly } from "@/actions/user";
import { UserType } from "@/types";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { use } from "react";
import { toast } from "sonner";

const NavPage = async () => {
  const user = await GetUserOnly();
  console.log("first");
  console.log(user);
  if (!user) redirect("/");
  console.log("first");
  if (user.role == "USER") redirect("/");

  return redirect(`/admin/${user.id}/dashboard`);
};

export default NavPage;
