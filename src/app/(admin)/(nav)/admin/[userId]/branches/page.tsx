import React from "react";
import NewBranch from "./_components/NewBranch";
import { GetAllAdminUsers } from "@/actions/user";

const page = async () => {
  const adminUser = await GetAllAdminUsers();
  console.log(adminUser);
  const freeAdmins = adminUser.filter((user) => user.branchId === null);
  return (
    <main className="p-12">
      <div className="pb-20">
        <h1 className="text-3xl text-primary font-bold pb-10">Branch Center</h1>
        <div>
          <NewBranch admins={freeAdmins} />
        </div>
      </div>
    </main>
  );
};

export default page;
