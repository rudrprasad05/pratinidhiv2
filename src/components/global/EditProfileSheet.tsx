import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeSwitcher from "@/theme/ThemeSwitcher";
import { User } from "@prisma/client";

import React from "react";
import SignoutPopup from "./SignoutPopup";
import { SignOutContext } from "@/actions/signOut";

interface props {
  children?: React.ReactNode;
  user?: any;
}

const EditProfileSheet: React.FC<props> = ({ children, user }) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            Welcome back {user && user.name.split(" ")[0]}
          </SheetTitle>
        </SheetHeader>
        <SheetFooter className="mt-auto w-full">
          <div className="flex justify-between w-full">
            <ThemeSwitcher />
            <SignoutPopup name="SignOut" onClick={() => SignOutContext()} />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfileSheet;
