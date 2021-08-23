import { Router } from 'express';

import ProductController from '../controllers/ProductController';

const ProductRouter = Router();

ProductRouter.get('/main', ProductController.getMain);
ProductRouter.get('/list', ProductController.getList);
ProductRouter.post('/', ProductController.create);
ProductRouter.get('/:productId', ProductController.getDetail);
ProductRouter.delete('/:productId', ProductController.remove);

export default ProductRouter;
