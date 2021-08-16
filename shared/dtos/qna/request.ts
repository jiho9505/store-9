import { QnASchema } from './schema';

namespace QnARequest {
  export type Create = Pick<QnASchema, 'title' | 'content' | 'images' | 'isPrivate'>;

  export type Update = Pick<QnASchema, 'title' | 'content' | 'images' | 'isPrivate'>;

  export type Remove = { qnaId: number };
}

export default QnARequest;
