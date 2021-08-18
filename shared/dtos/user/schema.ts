import { AddressSchema } from '../address/schema';

export interface UserSchema {
  id: number;
  userId: string;
  password?: string;
  name: string;
  email: string;
  phone: string;
  callNumber?: string;
  birth: Date;
  address?: AddressSchema[];
}
