interface OrderItemSeed {
  order_id: number;
  user_id: number;
  amount: number;
}

const orderItemSeed: OrderItemSeed[] = [
  {
    order_id: 1,
    user_id: 1,
    amount: 2,
  },
];

export default orderItemSeed;
