import { GetCategoryById } from "@/actions/category";

import EditCategoryForm from "@/components/EditCategoryForm";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const category = await GetCategoryById(id);

  return <>{category && <EditCategoryForm category={category} />}</>;
};

export default Page;
