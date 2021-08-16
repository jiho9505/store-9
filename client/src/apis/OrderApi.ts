import OrderResponse from '@shared/dtos/order/response';
import OrderRequest from '@shared/dtos/order/request';
import BaseApi from './BaseApi';

class OrderApi extends BaseApi {
  getList(params: OrderRequest.GetList) {
    return this.get<OrderResponse.getList>('/', { params, isRequiredLogin: true });
  }

  order(body: OrderRequest.Order) {
    return this.post('/', body, { isRequiredLogin: true });
  }

  cancle({ orderId }: OrderRequest.Cancel) {
    return this.delete(`/${orderId}`, { isRequiredLogin: true });
  }

  getCart() {
    return this.get<OrderResponse.getCart>('/carts', { isRequiredLogin: true });
  }

  addToCart(body: OrderRequest.AddToCart) {
    return this.post('/carts', body, { isRequiredLogin: true });
  }

  updateCart(body) {
    return this.put('/carts', body, { isRequiredLogin: true });
  }

  deleteCartItem({ orderItemId }: OrderRequest.DeleteCartItem) {
    return this.delete(`/carts/${orderItemId}`, { isRequiredLogin: true });
  }
}

export default new OrderApi('/orders');
