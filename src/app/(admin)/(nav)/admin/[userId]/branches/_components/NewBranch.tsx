"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as crypto from "crypto";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, KeyRound, Loader2, Upload, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SendEmailInvite } from "@/actions/email";
import { RegisterUser } from "@/actions/user";
import { UserType } from "@/types";
import { CreateBranch } from "@/actions/branch";

const NewWebsiteForm = z.object({
  branchName: z
    .string()
    .min(1, { message: "more then 2 characters" })
    .max(32, { message: "less then 32 characters" }),
  // members: z.string().array(),
  leaderId: z.string(),
  phone: z
    .string()
    .min(1, { message: "more then 2 characters" })
    .max(32, { message: "less then 32 characters" }),
  email: z.string().email(),
});

export type NewBranchType = z.infer<typeof NewWebsiteForm>;

const NewBranch = ({ admins }: { admins: UserType[] }) => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  const form = useForm<NewBranchType>({
    resolver: zodResolver(NewWebsiteForm),
    defaultValues: {
      branchName: "",
      email: "",
      leaderId: "",
      phone: "",
    },
  });

  async function onSubmit(data: NewBranchType) {
    console.log(data);
    const res = await CreateBranch(data)
      .then((response) => {
        console.log(response);
        setOpen(false);
        toast("Branch added");
        router.refresh();
      })
      .catch((err: Error) => {
        console.log(err);
        toast(err.message);
        setOpen(false);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative bg-muted p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Branch</div>
          <div className="absolute bottom-5 right-5">
            <Box className="group-hover:h-28 group-hover:w-28  duration-200  w-16 h-16 stroke group-hover:stroke-primary stroke-muted-foreground" />
          </div>
          <div className=" text-muted-foreground">Create a new branch</div>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-[720px]">
        <DialogHeader>
          <DialogTitle>New branch</DialogTitle>
          <DialogDescription>Create a new branch</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <FormField
              control={form.control}
              name="branchName"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Branch Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter branch Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter contact email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter mobile number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leaderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Head officer</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a branch officer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {admins?.map((admin) => (
                        <SelectItem key={admin.id} value={admin.id}>
                          {admin.name.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewBranch;
