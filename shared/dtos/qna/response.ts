import { QnASchema } from './schema';

namespace QnAResponse {
  export type GetList = {
    qnas: {
      id: number;
      productThumbnail: string;
      productName: string;
      title: string;
      content: string;
      createdAt: Date;
    }[];
    totalCount: number;
  }[];

  export type Create = QnASchema;

  export type Update = QnASchema;
}

export default QnAResponse;
