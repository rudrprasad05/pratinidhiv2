import React from "react";
import { UserType } from "@/types";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AvatarComponent from "@/components/global/AvatarComponent";
import { ActivityIcon, MoreVertical } from "lucide-react";
import { checkRoleSuperAdmin } from "@/lib/utils";

const AdminsTab = ({
  users,
  currentUser,
}: {
  users: UserType[];
  currentUser: UserType;
}) => {
  return (
    <div>
      {users.map((user) => (
        <Card className="h-max" key={user.id}>
          <div className="p-6 flex gap-6 flex-row items-center">
            <AvatarComponent
              fallback={user.name?.slice(0, 2).toUpperCase() || "AD"}
              src={user?.image}
            />
            <h1 className="text-lg text-secondary-foreground">{user.name}</h1>
            <h2 className="my-auto text-muted-foreground text-sm">
              {user.email}
            </h2>
            {checkRoleSuperAdmin(currentUser) && (
              <div className="ml-auto">
                <MoreVertical />
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdminsTab;
