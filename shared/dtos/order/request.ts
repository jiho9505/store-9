namespace OrderRequest {
  export type Order = {
    orderId: number;
  };

  export type Cancel = {
    orderId: number;
  };

  export type AddToCart = {
    productId: number;
    option: any;
  };

  export type GetList = {
    start?: Date;
    end?: Date;
  };

  export type DeleteCartItem = {
    orderItemId: number;
  };
}

export default OrderRequest;
