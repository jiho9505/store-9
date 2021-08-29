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
    startDate?: Date | string;
    endDate?: Date | string;
  }) {
    console.log(startDate);
    const start = new Date(new Date(startDate).setHours(0, 0, 0, 0)).toJSON();
    const end = new Date(new Date(endDate).setHours(23, 59, 59, 59)).toJSON();

    console.log(start, end);

    const result = this.createQueryBuilder('q')
      .leftJoinAndSelect('q.product', 'product')
      .where(`q.user_id = ${userId}`)
      .andWhere('q.created_at > :start_at AND q.created_at < :end_at', {
        start_at: start,
        end_at: end,
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
    await this.insert({
      title,
      content,
      product_id,
      images,
      isPrivate: false,
      user_id: userId,
    });

    return;
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
