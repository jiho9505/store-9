import { AddressSchema } from '../address/schema';

namespace UserResponse {
  export type GetMyInfo = {
    username: string;
    loginId: string;
    address: string;
  };

  export type GetLikeList = {
    id: number;
    name: string;
    thumbnail: string;
    price: string;
  }[];

  export type GetAddress = AddressSchema[];

  export type CreateAddress = AddressSchema;

  export type UpdateAddress = AddressSchema;
}

export default UserResponse;
