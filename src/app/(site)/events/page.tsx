// import { GetForms } from "@/actions/form";
// import React from "react";

// const page = async () => {
//   const events = await GetForms();
//   console.log(events);
//   return <div>page</div>;
// };

// export default page;

import React from "react";
import { Feed } from "./_components/SiteProductFeed";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = (props: PageProps) => {
  return <Feed {...props} />;
};

export default page;
