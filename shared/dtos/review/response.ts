import { ReviewSchema } from './schema';

namespace ReviewResponse {
  export type GetList = ReviewSchema[];

  export type Create = ReviewSchema;

  export type Update = ReviewSchema;
}

export default ReviewResponse;
