namespace CategoryResponse {
  export type GetCategories = {
    id: number;
    name: string;
    parentId: number;
    // parentCategories: {
    //   id: number;
    //   name: string;
    //   parentId: null;
    // }[];
    // subCategories: {
    //   id: number;
    //   name: string;
    //   parentId: number;
    // }[];
  }[];
}

export default CategoryResponse;
