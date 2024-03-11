"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import {
//   CreateBranchPostSchema,
//   CreateBranchPostSchemaType,
// } from "@/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Split } from "lucide-react";

const CreateBranchButton = () => {
  const router = useRouter();

  // const form = useForm<CreateBranchPostSchemaType>({
  //   resolver: zodResolver(CreateBranchPostSchema),
  //   defaultValues: {
  //     branchName: "",
  //     headName: "",
  //     email: "",
  //     phone: "",
  //   },
  // });

  // function onSubmit(data: CreateBranchPostSchemaType) {
  //   axios
  //     .post(`/api/branch`, data)
  //     .then((res) => {
  //       if (res.status == 200) toast.success("Branch Created Successfully");
  //     })
  //     .catch((error) => {
  //       toast.error("An Error Occured");
  //       console.log("BRANCH NEW - CreateBranchButton.tsx", error);
  //     })
  //     .finally(() => {
  //       router.refresh();
  //     });
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative bg-muted p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Branch</div>
          <div className="absolute bottom-5 right-5">
            <Split className="group-hover:h-28 group-hover:w-28  duration-200  w-16 h-16 stroke group-hover:stroke-primary stroke-muted-foreground" />

            {/* <IoPersonAddOutline className="group-hover:stroke-primary w-16 h-16 stroke stroke-muted-foreground" /> */}
          </div>
          <div className=" text-muted-foreground">New</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Branch</DialogTitle>
          <DialogDescription>Create New Branch</DialogDescription>
        </DialogHeader>
        {/* <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="branchName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="enter branch"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="headName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Head Officer</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="name of officer"
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
                        placeholder="email of officer"
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
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="phone number of officer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreateBranchButton;
