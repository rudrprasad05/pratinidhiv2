"use client";

// import NewCategoryForm from "@/components/NewCategoryForm";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Box } from "lucide-react";

function CreateCategoryButton() {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative bg-muted p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Category</div>
          <div className="absolute bottom-5 right-5">
            <Box className="group-hover:h-28 group-hover:w-28  duration-200  w-16 h-16 stroke group-hover:stroke-primary stroke-muted-foreground" />

            {/* <BsFileEarmarkPlus className="group-hover:fill-primary w-16 h-16 stroke fill-muted-foreground" /> */}
          </div>
          <div className=" text-muted-foreground">New</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Create a new category to organise your posts
          </DialogDescription>
        </DialogHeader>
        {/* <NewCategoryForm /> */}
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryButton;
