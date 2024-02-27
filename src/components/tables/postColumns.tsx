"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FullPostType } from "@/types";
import Link from "next/link";
import { MONTHS } from "./categoryColumns";
// import { ArrowUpDown } from "react-icons/hi2";

export type User = {
  id: string;
  name: string;
  emaiL: string;
  image: string;
  lastSeen: string;
};

export const postColumns: ColumnDef<FullPostType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-5 w-5" />
        </Button>
      );
    },
  },
  {
    accessorKey: "authorName",
    header: "Author",
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-5 w-5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const dayOfMonth = date.getDate();
      const month =
        MONTHS[date.getMonth()].charAt(0).toUpperCase() +
        MONTHS[date.getMonth()].slice(1);
      const year = date.getFullYear();
      return (
        <div className="font-medium">
          {dayOfMonth} {month} {year}
        </div>
      );
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tag
          <ArrowUpDown className="ml-2 h-5 w-5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      var data: any;
      if (row.getValue("tags") == "")
        data = <div className="text-gray-500">No Tags</div>;
      else data = row.getValue("tags");
      return <div className="font-medium">{data}</div>;
    },
  },
  {
    accessorKey: "likes",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Likes
          <ArrowUpDown className="ml-2 h-5 w-5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      var data: any;
      if (row.getValue("likes") == "")
        data = <div className="text-gray-500">No Likes</div>;
      else data = row.getValue("tags");
      return <div className="font-medium">{data}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex justify-end ml-auto h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 m-auto w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy Post ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className="w-full" href={`/admin/post/${user.id}`}>
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
