import { QnASchema } from './schema';

namespace QnAResponse {
  export type GetList = {
    qnas: QnASchema[];
    totalCount: number;
  };

  export type Create = QnASchema;

  export type Update = QnASchema;
}

export default QnAResponse;
