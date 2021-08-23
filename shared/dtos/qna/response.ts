import { QnASchema } from './schema';

namespace QnAResponse {
  export type GetList = QnASchema[];

  export type Create = QnASchema;

  export type Update = QnASchema;
}

export default QnAResponse;
