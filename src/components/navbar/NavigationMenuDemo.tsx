"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Box } from "lucide-react";
import { useSession } from "next-auth/react";

// const Branches: { title: string; href: string; description: string }[] = [
//   { title: "Suva", href: "/branches/suva", description: "7 Smith Road" },
//   { title: "Lautoka", href: "/branches/lautoka", description: "7 Smith Road" },
//   { title: "Labasa", href: "/branches/labasa", description: "7 Smith Road" },
// ];

export function NavigationMenuDemo() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <NavigationMenu className="">
      <NavigationMenuList className="gap-10">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/post" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Posts
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* ADMIN PANEL */}
        {user?.role == "ADMIN" ||
          (user?.role == "SUPERADMIN" && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col gap-3 p-6 w-[500px]">
                  <Link
                    href={"/admin"}
                    className={
                      " flex items-center gap-5 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    }
                  >
                    <div>
                      <div className="text-base font-medium leading-none">
                        Dashboard
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        All your controls at your fingertips
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Box className={"w-8 h-8"} />
                    </div>
                  </Link>
                  <Link
                    href={"/admin/posts"}
                    className={
                      " flex items-center gap-5 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    }
                  >
                    <div>
                      <div className="text-base font-medium leading-none">
                        Post
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Create categories for for posts for a better user
                        experience
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Box className={"w-8 h-8"} />
                    </div>
                  </Link>

                  <Link
                    href={"/admin/posts"}
                    className={
                      " flex items-center gap-5 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    }
                  >
                    <div>
                      <div className="text-base font-medium leading-none">
                        Categories
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Create categories for for posts for a better user
                        experience
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Box className={"w-8 h-8"} />
                    </div>
                  </Link>

                  <Link
                    href={"/admin/posts"}
                    className={
                      " flex items-center gap-5 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    }
                  >
                    <div>
                      <div className="text-base font-medium leading-none">
                        Admin
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Add or delete admins users
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Box className={"w-8 h-8"} />
                    </div>
                  </Link>

                  <Link
                    href={"/admin/comments"}
                    className={
                      " flex items-center gap-5 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    }
                  >
                    <div>
                      <div className="text-base font-medium leading-none">
                        Comments
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        View and moderate comments left by users
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Box className={"w-8 h-8"} />
                    </div>
                  </Link>

                  <Link
                    href={"/admin/branches"}
                    className={
                      " flex items-center gap-5 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    }
                  >
                    <div>
                      <div className="text-base font-medium leading-none">
                        Branches
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Add or delete the branches and divisions of your company
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Box className={"w-8 h-8"} />
                    </div>
                  </Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}

        {/* BRANCHES */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Branches</NavigationMenuTrigger>
          <NavigationMenuContent>
            <Link
              href={"/admin/branches"}
              className={
                "p-6  flex items-center gap-5 select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              }
            >
              <div>
                <div className="text-base font-medium leading-none">
                  All Branches
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Add or delete the branches and divisions of your company
                </p>
              </div>
              <div className="ml-auto">
                <Box className={"w-8 h-8"} />
              </div>
            </Link>
            <ul className="grid gap-3 p-4 w-[500px] grid-cols-2">
              {/* {Branches.map((branch) => (
                <ListItem
                  key={branch.id || ""}
                  title={branch.branchName as string}
                >
                  {branch.email}
                </ListItem>
              ))} */}
            </ul>
            {/* <BranchListDropDown /> */}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
