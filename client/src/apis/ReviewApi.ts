import BaseApi from './BaseApi';
import ReviewResponse from '@shared/dtos/review/response';
import ReviewRequest from '@shared/dtos/review/request';

class ReviewApi extends BaseApi {
  getList() {
    return this.get<ReviewResponse.GetList>('/', { isRequiredLogin: true });
  }

  create(body: ReviewRequest.Create) {
    return this.post('/', body, { isRequiredLogin: true });
  }

  update(id: number, body: ReviewRequest.Update) {
    return this.put(`/${id}`, body, { isRequiredLogin: true });
  }

  remove({ reviewId }: ReviewRequest.Remove) {
    return this.delete(`/${reviewId}`, { isRequiredLogin: true });
  }
}

export default new ReviewApi('reviews');
