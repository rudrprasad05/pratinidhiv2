import { UserType } from "@/types";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkRoleSuperAdmin(user: UserType | null) {
  return user?.role === "SUPERADMIN";
}

export function idGenerator(): string {
  return Math.floor(Math.random() * 10001).toString();
}
