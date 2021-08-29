import { Router } from 'express';
import QnAController from '../controllers/QnAController';
import AuthMiddleware from '../middlewares/auth';

const QnARouter = Router();

QnARouter.use(AuthMiddleware.checkLogin);
QnARouter.get('/', QnAController.getList);
QnARouter.post('/', QnAController.create);
QnARouter.put('/', QnAController.update);
QnARouter.delete('/:qnaId', QnAController.remove);

export default QnARouter;
