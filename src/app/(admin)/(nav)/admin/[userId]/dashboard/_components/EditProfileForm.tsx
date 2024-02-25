"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const EditProfileForm = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const { data: user } = useSession();
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: user?.user.name,
      email: user?.user.email,
      password: "",
      reEnterPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.password != data.reEnterPassword) {
      setIsPasswordMatch(false);
      return;
    }
    axios
      .patch(`/api/updateUser/${user?.user.id}`, data)
      .then((res) => {
        if (res.status == 200) toast.success("User Updated Successfully");
      })
      .catch((error) => {
        toast.error("An Error Occured");
        console.log("USER UPDATE - EditProfileForm.tsx", error);
      })
      .finally(() => {
        setLoading(false);
        router.back();
      });
  };

  return (
    <div className="">
      <form action="" onSubmit={handleSubmit(onSubmit)} className="">
        <Input
          // label="Name"
          // register={register}
          id="name"
          required
          // errors={errors}
        />

        <Input
          // label="Email"
          // register={register}
          id="email"
          required
          // errors={errors}
        />
        <Button
          type="button"
          variant={"link"}
          className="p-0"
          onClick={() =>
            setIsChangePassword((prev) => {
              if (prev) return false;
              else return true;
            })
          }
        >
          {!isChangePassword && "Change Password?"}
          {isChangePassword && "Dont Change Password?"}
        </Button>
        {isChangePassword && (
          <>
            <Input
              // label="Password"
              // register={register}
              // type={"password"}
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
          </>
        )}
        <div>
          {!isPasswordMatch && (
            <div className="text-sm italic text-red-500 pb-5">
              Passwords do not match
            </div>
          )}
        </div>

        <DialogPrimitive.Close className="">
          <div className="">
            <Button type="submit">Submit</Button>
          </div>
        </DialogPrimitive.Close>
      </form>
    </div>
  );
};

export default EditProfileForm;
