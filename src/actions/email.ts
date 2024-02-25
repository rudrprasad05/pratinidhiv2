"use server";

import { NewAdminType } from "@/app/(admin)/(nav)/admin/[userId]/users/_components/SendAdminInvite";
import { Resend } from "resend";
import prisma from "@/lib/prismadb";
import { VerifyEmailTemplate } from "@/components/email/VerifyEmailTemplate";
import crypto from "crypto";
import { AcceptInviteTemplate } from "@/components/email/AcceptInviteTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: any, options?: any) => {
  const data = await resend.emails.send(payload, options);

  console.log("Email sent successfully");

  return data;
};

export const SendEmailInvite = async (data: NewAdminType) => {
  const { email, role } = data;
  console.log("first");

  const checkIfSent = await prisma.invitation.findUnique({
    where: {
      email,
    },
  });

  const checkIfUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (checkIfSent || checkIfUserExists) throw new Error("Invite already sent");

  const dummyuserId = crypto.randomBytes(12).toString("hex");

  const invite = await prisma.invitation.create({
    data: {
      email,
      role,
      status: "PENDING",
      userId: dummyuserId,
    },
  });

  const inviteToken = crypto.randomBytes(32).toString("base64url");

  const inviteEmail = await sendEmail({
    from: "Admin <onboarding@resend.dev>",
    to: "test-6wtbtp688@srv1.mail-tester.com",
    subject: "Verify your email address",
    react: AcceptInviteTemplate({
      email,
      inviteToken,
    }) as React.ReactElement,
  });
  console.log("first");

  return invite;
};
