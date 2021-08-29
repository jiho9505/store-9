namespace CategoryResponse {
  export type GetCategories = {
    parentCategories: {
      id: number;
      name: string;
      parentId: null | number;
    }[];
    subCategories: {
      id: number;
      name: string;
      parentId: number;
    }[];
    productNames: string[];
  };
}

export default CategoryResponse;
