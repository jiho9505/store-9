import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
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
      console.log(err.message);
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, err: err.message });
    }
  },
};

export default UserController;
