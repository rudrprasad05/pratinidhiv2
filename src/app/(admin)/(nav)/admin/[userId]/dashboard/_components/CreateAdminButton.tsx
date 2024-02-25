"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Box } from "lucide-react";
import { Input } from "@/components/ui/input";

interface props {
  user?: User;
}

const CreateAdminButton: React.FC<props> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      reEnterPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.role = "admin";
    if (data.password != data.reEnterPassword) {
      setIsPasswordMatch(false);
      return;
    }
    axios
      .post(`/api/register`, data)
      .then((res) => {
        if (res.status == 200) toast.success("Admin Created Successfully");
      })
      .catch((error) => {
        toast.error("An Error Occured");
        console.log("USER NEW - NewProfileForm.tsx", error);
      })
      .finally(() => {
        setLoading(false);
        router.refresh();
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative bg-muted p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Admin</div>
          <div className="absolute bottom-5 right-5">
            <Box className="group-hover:h-28 group-hover:w-28  duration-200  w-16 h-16 stroke group-hover:stroke-primary stroke-muted-foreground" />

            {/* <IoPersonAddOutline className="group-hover:stroke-primary w-16 h-16 stroke stroke-muted-foreground" /> */}
          </div>
          <div className=" text-muted-foreground">New</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Admin User</DialogTitle>
          <DialogDescription>Create New User</DialogDescription>
        </DialogHeader>
        <div className="">
          <form action="" onSubmit={handleSubmit(onSubmit)} className="">
            <Input
              // label="Name"
              // register={register}
              id="name"
              required
              autoComplete={"off"}
              // errors={errors}
            />

            <Input
              // label="Email"
              // register={register}
              id="email"
              required
              autoComplete={"off"}
              // errors={errors}
            />
            <Input
              // label="Password"
              // register={register}
              type={"password"}
              id="password"
              required
              // errors={errors}
            />

            <Input
              // label="Re-enter Password"
              // register={register}
              type={"password"}
              id="reEnterPassword"
              required
              // errors={errors}
            />
            {!isPasswordMatch && (
              <div className="text-sm italic text-red-500 pb-5">
                Passwords do not match
              </div>
            )}
            <div className="">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdminButton;
