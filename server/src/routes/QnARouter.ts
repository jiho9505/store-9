import { Router } from 'express';
import QnAController from '../controllers/QnAController';

const QnARouter = Router();

QnARouter.get('/', QnAController.getList);
QnARouter.post('/', QnAController.create);
QnARouter.put('/', QnAController.update);
QnARouter.delete('/:qnaId', QnAController.remove);

export default QnARouter;
