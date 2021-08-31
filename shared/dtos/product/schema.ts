import { CategorySchema } from '../category/schema';
import { QnASchema } from '../qna/schema';
import { ReviewSchema } from '../review/schema';

export enum ProductSortBy {
  RECOMMEND = 'RECOMMEND',
  BEST = 'BEST',
  NEW = 'NEW',
  LOW_PRICE = 'LOW_PRICE',
  HIGH_PRICE = 'HIGH_PRICE',
}

export interface ProductSchema {
  id: number;
  name: string;
  price?: number;
  thumbnail?: string;
  content?: string;
  stock?: number;
  isLike?: boolean;
  category?: CategorySchema;
  badge?: BadgeSchema;
  detail?: ProductDetailSchema;
  reviews?: ReviewSchema[];
  qnas?: QnASchema[];
}

export interface BadgeSchema {
  isBest: boolean;
  isGreen: boolean;
  isDiscount: boolean;
  isNew: boolean;
}

export interface ProductDetailSchema {
  id: number;
  name: string;
  kind: string;
  material: string;
  color: string;
  size: string;
  manufacturer: string;
  country: string;
  caution: string;
  target_customer: string;
  guaranteed: string;
  customer_center: string;
}
