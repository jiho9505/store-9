import QnARequest from '@shared/dtos/qna/request';
import QnAResponse from '@shared/dtos/qna/response';
import BaseApi from './BaseApi';

class QnaApi extends BaseApi {
  getList(params = {}) {
    return this.get<QnAResponse.GetList>('/', { isRequiredLogin: true, ...params });
  }

  create(body: QnARequest.Create) {
    return this.post<QnAResponse.Create>('/', body, { isRequiredLogin: true });
  }

  update(body: QnARequest.Update) {
    return this.put<QnAResponse.Update>('/', body, { isRequiredLogin: true });
  }

  remove({ qnaId }: QnARequest.Remove) {
    return this.delete(`/${qnaId}`, { isRequiredLogin: true });
  }
}

export default new QnaApi('qnas');
