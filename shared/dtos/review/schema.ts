export interface ReviewSchema {
  id: number;
  user_id: number;
  product_id: number;
  title: string;
  content: string;
  rate: number;
  images: string[];
  created_at?: Date;
}
