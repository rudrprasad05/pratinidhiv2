import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface props {
  name?: string;
  description?: string;
  onClick?: () => void;
}

const SignoutPopup: React.FC<props> = ({ name, description, onClick }) => {
  return (
    <Dialog>
      <DialogTrigger className="bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center rounded-md px-2 py-1">
        {name}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex gap-5">
              <Button type="button" variant={"secondary"}>
                Close
              </Button>
              <Button type="button" variant={"destructive"} onClick={onClick}>
                SignOut
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignoutPopup;
