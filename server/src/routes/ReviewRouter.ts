import { Router } from 'express';
import ReviewMiddleware from '../middlewares/review';

import ReviewController from '../controllers/ReviewController';
import AuthMiddleware from '../middlewares/auth';
import FileMiddleware from '../middlewares/file';

const ReviewRouter = Router();

ReviewRouter.use(AuthMiddleware.checkLogin);
ReviewRouter.get('/', ReviewController.getUserReviews);
ReviewRouter.get('/:productId', ReviewController.getProductUserReview);
ReviewRouter.post('/:productId', FileMiddleware.dataUpload, ReviewController.createUserReview);
ReviewRouter.use('/:productId', ReviewMiddleware.checkReviewExist);
ReviewRouter.put('/:productId', FileMiddleware.dataUpload, ReviewController.updateUserReview);
ReviewRouter.delete('/:productId', ReviewController.deleteUserReview);

export default ReviewRouter;
