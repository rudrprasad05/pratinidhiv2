import { GetFormById, GetForms } from "@/actions/form";
import FormBuilder from "@/components/forms/FormBuilder";

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetFormById(id);
  if (!form) {
    throw new Error("form not found");
  }
  return <FormBuilder form={form} />;
}

export default BuilderPage;
