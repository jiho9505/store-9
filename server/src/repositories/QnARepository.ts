import { EntityRepository, Repository } from 'typeorm';
import QnA from '../entities/qna';

@EntityRepository(QnA)
export default class QnARepository extends Repository<QnA> {
  getList({
    userId,
    startDate = new Date(0),
    endDate = new Date(),
    page = 0,
    size = 5,
  }: {
    userId: number;
    size?: number;
    page?: number;
    startDate?: Date;
    endDate?: Date;
  }) {
    const result = this.createQueryBuilder('q')
      .leftJoinAndSelect('q.product', 'product')
      .where(`q.user_id = ${userId}`)
      .where('q.created_at > :start_at AND q.created_at < :end_at', {
        start_at: new Date(new Date(startDate).setHours(0, 0, 0, 0)).toJSON(),
        end_at: new Date(new Date(endDate).setHours(23, 59, 59, 59)).toJSON(),
      })
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
