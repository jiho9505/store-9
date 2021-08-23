import { AddressSchema } from '../address/schema';

export interface UserSchema {
  id: number;
  loginId?: string;
  password?: string;
  confirmPassword?: string;
  name: string;
  email: string;
  phoneNumber: string;
  callNumber?: string;
  birth?: Date;
  address?: AddressSchema[];
}
