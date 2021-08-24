export interface ReviewSchema {
  id: number;
  userId: number;
  productId: number;
  title: string;
  content: string;
  rate: number;
  images: string[];
  createdAt?: Date;
}
