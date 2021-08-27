import { getCustomRepository } from 'typeorm';

import QnARequest from '../../../shared/dtos/qna/request';
import QnAResponse from '../../../shared/dtos/qna/response';
import QnARepository from '../repositories/QnARepository';

namespace QnAController {
  export const getList: RouteHandler<QnARequest.GetList, QnAResponse.GetList> = async (
    req,
    res
  ) => {
    try {
      const { userId = 1 } = res.locals;
      const { startDate, endDate, page } = req.query;

      const [qnas, totalCount] = await getCustomRepository(QnARepository).getList({
        userId,
        startDate,
        endDate,
        page,
      });

      res.json({
        ok: true,
        data: {
          qnas: qnas.map(({ id, title, content, created_at, product }) => ({
            id,
            title,
            content,
            createdAt: created_at,
            product: {
              id: product.id,
              name: product.name,
              price: product.price,
              thumbnail: product.thumbnail,
            },
          })),
          totalCount,
        },
      });
    } catch (e) {
      res.status(500).json({ ok: false });
    }
  };

  export const create: RouteHandler<QnARequest.Create, QnAResponse.Create> = async (req, res) => {
    try {
      const userId = res.locals?.user?.id || 1;

      const { title, content, productId, images = '' } = req.body;

      await getCustomRepository(QnARepository).createQnA({
        userId,
        title,
        content,
        product_id: productId,
        images,
      });

      res.json({
        ok: true,
      });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };

  export const update: RouteHandler<QnARequest.Update, QnAResponse.Update> = async (req, res) => {
    try {
      const { qnaId, title, content, images = '/' } = req.body;

      const result = await getCustomRepository(QnARepository).updateQnA({
        qnaId,
        content,
        title,
        images,
      });

      res.json({
        ok: true,
        data: {
          id: result.id,
          content: result.content,
          title: result.title,
          images: result.images,
          createdAt: result.created_at,
          product: {
            id: result.product.id,
            name: result.product.name,
            price: result.product.price,
          },
        },
      });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };

  export const remove: RouteHandler<QnARequest.Remove> = async (req, res) => {
    try {
      const { qnaId } = req.params;

      const result = await getCustomRepository(QnARepository).delete(qnaId);

      res.json({ ok: result.affected > 0 });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };
}

export default QnAController;
