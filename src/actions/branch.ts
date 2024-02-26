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

export async function GetAllBranches() {
  return await prisma.branch.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetBranchById(id: string) {
  const res = await prisma.branch.findUnique({
    where: {
      id,
    },
  });
  if (!res) throw new Error("Invalid Link");
  return res;
}

export async function UpdateBanner(fileName: string, id: string) {
  const res = await prisma.branch.update({
    where: {
      id,
    },
    data: {
      banner: fileName,
    },
  });
  return res;
}

export async function UpdateProfilePic(fileName: string, id: string) {
  const res = await prisma.branch.update({
    where: {
      id,
    },
    data: {
      profilePic: fileName,
    },
  });
  return res;
}
