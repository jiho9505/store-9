import { OrderStatus } from '../../../../shared/dtos/order/schema';

interface OrderSeed {
  status: OrderStatus;
  hasShippingCharge: boolean;
  user_id: number;
}

const orderSeed: OrderSeed[] = [
  {
    status: OrderStatus.PURCHASING_COMPLETE,
    hasShippingCharge: false,
    user_id: 1,
  },
];

export default orderSeed;
