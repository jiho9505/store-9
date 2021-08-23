export interface QnASchema {
  id: number;
  userId: number;
  productId: number;
  title: string;
  content: string;
  isPrivate: boolean;
  images: string[];
  createdAt: string;
}
