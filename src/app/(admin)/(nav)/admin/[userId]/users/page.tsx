import React from "react";
import SendAdminInvite from "./_components/SendAdminInvite";
import { GetAllAdminUsers, GetUserOnly } from "@/actions/user";
import UsersTab from "./_components/tabs";
import { redirect } from "next/navigation";
import { checkRoleSuperAdmin } from "@/lib/utils";

const page = async () => {
  const allUsers = await GetAllAdminUsers();
  const currentUser = await GetUserOnly();

  if (!currentUser) return redirect("/");
  return (
    <main className="p-12">
      <div className="pb-20">
        <h1 className="text-3xl text-primary font-bold pb-10">Admin Center</h1>
        {checkRoleSuperAdmin(currentUser) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            <SendAdminInvite />
          </div>
        )}
        <div>
          <UsersTab currentUser={currentUser} users={allUsers} />
        </div>
      </div>
    </main>
  );
};

export default page;
