import { AddressSchema } from '../address/schema';

namespace UserReqeust {
  export type Like = {
    productId: number;
  };

  export type Likes = {
    productId: number[];
  };

  export type getLikeList = {};

  export type CreateAddress = AddressSchema;

  export type UpdateAddress = AddressSchema;

  export type RemoveAddress = { addressId: number };
}

export default UserReqeust;
