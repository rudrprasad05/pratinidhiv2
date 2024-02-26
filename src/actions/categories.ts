import prisma from "@/lib/prismadb";

export async function getCategories() {
  try {
    const category = prisma.category.findMany();

    if (!category) return null;

    return category;
  } catch (error) {
    console.log(error);
  }
}
