import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';

const CategoryRouter = Router();

CategoryRouter.get('/', CategoryController.getCategories);

export default CategoryRouter;
