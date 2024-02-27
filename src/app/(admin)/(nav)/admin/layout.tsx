import { GetUserOnly } from "@/actions/user";
import SideNavServerCont from "@/components/navbar/SideNavServerCont";
import { UserType } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await GetUserOnly();
  if (!user) redirect("/");
  if (user.role == "USER") redirect("/");
  return (
    <main className="flex">
      <aside>
        <SideNavServerCont />
      </aside>
      <div className="w-full grow h-full">{children}</div>
    </main>
  );
};

export default layout;
