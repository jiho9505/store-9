import { getCustomRepository } from 'typeorm';
import QnARequest from '../../../shared/dtos/qna/request';
import QnAResponse from '../../../shared/dtos/qna/response';
import QnA from '../entities/qna';
import QnARepository from '../repositories/QnARepository';

const getList: RouteHandler<null, QnAResponse.GetList> = async (req, res) => {
  try {
    const { userId = 1 } = res.locals;

    const [qnas, totalCount] = await getCustomRepository(QnARepository).getList({ userId });

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
    console.error(e);

    res.status(500).json({ ok: false });
  }
};

const create: RouteHandler<QnARequest.Create, QnAResponse.Create> = async (req, res) => {
  try {
    const { userId = 1 } = res.locals;

    const { title, content, product_id, images = '' } = req.body;

    const result = await getCustomRepository(QnARepository).createQnA({
      userId,
      title,
      content,
      product_id,
      images,
    });

    res.json({
      ok: true,
      data: {
        id: result.id,
        title: result.title,
        content: result.content,
        images: result.images,
        createdAt: result.created_at,
        product: {
          id: result.product.id,
          name: result.product.name,
        },
      },
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({ ok: false });
  }
};

const update: RouteHandler<QnARequest.Update, QnAResponse.Update> = async (req, res) => {
  try {
    const { id, title, content, images = '/' } = req.body;

    const result = await getCustomRepository(QnARepository).updateQnA({
      qnaId: id,
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

const remove: RouteHandler<QnARequest.Remove> = async (req, res) => {
  try {
    const { qnaId } = req.params;

    const result = await getCustomRepository(QnARepository).delete(qnaId);

    res.json({ ok: result.affected > 0 });
  } catch (e) {
    console.error(e);

    res.status(500).json({ ok: false });
  }
};

const QnAController = {
  getList,
  create,
  update,
  remove,
};

export default QnAController;
