import { getCategories } from "@/actions/categories";
import { GetFormById, GetForms } from "@/actions/form";

import { Suspense } from "react";
import PublishedPosts from "./_componetns/PublishedPosts";
import DraftPosts from "./_componetns/DraftPosts";
import { CreateFormBtn } from "./_componetns/CreateFormBtn";

async function BuilderPage() {
  const forms = await GetForms();
  const categories = await getCategories();

  if (!forms) {
    return <>No forms</>;
  }

  return (
    <div className="p-12">
      <PublishedPosts data={forms} />
      <DraftPosts data={forms} />

      <h1 className="text-3xl text-primary font-bold pb-10">Actions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories && <CreateFormBtn categories={categories} />}
      </div>
    </div>
  );
}

export default BuilderPage;
