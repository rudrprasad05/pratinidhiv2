// import {
//   Ad,
//   Products,
//   Seller,
//   User,
//   OrderList,
//   Order,
//   MerchantOrder,
//   Billboard,
//   Category,
//   Subcategory,
//   Conversation,
//   Message,
// } from "@prisma/client";

import { GetAllFormsPagination, GetForms } from "@/actions/form";
import { Branch, Category, Post, Prisma, User } from "@prisma/client";

export type PageSearchProps = {
  params: { userId?: string; branchId?: string };
  searchParams?: { token?: string };
};

export type UserType = User;

export type FullPostType = Post & {
  comments: Comment[];
  author: User;
};

export type FullCategoryType = Category;

export type BranchType = Branch;

export type GetEventsPostsWithCommentsAndAuthor = Prisma.PromiseReturnType<
  typeof GetForms
>;

export type GetEventsPagination = Prisma.PromiseReturnType<
  typeof GetAllFormsPagination
>;
// export type UserType = User & {
//   seller: SellerType;
// };

// export type SellerType = Seller & {
//   products: Products[];
// };

// export type ProductType = Products & {
//   seller: Seller;
// };

// export type AdsEndPoint = Seller & {
//   ads: Ad[];
// };

// export type CategoryType = Category;

// export type ConversationType = Conversation & {
//   messages: Message[];
//   users: User[];
// };

// export type SubcategoryType = Subcategory;

// export type MessageType = Message;

// export type AdType = Ad;

// export type OrderListType = OrderList & {
//   product: Products;
//   seller: Seller;
//   order: Order;
// };

// export type MerchantOrderType = MerchantOrder & {
//   order: Order & {
//     customer: User;
//   };
//   seller: Seller;
//   orderLists: OrderList[] & {
//     product: Products;
//   };
// };

// export type BillboardType = Billboard & {
//   ad: Ad & {
//     seller: Seller;
//   };
// };
