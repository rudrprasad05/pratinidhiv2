"use server";

import React from "react";
import { revalidatePath } from "next/cache";

import { Pagination } from "./pagination";
import { string } from "zod";
import { SiteProductCard } from "./SiteProductCard";
import { GetAllFormsPagination } from "@/actions/form";
// import SearchBar from "./SearchBar";
// import SearchFilter from "./SearchFilter";

const PAGE_SIZE = 10;

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const Feed = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const search = String(props?.searchParams?.search || "");
  const tag = String(props?.searchParams?.tag || "");
  const tagid = String(props?.searchParams?.tagid || ""); // Get the page number. Default to 1 if not provided.
  // Get the page number. Default to 1 if not provided.
  // Get the page number. Default to 1 if not provided.

  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take; // Calculate skip based on page number.

  const { data, metadata } = await GetAllFormsPagination({
    take,
    skip,
    search,
  });

  // const tags = await GetAllTags();

  if (!data) return <div>loadinf</div>;

  return (
    <div className="h-full w-4/5 mx-auto pt-10 flex flex-col">
      <div className="flex pb-10 gap-3">
        <h1 className="items-center grow text-3xl text-primary font-bold ">
          Products
        </h1>
        {/* <SearchBar defaultValue={search} />
        <SearchFilter tags={tags} /> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((product) => {
          return <SiteProductCard key={product.id} product={product} />;
        })}
        {data.length == 0 && <div className="">No Products here</div>}
      </div>
      <Pagination {...props.searchParams} {...metadata} />
    </div>
  );
};
