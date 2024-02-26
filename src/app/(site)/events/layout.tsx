import DropDownNav from "@/components/navbar/DropDownNav";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DropDownNav />
      <div className="flex relative w-4/5 mx-auto gap-24">
        <div className="w-8/12 py-15">
          <div className="">{children}</div>
        </div>
      </div>
    </>
  );
};

export default layout;
