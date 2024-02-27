import { getCategories } from "@/actions/categories";
import { GetUserOnly } from "@/actions/user";
import { DataTable } from "@/components/global/data-table";
import { categoryColumns } from "@/components/tables/categoryColumns";
import CreateCategoryButton from "./_components/CreateCategoryButton";

export default async function Page() {
  const user = await GetUserOnly();
  const categoryData = await getCategories();

  return (
    <main className="p-12">
      <h1 className="text-3xl text-primary font-bold pb-10">Categories</h1>

      {categoryData && (
        <DataTable
          type="category"
          columns={categoryColumns}
          data={categoryData}
        />
      )}
      <h1 className="text-3xl text-primary font-bold pb-10">Actions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateCategoryButton />
      </div>
    </main>
  );
}
