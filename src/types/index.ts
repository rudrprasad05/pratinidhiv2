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

import { User } from "@prisma/client";

export type PageSearchProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { token?: string };
};

export type UserType = User;

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