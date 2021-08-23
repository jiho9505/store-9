import { QnASchema } from './schema';

namespace QnARequest {
  export type Create = Pick<QnASchema, 'title' | 'content' | 'images' | 'isPrivate'> & {
    product_id: number;
  };

  export type Update = Pick<QnASchema, 'id' | 'title' | 'content' | 'images' | 'isPrivate'>;

  export type Remove = { qnaId: number };
}

export default QnARequest;
