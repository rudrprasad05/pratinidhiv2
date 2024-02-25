import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserType } from "@/types";
import React from "react";
import AdminsTab from "./AdminsTab";
import SuperAdminsTab from "./SuperAdminsTab";

const UsersTab = ({
  users,
  currentUser,
}: {
  users: UserType[];
  currentUser: UserType;
}) => {
  return (
    <Tabs defaultValue="Admin">
      <TabsList className="grid-cols-2 grid w-full bg-transparent gap-4">
        <TabsTrigger
          value="Admin"
          className="flex rounded-none border-b grow p-0  data-[state=active]:border-b-slate-50"
        >
          <div className="grow w-full pt-6 pb-3">Admin</div>
        </TabsTrigger>
        <TabsTrigger
          value="SuperAdmin"
          className="flex rounded-none border-b grow p-0  data-[state=active]:border-b-slate-50"
        >
          <div className="grow w-full pt-6 pb-3">Super Admin</div>
        </TabsTrigger>
      </TabsList>
      <div className="pt-8">
        <TabsContent value="Admin">
          <AdminsTab
            currentUser={currentUser}
            users={users.filter((i) => i.role == "ADMIN")}
          />
        </TabsContent>
        <TabsContent value="SuperAdmin">
          <AdminsTab
            currentUser={currentUser}
            users={users.filter((i) => i.role == "SUPERADMIN")}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default UsersTab;
