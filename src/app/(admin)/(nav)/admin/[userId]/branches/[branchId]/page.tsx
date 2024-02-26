import { GetBranchById } from "@/actions/branch";
import { PageSearchProps } from "@/types";
import React from "react";
import BranchPage from "./_components/BranchPage";

const page = async ({ params }: PageSearchProps) => {
  const branch = await GetBranchById(params.branchId || "");
  console.log(branch);
  return <BranchPage branch={branch} />;
};

export default page;
