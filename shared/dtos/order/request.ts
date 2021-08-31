namespace OrderRequest {
  export type GetList = {
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
  };

  export type Order = {
    id: number;
    buyerName: string;
    phone: string;
    email: string;
    receiverName: string;
    receiverAddress: string;
    receiverPhone: string;
    selectedItem: number[];
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
    orderItemId: number[];
  };
}

export default OrderRequest;
