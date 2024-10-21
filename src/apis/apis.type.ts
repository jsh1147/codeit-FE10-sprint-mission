export type StringObj = Record<string, string>;

export type OrderByType = "recent" | "favorite";

export interface GetProductsParams {
  page: number;
  pageSize: number;
  orderBy: OrderByType;
  keyword?: string;
}

interface ProductProps {
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
}

export interface GetProductsRes {
  totalCount: number;
  list: ProductProps[];
}
