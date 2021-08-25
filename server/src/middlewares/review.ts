import { NextFunction, Request, MiddlewareResponse } from 'express';
import Review from 'src/entities/review';
import { getCustomRepository } from 'typeorm';

import { ReviewRepository } from '../repositories/review_repository';
import constant from '../utils/constant';

const ReviewMiddleware = {
  checkReviewExist: async (req: Request, res: MiddlewareResponse, next: NextFunction) => {
    const product_id = Number(req.params.productId);
    const user_id = res.locals.user.id;
    const reviewRepository = getCustomRepository(ReviewRepository);
    const reviewExist = await reviewRepository.getReview(user_id, product_id);

    if (!reviewExist) {
      res.json({ ok: false, message: constant.REVIEW_NOT_EXIST });
      return;
    }
    res.locals.review = reviewExist;
    next();
  },
};

export default ReviewMiddleware;
