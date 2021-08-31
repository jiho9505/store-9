import { OrderItemSchema } from '../order-item/schema';

namespace OrderResponse {
  export type GetList = {
    totalCount: number;
    orders: {
      id: number;
      orderItems: {
        id: number;
        productName: string;
        thumbnail: string;
        price: number;
        amount: number;
        isReviewed: null | number;
      }[];
      updatedAt: Date;
    }[];
  };

  export type GetCart = {
    id?: number;
    orderItems?: {
      id: number;
      amount: number;
      product: {
        id: number;
        name: string;
        price: number;
        thumbnail: string;
      };
    }[];
  };

  export type Order = {
    totalPrice: number;
    hasShippingCharging: boolean;
  };

  export type AddCartItem = OrderItemSchema;
}

export default OrderResponse;
