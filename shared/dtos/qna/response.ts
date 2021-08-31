import { QnASchema } from './schema';

namespace QnAResponse {
  export type GetList = {
    qnas: {
      id: number;
      title: string;
      content: string;
      createdAt: Date;
      product: {
        id: number;
        name: string;
        price: number;
        thumbnail: string;
      };
    }[];
    totalCount: number;
  };

  export type Create = QnASchema;

  export type Update = QnASchema;
}

export default QnAResponse;
