"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { BranchType } from "@/types";
import { Edit } from "lucide-react";
import Image from "next/image";

import React, { useState } from "react";
import { toast } from "sonner";
import UploadDialogue from "./UploadDialogue";
import UploadBannerDialogue from "./UploadBannerDialogue";

const BranchPage = ({ branch }: { branch: BranchType }) => {
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageInCloud, setIsImageInCloud] = useState(false);

  return (
    <main className="p-12">
      <div>
        <div className="relative w-full h-96">
          <Image
            src={
              branch.banner ||
              "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="preview image"
            fill
            className="object-cover rounded-lg"
          />
          <UploadBannerDialogue branch={branch}>
            <Button variant={"secondary"} className="absolute top-0 right-0">
              <Edit />
            </Button>
          </UploadBannerDialogue>
        </div>
        <div className="px-8 flex items-center gap-8">
          <div className="relative h-24 w-32">
            <div className="absolute border rounded-full bottom-0 w-32 h-32 aspect-square">
              <Image
                src={
                  branch.profilePic ||
                  "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="preview image"
                fill
                className=" aspect-square object-cover rounded-full"
              />
              <UploadDialogue branch={branch}>
                <Button
                  variant={"secondary"}
                  className="px-0 py-0 h-fit absolute top-0 right-0"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </UploadDialogue>
            </div>
          </div>
          <div>
            <h1 className="text-2xl">{branch.branchName}</h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BranchPage;
