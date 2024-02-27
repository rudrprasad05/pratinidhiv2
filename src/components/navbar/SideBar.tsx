"use client";

import ThemeSwitcherOneClick from "@/theme/ThemeSwitcherOneClick";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Blocks,
  CalendarCheck,
  Cog,
  Home,
  LayoutDashboard,
  LucideIcon,
  Megaphone,
  MessageSquareMore,
  Package,
  PanelsTopLeft,
  Split,
  Store,
  Tag,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { UserType } from "@/types";
import { redirect } from "next/navigation";
import EditProfileButton from "@/app/(admin)/(nav)/admin/[userId]/dashboard/_components/EditProfileButton";
import EditProfileSheet from "../global/EditProfileSheet";

type Items = {
  name: string;
  icon: LucideIcon;
  link: string;
};
const SideNav = ({ user }: { user: UserType | null }) => {
  const [openNav, setOpenNav] = useState(false);

  if (!user) return redirect("/");
  const items: Items[] = [
    {
      name: "Events",
      icon: CalendarCheck,
      link: `/admin/${user.id}/events`,
    },
    {
      name: "Branch",
      icon: Split,
      link: `/admin/${user.id}/branches`,
    },
    {
      name: "Users",
      icon: User,
      link: `/admin/${user.id}/users`,
    },
    {
      name: "Tags",
      icon: Tag,
      link: `/admin/${user.id}/tags`,
    },
  ];

  const toggleCollapse = () => {
    if (openNav) setOpenNav(false);
    else setOpenNav(true);
  };

  return (
    <Card
      className={cn(
        "rounded-none h-screen sticky top-0 w-[100px] flex flex-col",
        openNav && "w-[200px]"
      )}
    >
      <div className="divide-y-2 flex flex-col items-center gap-3 p-5 grow">
        <div className="w-full  hover:bg-accent hover:text-accent-foreground flex items-center transition rounded-md">
          <Link
            className={cn(
              "h-min w-min mx-auto",
              openNav && "flex gap-3 items-center m-0"
            )}
            href={"/"}
          >
            <div className="p-3">
              <Home className="stroke-primary h-6 w-6" />
            </div>
            <div>{openNav && "Home"}</div>
          </Link>
        </div>
        {/* <Separator className="bg-primary/50" /> */}
        <div
          className={cn(
            "flex flex-col w-full items-center gap-3",
            openNav && "items-start"
          )}
        >
          {items.map((i) => (
            <div
              key={i.name}
              className="w-full bg- hover:bg-secondary hover:text-accent-foreground transition rounded-md"
            >
              <Link
                className={cn(
                  "h-min w-min",
                  openNav && "flex gap-3 items-center"
                )}
                href={i.link}
              >
                <div className="p-3 flex items-center">
                  <i.icon className="mx-auto stroke-primary h-6 w-6" />
                </div>
                <div className="">{openNav && i.name}</div>
              </Link>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "flex mt-auto flex-col w-full items-center gap-2",
            openNav && "items-start"
          )}
        >
          {/* <Separator className="bg-primary/50" /> */}

          <ThemeSwitcherOneClick seeName={openNav} />

          <div className="w-min h-min hover:bg-accent hover:text-accent-foreground transition rounded-md">
            <button
              onClick={() => toggleCollapse()}
              className={cn("w-full", openNav && "flex gap-3 items-center")}
            >
              <div className="p-2">
                {!openNav && (
                  <ArrowRightToLine className="stroke-primary h-6 w-6" />
                )}
                {openNav && (
                  <ArrowLeftToLine className="stroke-primary h-6 w-6" />
                )}
              </div>
              {openNav && <div>Collapse</div>}
            </button>
          </div>

          <div className="w-min h-min hover:bg-accent hover:text-accent-foreground transition rounded-md">
            <EditProfileSheet>
              <>
                <div className="p-2">
                  <Cog className="stroke-primary h-6 w-6" />
                </div>
                <div>{openNav && "Settings"}</div>
              </>
            </EditProfileSheet>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SideNav;
