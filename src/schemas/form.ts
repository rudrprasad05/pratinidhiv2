import { z } from "zod";

export const CreatePostSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
  category: z.string().optional(),
});

export const CreateBranchPostSchema = z.object({
  branchName: z
    .string()
    .min(2, { message: "Must have more than 2 characters" })
    .max(50, { message: "Must be less than 50 characters" }),
  headName: z
    .string()
    .min(2, { message: "Must have more than 2 characters" })
    .max(50, { message: "Must be less than 50 characters" }),
  email: z
    .string()
    .min(1, { message: "must be a valid email address" })
    .email({ message: "must be a valid email address" }),
  phone: z
    .string()
    .min(6, { message: "must be a valid phone number" })
    .max(10, { message: "must be a valid phone number" }),
});

export const CreateAdminFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type CreateBranchPostSchemaType = z.infer<typeof CreateBranchPostSchema>;
export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;
export type CreateAdminSchemaType = z.infer<typeof CreateAdminFormSchema>;
