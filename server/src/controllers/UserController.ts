import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { LikeRepository } from '../repositories/LikeRepository';
import { JwtSignPayload } from '../utils/types';
import constant from '../utils/constant';
import { filterExistItem } from '../utils/user';

const UserController = {
  getLikeLists: async (req: Request, res: Response) => {
    try {
      const { page } = req.query;
      const curPage = page || 1;

      const user: JwtSignPayload = res.locals.user;
      const likeRepository = getCustomRepository(LikeRepository);
      const [likes, totalCount] = await likeRepository.getLikes(user.id, Number(curPage) - 1);
      res.json({ ok: true, data: { likes, totalCount }, message: constant.GET_LIKE_SUCCESS });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, err: err.message });
    }
  },

  toggleLike: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const user: JwtSignPayload = res.locals.user;

      const likeRepository = getCustomRepository(LikeRepository);
      const likeExist = await likeRepository.getLike([
        { user_id: user.id, product_id: Number(productId) },
      ]);

      if (likeExist.length) {
        await likeRepository.deleteLike(user.id, [likeExist[0].id]);
        res.json({ ok: true, message: constant.DELETE_LIKE_SUCCESS });
        return;
      }
      await likeRepository.createLike([{ user_id: user.id, product_id: Number(productId) }]);
      res.json({ ok: true, message: constant.CREATE_LIKE_SUCCESS });
    } catch (err) {
      console.log(err.message);
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false });
    }
  },

  createLikes: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const user: JwtSignPayload = res.locals.user;

      const likeRepository = getCustomRepository(LikeRepository);
      const productsToLike = productId
        .split(',')
        .map((id) => ({ product_id: Number(id), user_id: user.id }));

      const likeExist = await likeRepository.getLike(productsToLike);
      const filteredToLike = filterExistItem(productsToLike, likeExist);
      await likeRepository.createLike(filteredToLike);
      res.json({ ok: true });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, err: err.message });
    }
  },

  deleteLike: async (req: Request, res: Response) => {
    try {
      const { ids } = req.body;
      const user: JwtSignPayload = res.locals.user;
      const likeRepository = getCustomRepository(LikeRepository);
      await likeRepository.deleteLike(user.id, ids);
      res.json({ ok: true, message: constant.DELETE_LIKE_SUCCESS });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, err: err.message });
    }
  },
};

export default UserController;
