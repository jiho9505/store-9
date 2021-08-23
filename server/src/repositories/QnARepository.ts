import { EntityRepository, Repository } from 'typeorm';
import QnA from '../entities/qna';

@EntityRepository(QnA)
export default class QnARepository extends Repository<QnA> {
  getList({ userId, size = 10, page = 0 }: { userId: number; size?: number; page?: number }) {
    const result = this.createQueryBuilder('q')
      .leftJoinAndSelect('q.product', 'product')
      .where(`q.user_id = ${userId}`)
      .limit(size)
      .offset(page * size)
      .getManyAndCount();

    return result;
  }

  async createQnA({
    userId,
    title,
    content,
    product_id,
    images,
  }: {
    userId: number;
    title: string;
    content: string;
    product_id: number;
    images: string;
  }) {
    const result = await this.insert({
      title,
      content,
      product_id,
      images,
      isPrivate: false,
      user_id: userId,
    });

    const qna = this.findOne(result.identifiers[0].id, { relations: ['product'] });

    return qna;
  }

  async updateQnA({
    qnaId,
    title,
    content,
    images,
  }: {
    qnaId: number;
    title: string;
    content: string;
    images?: string;
  }) {
    const result = await this.createQueryBuilder()
      .update({
        title,
        content,
        images,
      })
      .whereInIds(qnaId)
      .execute();

    const qna = this.findOne(qnaId, { relations: ['product'] });

    return qna;
  }
}
