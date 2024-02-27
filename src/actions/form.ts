"use server";

import { CreatePostSchema, CreatePostSchemaType } from "@/schemas/form";
import prisma from "@/lib/prismadb";
import { GetUserOnly } from "./user";
import { revalidatePath } from "next/cache";

class UserNotFoundErr extends Error {}

export async function GetFormStats() {
  const user = await GetUserOnly();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const stats = await prisma.post.aggregate({
    where: {
      authorId: user.id,
    },
    _sum: {
      visits: true,
    },
  });
  const visits = stats._sum.visits || 0;

  return {
    visits,
  };
}

export async function CreateForm(data: any) {
  const validation = CreatePostSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }

  const user = await GetUserOnly();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const { name, description, category } = data;

  const form = await prisma.post.create({
    data: {
      authorId: user.id,
      name,
      description,
      tags: category,
    },
  });

  if (!form) {
    throw new Error("something went wrong");
  }

  return form.id;
}

export async function GetForms() {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: true,
    },
  });
}

export async function GetFormById(id: string) {
  await prisma.post.update({
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      id: id,
    },
  });

  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      comments: {
        include: { user: true },
        orderBy: {
          createdAt: "desc",
        },
      },
      author: true,
    },
  });
}

export async function UpdateFormContent(id: string, jsonContent: string) {
  const user = await GetUserOnly();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.post.update({
    where: {
      authorId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: string) {
  const user = await GetUserOnly();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.post.update({
    data: {
      published: true,
    },
    where: {
      authorId: user.id,
      id,
    },
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await prisma.post.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareURL: formUrl,
    },
  });
}

export async function DeleteForm(id: string) {
  return await prisma.post.delete({
    where: {
      id: id,
    },
  });
}

export async function SubmitForm(formUrl: string, content: string) {
  return await prisma.post.update({
    data: {},
    where: {
      shareURL: formUrl,
      published: true,
    },
  });
}

export async function GetFormWithSubmissions(id: string) {
  const user = await GetUserOnly();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.post.findUnique({
    where: {
      authorId: user.id,
      id,
    },
  });
}

export const GetAllFormsPagination = async ({
  take,
  skip,
  search,
}: {
  take: any;
  skip: any;
  search?: string;
}) => {
  "use server";

  const results = await prisma.post.findMany({
    take,
    skip,
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        // {
        //   tag: {
        //     name: {
        //       contains: search,
        //       mode: "insensitive",
        //     },
        //   },
        // },
      ],
    },

    orderBy: {
      createdAt: "asc",
    },
  });

  // const results = await prisma.product.findMany({
  //   take,
  //   skip,
  //   where: {
  //     name: {
  //       startsWith: search,
  //     },
  //   },
  //   orderBy: {
  //     createdAt: "asc",
  //   },
  //   include: {
  //     tag: true,
  //   },
  // });

  const total = await prisma.post.count();

  revalidatePath("/");

  return {
    data: results,
    metadata: {
      hasNextPage: skip + take < total,
      totalPages: Math.ceil(total / take),
    },
  };
};
