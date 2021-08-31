import { AddressSchema } from '../address/schema';

namespace UserResponse {
  export type GetMyInfo = {
    username: string;
    loginId: string;
    address: string;
  };

  export type GetLikeList = {
    likes: {
      id: number;
      product_id: number;
      product: {
        name: string;
        price: string;
        thumbnamil: string;
      };
    }[];
    totalCount: number;
  };

  export type GetAddress = AddressSchema[];

  export type CreateAddress = AddressSchema;

  export type UpdateAddress = AddressSchema;
}

export default UserResponse;
