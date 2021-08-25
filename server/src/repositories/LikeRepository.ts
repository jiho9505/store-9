import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';
import Like from '../entities/like';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  getLikes(user_id: number, size: number = 20, page: number = 0) {
    return this.createQueryBuilder('l')
      .leftJoinAndSelect('l.product', 'product')
      .select(['l.id', 'l.product_id'])
      .addSelect(['product.name', 'product.price', 'product.thumbnail'])
      .where(`l.user_id = ${user_id}`)
      .limit(size)
      .offset(page * size)
      .getManyAndCount();
  }

  deleteLike(user_id: number, like_id: number) {
    return this.delete({ id: like_id, user_id });
  }
}
