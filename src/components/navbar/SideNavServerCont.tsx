import React from "react";
import SideNav from "./SideBar";
import { GetUserOnly } from "@/actions/user";

const SideNavServerCont = async () => {
  const user = await GetUserOnly();
  // if (user?.seller == nuclgll) return <RedirectToSellerAuth />;

  return <SideNav user={user} />;
};

export default SideNavServerCont;
