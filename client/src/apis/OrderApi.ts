import OrderResponse from '@shared/dtos/order/response';
import OrderRequest from '@shared/dtos/order/request';
import BaseApi from './BaseApi';

class OrderApi extends BaseApi {
  getList(params: OrderRequest.GetList = {}) {
    return this.get<OrderResponse.GetList>('/', { params, isRequiredLogin: true });
  }

  order(body: OrderRequest.Order) {
    return this.post('/', body, { isRequiredLogin: true });
  }

  getCart() {
    return this.get<OrderResponse.GetCart>('/cart', { isRequiredLogin: true });
  }

  addCartItem(body: OrderRequest.AddCartItem) {
    return this.post<OrderResponse.AddCartItem>('/cart', body, { isRequiredLogin: true });
  }

  updateCartItem(body: OrderRequest.UpdateCartItem) {
    return this.put('/cart', body, { isRequiredLogin: true });
  }

  removeCartItem({ orderItemId }: OrderRequest.RemoveCartItem) {
    return this.delete(`/cart/${orderItemId}`, { isRequiredLogin: true });
  }
}

export default new OrderApi('/orders');
