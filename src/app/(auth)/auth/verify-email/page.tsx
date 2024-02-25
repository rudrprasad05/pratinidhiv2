import { PageSearchProps } from "@/types";
import React from "react";
import VerifyEmailGeneric from "./_components/VerifyEmailGeneric";
import VerifyEmailForm from "./_components/VerifyEmailForm";

export default async function page({ searchParams }: PageSearchProps) {
  if (searchParams?.token == undefined) return <VerifyEmailGeneric />;
  return <VerifyEmailForm token={searchParams.token} />;
}
