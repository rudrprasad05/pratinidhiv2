"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
// import ProductQuantityButton from "./ProductQuantityButton";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface props {
  product: any;
}

export const SiteProductCard: React.FC<props> = ({ product }) => {
  const [addToCart, setaddToCart] = useState(true);
  const router = useRouter();

  return (
    <Card className=" flex flex-col justify-between">
      <CardHeader>
        <div className="w-full h-40">
          {/* <Image
            // src={product.imageUrl}
            alt={product.name}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          /> */}
        </div>
        <div className="flex gap-5 pt-5">
          <CardTitle className="grow p-0">{product.name}</CardTitle>
          {/* <Badge className="h-min">{product.tag.name}</Badge> */}
        </div>
      </CardHeader>
      <CardDescription className="">
        <CardContent className="flex flex-col justify-between">
          <div className="line-clamp-2 text-ellipsis">
            {/* {product.description} */}
          </div>

          <div className="flex items-center py-2">
            {/* <CardTitle className="grow">${product.price}</CardTitle> */}
            <Link
              href={`/products/${product.id}`}
              className={`text-primary underline-offset-4 hover:underline px-0`}
            >
              Details
            </Link>
          </div>
        </CardContent>
      </CardDescription>
    </Card>
  );
};
