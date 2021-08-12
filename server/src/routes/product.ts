import { Router } from 'express';
import ProductController from '../controllers/product';
import AuthMiddleware from '../middlewares/auth';

const ProductRouter = Router();

ProductRouter.post('/', AuthMiddleware.checkAdmin, ProductController.create);

export default ProductRouter;
