"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "../ui/input";
import { CreateCategory } from "@/actions/categories";

const NewCategorySchema = z.object({
  authorID: z.string().optional(),
  authorName: z.string().optional(),
  name: z
    .string()
    .min(2, "more than 2 characters")
    .max(32, "less than 32 characters"),
});

export type NewCategoryType = z.infer<typeof NewCategorySchema>;

const NewCategoryForm = () => {
  const data = useSession();
  const user = data.data?.user;
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<NewCategoryType>({
    resolver: zodResolver(NewCategorySchema),
    defaultValues: {
      name: "",
      authorID: user?.id,
      authorName: user?.name || "",
    },
  });

  const onSubmit = async (data: NewCategoryType) => {
    data.authorID = user?.id;
    data.authorName = user?.name as string;
    console.log(data);
    const res = await CreateCategory(data)
      .then((res) => {
        toast.success("category Created Successfully");
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
    <div className="">
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
                <FormLabel>Tag Name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="enter tag Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewCategoryForm;
