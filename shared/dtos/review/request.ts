import { ReviewSchema } from './schema';

namespace ReviewRequest {
  export type Create = Pick<ReviewSchema, 'title' | 'productId' | 'content' | 'images'>;

  export type Update = Pick<ReviewSchema, 'id' | 'content' | 'title' | 'images'>;

  export type Remove = { reviewId: number };
}

export default ReviewRequest;
