"use server";

import { RegisterFormType } from "@/app/(auth)/auth/register/_components/RegisterForm";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import crypto from "crypto";
import { redirect } from "next/navigation";

import getSession from "./getSession";
import { sendEmail } from "./email";
import { VerifyEmailTemplate } from "@/components/email/VerifyEmailTemplate";

export const GetUserOnly = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};

export async function RegisterUser(request: RegisterFormType) {
  const body: RegisterFormType = request;
  const { email, name, password, role } = body;

  if (!email || !name || !password) {
    throw new Error("Details missing");
  }

  const isEmailUsed = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isEmailUsed) {
    throw new Error("email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      name,
      role: role as Role,
    },
  });

  const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

  await prisma.user.update({
    where: {
      id: createdUser.id,
    },
    data: {
      emailVerificationToken: emailVerificationToken,
    },
  });

  await sendEmail({
    from: "Admin <onboarding@resend.dev>",
    to: [email],
    subject: "Verify your email address",
    react: VerifyEmailTemplate({
      email,
      emailVerificationToken,
    }) as React.ReactElement,
  });

  return createdUser;
}

export const VerifyEmail = async (token: string) => {
  const temp = new Date();
  const today = new Date(temp.setDate(temp.getDate()));

  try {
    const user = await prisma.user.update({
      where: {
        emailVerificationToken: token,
      },
      data: {
        emailVerified: today,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }

  console.log("user");
};

export async function GetAllAdminUsers() {
  const res = prisma.user.findMany({
    where: {
      NOT: [
        {
          role: "USER",
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res;
}
