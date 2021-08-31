import { ReviewSchema } from '@shared/dtos/review/schema';

export default class ReviewModel implements ReviewSchema {
  id: number;
  userId: number;
  productId: number;
  title: string;
  content: string;
  images: string[];
  rate: number;
  createdAt: Date;
  createdDate: Date;

  constructor(dto: ReviewSchema) {
    Object.assign(this, dto);
    this.createdDate = new Date(dto.createdAt);
  }

  static create(dto: ReviewSchema) {
    return new ReviewModel(dto);
  }
}
