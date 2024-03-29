import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { string } from "zod";
import { Role } from "@prisma/client";
import { RegisterFormType } from "@/app/(auth)/auth/register/_components/RegisterForm";

export async function POST(request: Request) {
  const body: RegisterFormType = await request.json();
  const { email, name, password, role } = body;

  if (!email || !name || !password) {
    return new NextResponse("Missing Info", { status: 400 });
  }

  const isEmailUsed = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isEmailUsed)
    return new NextResponse("Email already in use", { status: 401 });

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      name,
      role: role as Role,
    },
  });

  return NextResponse.json(user);
}
