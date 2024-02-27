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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

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
      {/* tabs */}
      <Tabs defaultValue="Contact">
        <TabsList className="flex justify-start bg-transparent gap-4">
          <TabsTrigger
            value="Contact"
            className="flex rounded-none border-b  p-0  data-[state=active]:border-b-slate-50"
          >
            <div className="pt-6 pb-3">Contact</div>
          </TabsTrigger>
          <TabsTrigger
            value="Posts"
            className="flex rounded-none border-b  p-0  data-[state=active]:border-b-slate-50"
          >
            <div className=" pt-6 pb-3">Posts</div>
          </TabsTrigger>
        </TabsList>
        <div className="pt-8">
          <TabsContent value="Contact">
            <Contact branch={branch} />
          </TabsContent>
          <TabsContent value="Posts">post</TabsContent>
        </div>
      </Tabs>
    </main>
  );
};

const Contact = ({ branch }: { branch: BranchType }) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <Label>Email: </Label>
        <h2 className="text-muted-foreground text-sm">{branch.email}</h2>
      </div>
      <div className="flex gap-2 items-center">
        <Label>Mobile: </Label>
        <h2 className="text-muted-foreground text-sm">{branch.phone}</h2>
      </div>
      <div className="flex gap-2 items-center">
        <Label>Email: </Label>
        <h2 className="text-muted-foreground text-sm">{branch.}</h2>
      </div>
    </>
  );
};

export default BranchPage;
