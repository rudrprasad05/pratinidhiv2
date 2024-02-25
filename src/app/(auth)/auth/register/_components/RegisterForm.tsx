"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { RegisterUser } from "@/actions/user";

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Enter a Valid Email" }),
  name: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must contain more than 2 characters" })
    .max(32, { message: "Password must have less than 2 characters" }),
  // confirmPassword: z.string(),
  role: z.string().optional(),
});
export type RegisterFormType = z.infer<typeof RegisterSchema>;

const RegisterForm = (props: any) => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [redirectToSetup, setredirectToSetup] = useState(false);

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "USER",
    },
  });

  async function onSubmit(data: RegisterFormType) {
    setIsLoading(true);
    data.role = "USER";
    console.log(data);

    const res = await RegisterUser(data)
      .then((ress) => {
        signIn("credentials", { ...data, redirect: false });
        console.log(ress);
        redirect("/auth/verify-email");
      })
      .catch((e: Error) => {
        console.log(e);
        toast("Error", { description: e.message });
      })
      .finally(() => {
        setIsLoading(false);
        setredirectToSetup(true);
      });
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast("Invalid", { description: "Contact site admin" });
        }

        toast("Invald", { description: "wrong username or password" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container relative flex py-10 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>

          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href="/auth"
          >
            Already have an account? Sign-in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} value="seller" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="enter name"
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
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? "text" : "password"}
                          autoComplete="off"
                          placeholder="enter password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (isPasswordVisible) setIsPasswordVisible(false);
                            else setIsPasswordVisible(true);
                          }}
                          className=" h-full aspect-square absolute top-0 right-0 grid place-items-center "
                        >
                          {isPasswordVisible ? (
                            <EyeOff className="stroke-muted-foreground w-5 h-5" />
                          ) : (
                            <Eye className="stroke-muted-foreground w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        autoComplete="off"
                        placeholder="enter password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (isPasswordVisible) setIsPasswordVisible(false);
                          else setIsPasswordVisible(true);
                        }}
                        className=" h-full aspect-square absolute top-0 right-0 grid place-items-center "
                      >
                        {isPasswordVisible ? (
                          <FiEyeOff className="stroke-muted-foreground w-5 h-5" />
                        ) : (
                          <FiEye className="stroke-muted-foreground w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <div>{confirmPasswordError}</div>
                </FormItem>
              )}
            /> */}

              <Button className="w-full" type="submit">
                {isLoading && <Loader2 className={"animate-spin mr-3"} />}
                Register
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <Link
            href={"/auth/admin"}
            className={buttonVariants({ variant: "secondary" })}
          >
            Continue as Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
