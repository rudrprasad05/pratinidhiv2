import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  return redirect("/auth/login");
};

export default page;
