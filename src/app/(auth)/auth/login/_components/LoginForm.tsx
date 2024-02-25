"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email("This is not a valid email.")
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  password: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

const LoginForm = (props: any) => {
  const searchParamsType = String(props?.searchParams?.type);
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isSeller = searchParamsType === "seller";
  const isBuyer = searchParamsType === "buyer";

  useEffect(() => {
    if (session?.status == "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast("Invalid", {
            description: "Check credentials",
          });
          console.log(callback);
        } else if (callback?.ok) {
          toast("Success", {
            description: "You have logged in",
          });
          router.push("/");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const socialAction = (action: string) => {
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast("Invalid credentials", {
            description: "'",
          });
        }

        toast("Success", {
          description: "Logged in",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="container relative flex py-10 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/auth/register"
            >
              Don&apos;t have an account?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
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
                              if (isPasswordVisible)
                                setIsPasswordVisible(false);
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

                <Button className="w-full" type="submit">
                  {isLoading && <Loader2 className={"animate-spin mr-3"} />}
                  Login
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
    </>
  );
};

export default LoginForm;
