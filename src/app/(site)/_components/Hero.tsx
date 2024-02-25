import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export const Hero = () => {
  return (
    <div className="h-[85vh] w-4/5 mx-auto">
      <div className="flex items-center justify-between h-full">
        <div className="w-1/2 flex flex-col gap-y-10 justify-center h-full">
          <h1 className="text-5xl">Shree Santan Dharm Pratinidhi Sabha</h1>
          <h3 className="text-xl">
            The Sanatan Dharam Pratinidhi Sabha of Fiji has 28 local branches,
            hundreds of temples and mandalies linked.
          </h3>
          <div className="flex items-center gap-x-5">
            <Button variant="outline">Join Us</Button>
            <Button>Make a Donation</Button>
          </div>
        </div>
        <div className="">
          <Image
            src="/hero.jpg"
            alt="mandir"
            width={400}
            height={400}
            className="aspect-square rounded-full overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};
