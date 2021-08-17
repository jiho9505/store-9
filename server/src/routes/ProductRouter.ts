import { Router } from 'express';

import ProductController from '../controllers/ProductController';
import AuthMiddleware from '../middlewares/auth';

const ProductRouter = Router();

ProductRouter.post('/', AuthMiddleware.checkAdmin, ProductController.create);

export default ProductRouter;
