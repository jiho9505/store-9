import { OrderSchema, OrderStatus } from '@shared/dtos/order/schema';
import { computed, makeAutoObservable, makeObservable } from 'mobx';
import OrderItemModel from './OrderItemModel';

export default class OrderModel implements OrderSchema {
  id: number;
  userId: number;
  isReviewed: boolean;
  orderItems: OrderItemModel[];
  status: OrderStatus;
  createdDate: Date;
  createdAt: string;

  constructor(dto: OrderSchema) {
    Object.assign(this, dto);
    this.createdDate = new Date(dto.createdAt);
    this.orderItems = dto.orderItems.map(OrderItemModel.create);

    makeObservable(this, {
      tatalAmount: computed,
      isCart: computed,
    });
  }

  static create(dto: OrderSchema) {
    return new OrderModel(dto);
  }

  get isCart() {
    return this.status === OrderStatus.IN_CART;
  }

  get tatalAmount() {
    return this.orderItems.reduce((acc, cur) => acc + cur.amount * cur.product.price, 0);
  }
}
