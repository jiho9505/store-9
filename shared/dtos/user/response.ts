import { AddressSchema } from '../address/schema';
import { ProductSchema } from '../product/schema';
import { UserSchema } from './schema';

namespace UserResponse {
  export type GetMyInfo = UserSchema & {};

  export type GetLikes = ProductSchema[];

  export type GetAddress = AddressSchema[];

  export type CreateAddress = AddressSchema;

  export type UpdateAddress = AddressSchema;
}

export default UserResponse;
