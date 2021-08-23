import { ProductSchema } from '../product/schema';

export interface QnASchema {
  id: number;
  userId?: number;
  product?: ProductSchema;
  title: string;
  content: string;
  isPrivate?: boolean;
  images?: string;
  createdAt?: Date;
}
