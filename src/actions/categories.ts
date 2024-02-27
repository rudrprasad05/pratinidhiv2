"use server";

import { NewCategoryType } from "@/components/forms/NewCategoryForm";
import prisma from "@/lib/prismadb";

export async function getCategories() {
  try {
    const category = await prisma.category.findMany();

    if (!category) return null;

    return category;
  } catch (error) {
    console.log(error);
  }
}

export async function CreateCategory(data: NewCategoryType) {
  console.log("first");
  const res = await prisma.category.create({
    data: {
      name: data.name,
      authorID: data.authorID as string,
      authorName: data.authorName,
    },
  });

  return res;
}
