export interface ReviewSchema {
  id: number;
  userId: number;
  productId: number;
  title: string;
  content: string;
  images: string[];
  createdAt?: string;
}
