import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ReviewRepository } from '../repositories/review_repository';
import { JwtSignPayload } from '../utils/types';
import constant from '../utils/constant';
import { convertImageFilesToUrlArray } from '../../src/utils/review';
import { UserRepository } from '../repositories/user_repositiory';

type ReviewProps = {
  title: string;
  content: string;
  product_id: number;
  user_id: number;
  images: string;
};

const ReviewController = {
  getUserReviews: async (req: Request, res: Response) => {
    try {
      const user: JwtSignPayload = res.locals.user;

      const reviewRepository = getCustomRepository(ReviewRepository);
      const reviews = await reviewRepository.getReviews(user.id);

      res.json({ ok: true, reviews, message: constant.GET_REVIEW_SUCCEESS });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, err: err.message });
    }
  },
  getProductUserReview: async (req: Request, res: Response) => {
    try {
      const user_id = res.locals.user.id;
      const product_id = Number(req.params.productId);

      const reviewRepository = getCustomRepository(ReviewRepository);
      const review = await reviewRepository.getReview(user_id, product_id);
      res.json({ ok: true, review, message: constant.GET_REVIEW_SUCCESS });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, message: err.message });
    }
  },
  createUserReview: async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;
      const product_id = Number(req.params.productId);
      const images = req.files;
      const user_id = res.locals.user.id;
      const review: ReviewProps = {
        title,
        content,
        product_id: Number(product_id),
        user_id,
        images: convertImageFilesToUrlArray(images),
      };

      const reviewRepository = getCustomRepository(ReviewRepository);
      const reviewExist = await reviewRepository.getReview(user_id, product_id);
      if (reviewExist) {
        res
          .status(constant.STATUS_CONFLICT)
          .json({ ok: false, message: constant.REVIEW_DUPLICATE });
        return;
      }
      await reviewRepository.createReview(review);
      res.json({ ok: true, message: constant.CREATE_REVIEW_SUCCESS });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, err: err.message });
    }
  },
  updateUserReview: async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;
      const images = req.files;
      const product_id = Number(req.params.productId);
      const user_id = res.locals.user.id;
      const oldReviewCondition = {
        user_id,
        product_id,
      };
      const newReview = {
        title,
        content,
        images: convertImageFilesToUrlArray(images),
      };

      const reviewRepository = getCustomRepository(ReviewRepository);
      await reviewRepository.updateReview(oldReviewCondition, newReview);
      res.json({ ok: true, message: constant.UPDATE_REVIEW_SUCCESS });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, err: err.message });
    }
  },
  deleteUserReview: async (req: Request, res: Response) => {
    try {
      const product_id = Number(req.params.productId);
      const userId = res.locals.user.id;

      const reviewRepository = getCustomRepository(ReviewRepository);
      await reviewRepository.deleteReview(userId, product_id);
      res.json({ ok: true, message: constant.DELETE_REVIEW_SUCCESS });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, err: err.message });
    }
  },
};

export default ReviewController;
