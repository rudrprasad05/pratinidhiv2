import { GetAllBranches } from "@/actions/branch";
import { GetAllAdminUsers, GetUserOnly } from "@/actions/user";
import { Card } from "@/components/ui/card";
import { checkRoleSuperAdmin } from "@/lib/utils";
import { MoreVertical, Settings } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import NewBranch from "./_components/NewBranch";
import Link from "next/link";

const page = async () => {
  const adminUser = await GetAllAdminUsers();
  const branches = await GetAllBranches();
  const currentUser = await GetUserOnly();
  const freeAdmins = adminUser.filter((user) => user.branchId === null);

  const DropDownMore = ({ id }: { id: string }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32 ">
          <DropdownMenuGroup>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/admin/${currentUser?.id}/branches/${id}`}>
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  return (
    <main className="p-12">
      <div className="pb-20">
        <h1 className="text-3xl text-primary font-bold pb-10">Branch Center</h1>
        <div>
          <NewBranch admins={freeAdmins} />
        </div>
        <div className="pt-20">
          <h1 className="text-3xl text-primary font-bold pb-10">
            All branches
          </h1>

          {branches.map((branch) => (
            <Card className="h-max" key={branch.id}>
              <div className="p-6 flex gap-6 flex-row items-center">
                <h1 className="text-lg text-secondary-foreground">
                  {branch.branchName}
                </h1>
                <h2 className="my-auto text-muted-foreground text-sm">
                  {branch.email}
                </h2>
                <div className="ml-auto">
                  {checkRoleSuperAdmin(currentUser) && (
                    <DropDownMore id={branch.id} />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
