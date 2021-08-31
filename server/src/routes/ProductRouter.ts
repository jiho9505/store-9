import { Router } from 'express';

import ProductController from '../controllers/ProductController';
import AuthMiddleware from '../middlewares/auth';

const ProductRouter = Router();

ProductRouter.get('/main', ProductController.getMain);
ProductRouter.get('/list', ProductController.getList);
ProductRouter.post('/', ProductController.create);
ProductRouter.get('/:productId', AuthMiddleware.injectUserId, ProductController.getDetail);
ProductRouter.delete('/:productId', ProductController.remove);

export default ProductRouter;
