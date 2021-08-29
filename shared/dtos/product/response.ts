namespace ProductResponse {
  export interface MainProduct {
    productId: number;
    name: string;
    price: number;
    thumbnail: string;
    reviewAverageRate: number;
    reviewCount: number;
    likeCount: number;
    discountRate: number;
    isGreen: boolean;
    badges: string[];
    stock: number;
  }

  export type GetMain = {
    bestProducts: MainProduct[];
    newProducts: MainProduct[];
    discountProducts: MainProduct[];
  };

  export interface ListProduct extends MainProduct {}

  export type GetList = {
    products: ListProduct[];
    totalCount: number;
  };

  export type GetDetail = {
    productId: number;
    name: string;
    price: number;
    stock: number;
    thumbnail: string;
    contentImages?: string[];
    discountRate: number;
    isLike: boolean;
    reviews: {
      id: number;
      title: string;
      content: string;
      rate: string;
      username: string;
      createdAt: Date;
    }[];
    qnas: {
      id: number;
      title: string;
      content: string;
      username: string;
      createdAt: Date;
      isPrivate?: boolean;
    }[];
    recommends: {
      //random하게 추출
      productId: number;
      name: string;
      reviewAverageRate: number;
      reviewCount: number;
      likeCount: number;
      discountRate: number;
      isGreen: boolean;
      badges: string[];
    }[];
  };

  export type Create = {
    productId: number;
    name: string;
    isLike: boolean;
    reviewAverageRate: number;
    reviewCount: number;
    likeCount: number;
    discountRate: number;
    isGreen: boolean;
    badges: string[];
  };

  export type SearchValues = string[];
}

export default ProductResponse;
