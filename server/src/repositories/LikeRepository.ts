import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';
import Like from '../entities/like';

type LikeData = {
  user_id: number;
  product_id: number;
};

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  getLikes(user_id: number, page: number = 0, size: number = 5) {
    return this.createQueryBuilder('l')
      .leftJoinAndSelect('l.product', 'product')
      .select(['l.id', 'l.product_id'])
      .addSelect(['product.name', 'product.price', 'product.thumbnail'])
      .where(`l.user_id = ${user_id}`)
      .limit(size)
      .offset(page * size)
      .getManyAndCount();
  }

  getLike(likeData: LikeData[]) {
    return this.find({ where: likeData });
  }

  createLike(likeData: LikeData[]) {
    const newLike = this.create(likeData);
    return this.save(newLike);
  }

  deleteLike(user_id: number, ids: number[]) {
    console.log(ids);
    return this.createQueryBuilder()
      .delete()
      .from(Like)
      .where('id = :user_id', { user_id })
      .where('id IN (:ids)', { ids })
      .execute();
  }
}
