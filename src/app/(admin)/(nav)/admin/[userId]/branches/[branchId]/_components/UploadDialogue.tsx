"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BranchType } from "@/types";
import { toast } from "sonner";
import { UpdateProfilePic } from "@/actions/branch";
import { useRouter } from "next/navigation";

const UploadDialogue = ({
  branch,
  children,
}: {
  branch: BranchType;
  children: React.ReactNode;
}) => {
  console.log(branch);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageInCloud, setIsImageInCloud] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleImageUpload = async (file: File) => {
    const salt = Date.now();
    setImageUpload(true);
    if (!file) return;

    try {
      let data = new FormData();
      data.append(
        "file",
        file,
        "branchImage" + salt.toString() + "_" + branch.id
      );

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: data,
      })
        .then(async () => {
          setImageUpload(false);
          setImageUrl(
            `https://mctechfiji.s3.amazonaws.com/pratinidhi/${
              "branchImage" + salt.toString() + "_" + branch.id
            }`
          );
          await UpdateProfilePic(
            `https://mctechfiji.s3.amazonaws.com/pratinidhi/${
              "branchImage" + salt.toString() + "_" + branch.id
            }`,
            branch.id
          );
          setIsImageInCloud(true);
          toast("Image Uploaded to Cloud");
          router.refresh();
          setOpen(false);
        })
        .catch((e) => {
          toast("Something went wrong", { description: "Contact site admin" });
        });
      // handle the error
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  const handleUpdateDatabase = async () => {
    await UpdateProfilePic(imageUrl, branch.id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-[720px]">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>

        <div className="flex gap-3 my-6 items-center">
          <label
            htmlFor="file"
            className={cn(
              "cursor-pointer",
              imageUpload && "opacity-50 cursor-not-allowed"
            )}
          >
            <div
              className={cn(
                "items-center rounded-md p-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 flex gap-3",
                isImageInCloud && "opacity-50 cursor-not-allowed"
              )}
            >
              <Upload />
              <h2 className="text-sm">Upload Image</h2>
            </div>
            <input
              id="file"
              type="file"
              name="file"
              disabled={isImageInCloud}
              hidden
              onChange={(e) => {
                handleImageUpload(e.target.files?.[0] as File);
              }}
            />
          </label>

          {imageUpload && (
            <div>
              <Loader2 className="animate-spin" />
            </div>
          )}

          {isImageInCloud && (
            <div className="flex gap-2">
              <div className="relative aspect-square h-[50px]">
                <Image
                  className="rounded-md h-full object-cover"
                  src={imageUrl}
                  alt="image"
                  width={50}
                  height={50}
                />
                <button
                  onClick={() => setImageUrl("")}
                  className="p-[4px] absolute top-[-10px] right-[-10px] bg-rose-500 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialogue;
