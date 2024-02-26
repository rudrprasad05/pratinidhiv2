import { GetFormById, GetForms } from "@/actions/form";
import PostPage from "../components/PostPage";

async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await GetFormById(id);

  if (!post) {
    return <>No forms</>;
  }

  return (
    <div className="w-full">
      <PostPage data={post} />
    </div>
  );
}

export default page;
