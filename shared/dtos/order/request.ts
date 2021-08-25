namespace OrderRequest {
  export type GetList = {
    startDate?: Date;
    endDate?: Date;
    page?: number;
    size?: number;
  };

  export type Order = {
    buyerName: string;
    phone: string;
    email: string;
    receiverName: string;
    receiverAddress: string;
    receiverPhone: string;
  };

  export type AddCartItem = {
    productId: number;
    amount: number;
  };

  export type UpdateCartItem = {
    orderItemId: number;
    amount: number;
  };

  export type RemoveCartItem = {
    orderItemId: number;
  };
}

export default OrderRequest;
