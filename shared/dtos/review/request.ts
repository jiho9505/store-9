import { ReviewSchema } from './schema';

namespace ReviewRequest {
  export type Create = Pick<ReviewSchema, 'title' | 'content' | 'images' | 'rate'>;

  export type Update = Pick<ReviewSchema, 'content' | 'title' | 'images' | 'rate'>;

  export type Remove = { reviewId: number };
}

export default ReviewRequest;
