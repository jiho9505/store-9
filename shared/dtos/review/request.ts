namespace ReviewRequest {
  export type Create = Pick<ReviewSchema, 'title' | 'content' | 'images' | 'rate'>;

  export type getList = {
    size?: number;
    page?: number;
  };

  export type Create = {
    title: string;
    content: string;
    rate: number;
    images: string[];
  };

  export type Update = {
    reviewId: number;
    title: string;
    content: string;
    rate: number;
  };

  export type Remove = { reviewId: number };
}

export default ReviewRequest;
