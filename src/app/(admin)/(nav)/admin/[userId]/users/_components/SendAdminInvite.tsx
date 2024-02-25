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

const NewWebsiteForm = z.object({
  email: z.string().email(),
  role: z.enum(["ADMIN", "SUPERADMIN", "USER"]),
  name: z
    .string()
    .min(1, { message: "more then 2 characters" })
    .max(32, { message: "less then 32 characters" }),
  password: z
    .string()
    .min(1, { message: "more then 2 characters" })
    .max(32, { message: "less then 32 characters" }),
});

//   status   InvitationStatus @default(PENDING)
//   role     Role             @default(ADMIN)

export type NewAdminType = z.infer<typeof NewWebsiteForm>;

const NewWebsite = () => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();
  const role = ["ADMIN", "SUPERADMIN", "USER"];

  const form = useForm<NewAdminType>({
    resolver: zodResolver(NewWebsiteForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "ADMIN",
    },
  });

  async function onSubmit(data: NewAdminType) {
    const res = await RegisterUser(data)
      .then((response) => {
        console.log(response);
        setOpen(false);
        toast("User added");
        router.refresh();
      })
      .catch((err: Error) => {
        console.log(err);
        toast(err.message);
        setOpen(false);
      });
  }

  function makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const autogeneratePassword = () => {
    return makeid(12);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative bg-muted p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Invite</div>
          <div className="absolute bottom-5 right-5">
            <Box className="group-hover:h-28 group-hover:w-28  duration-200  w-16 h-16 stroke group-hover:stroke-primary stroke-muted-foreground" />
          </div>
          <div className=" text-muted-foreground">Send admin invite</div>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-[720px]">
        <DialogHeader>
          <DialogTitle>New User</DialogTitle>
          <DialogDescription>Create a new user or admin</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter admin Name"
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
                      placeholder="enter admin email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <Input
                          autoComplete="off"
                          placeholder="enter admin password"
                          {...field}
                        />
                        <Button
                          type="button"
                          className="text-xs flex gap-2"
                          variant={"secondary"}
                          onClick={() =>
                            form.setValue("password", autogeneratePassword())
                          }
                        >
                          <KeyRound className="w-4 h-4" />
                          Autogenerate
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {role?.map((i) => (
                        <SelectItem key={i} value={i}>
                          {i.toLowerCase()}
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

export default NewWebsite;
