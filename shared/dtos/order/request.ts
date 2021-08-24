namespace OrderRequest {
  export type Order = {
    orderId: number;
  };

  export type Cancel = {
    orderId: number;
  };

  export type AddCartItem = {
    productId: number;
    amount: number;
  };

  export type UpdateCartItem = {
    orderItemId: number;
    amount: number;
  };

  export type GetList = {
    start?: string;
    end?: string;
  };

  export type RemoveCartItem = {
    orderItemId: number;
  };
}

export default OrderRequest;
