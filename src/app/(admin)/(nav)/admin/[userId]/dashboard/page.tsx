import React from "react";
import AdminCards from "./_components/AdminCards";
import { Box } from "lucide-react";
import CreateAdminButton from "./_components/CreateAdminButton";
import CreateBranchButton from "./_components/CreateBranchButton";
import EditProfileButton from "./_components/EditProfileButton";
import CreateCategoryButton from "./_components/CreateCategoryButton";
import { PageSearchProps } from "@/types";

const page = ({ params }: PageSearchProps) => {
  return (
    <main className="p-12">
      <div className="pb-20">
        <h1 className="text-3xl text-primary font-bold pb-10">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <AdminCards
            href={`/admin/${params.userId}/events`}
            name="Events"
            Icon={Box}
          />
          <AdminCards
            href={`/admin/${params.userId}/categories`}
            name="Categories"
            Icon={Box}
          />
          <AdminCards
            href={`/admin/${params.userId}/users`}
            name="Admin"
            Icon={Box}
          />
          <AdminCards
            href={`/admin/${params.userId}/comments`}
            name="Comments"
            Icon={Box}
          />

          <AdminCards
            href={`/admin/${params.userId}/branches`}
            name="Branches"
            Icon={Box}
          />
        </div>
      </div>

      <h1 className="text-3xl text-primary font-bold pb-10">Quick Access</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {categories && <CreateFormBtn categories={categories} />} */}

        <CreateAdminButton />
        <EditProfileButton />
        <CreateCategoryButton />
        <CreateBranchButton />
      </div>
    </main>
  );
};

export default page;
