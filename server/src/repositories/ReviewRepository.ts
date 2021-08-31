import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';
import Review from '../entities/review';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
  getReviews(user_id: number, page = 0, size = 5): Promise<[Review[], number]> {
    return this.findAndCount({
      relations: ['product'],
      where: { user_id },
      skip: page * size,
      take: size,
    });
  }
  getReview(user_id: number, product_id: number): Promise<Review> {
    return this.findOne({ user_id, product_id });
  }
  createReview(reviewData): Promise<Review[]> {
    const newReview = this.create({ ...reviewData });
    return this.save(newReview);
  }
  updateReview(review, newReview): Promise<UpdateResult> {
    return this.update(review, newReview);
  }
  deleteReview(user_id: number, product_id: number): Promise<DeleteResult> {
    return this.delete({ user_id, product_id });
  }
}
