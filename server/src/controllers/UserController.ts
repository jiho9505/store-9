import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { LikeRepository } from '../repositories/LikeRepository';
import { JwtSignPayload } from '../utils/types';
import constant from '../utils/constant';

const UserController = {
  getLikeLists: async (req: Request, res: Response) => {
    try {
      const user: JwtSignPayload = res.locals.user;
      const likeRepository = getCustomRepository(LikeRepository);
      const [likes, totalCount] = await likeRepository.getLikes(user.id);
      res.json({ ok: true, data: { likes, totalCount }, message: constant.GET_LIKE_SUCCESS });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, err: err.message });
    }
  },

  createLike: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const user: JwtSignPayload = res.locals.user;

      const likeRepository = getCustomRepository(LikeRepository);
      const likeExist = await likeRepository.getLike(user.id, Number(productId));

      if (likeExist) {
        res.status(constant.STATUS_CONFLICT).json({ ok: false, message: constant.LIKE_DUPLICATE });
        return;
      }
      await likeRepository.createLike({ user_id: user.id, product_id: productId });
      res.json({ ok: true, message: constant.CREATE_LIKE_SUCCESS });
    } catch (err) {
      console.log(err.message);
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false });
    }
  },

  deleteLike: async (req: Request, res: Response) => {
    try {
      const { ids } = req.body;
      const user: JwtSignPayload = res.locals.user;
      const likeRepository = getCustomRepository(LikeRepository);
      await likeRepository.deleteLike(user.id, ids);
      res.json({ ok: true, message: constant.DELETE_REVIEW_SUCCESS });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, err: err.message });
    }
  },
};

export default UserController;
