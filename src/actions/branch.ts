"use server";

import { NewBranchType } from "@/app/(admin)/(nav)/admin/[userId]/branches/_components/NewBranch";
import prisma from "@/lib/prismadb";

export async function CreateBranch(data: NewBranchType) {
  const res = await prisma.branch.create({
    data: {
      ...data,
    },
  });
  const user = await prisma.user.update({
    where: {
      id: data.leaderId,
    },
    data: {
      branchId: res.id,
    },
  });
  console.log(res);
}
