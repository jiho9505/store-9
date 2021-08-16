import { makeObservable, observable } from 'mobx';

import { UserSchema } from '@shared/dtos/user/schema';
import AddressModel from './AddressModel';

export default class UserModel implements UserSchema {
  id: number;
  userId: string;
  name: string;
  email: string;
  birth: Date;
  phone: string;
  callNumber?: string;
  address?: AddressModel[];

  constructor(dto: UserSchema) {
    Object.assign(this, dto);

    this.birth = new Date(dto.birth);
    this.address = dto.address.map(AddressModel.create);

    makeObservable(this, {
      name: observable,
      email: observable,
      birth: observable,
      phone: observable,
      callNumber: observable,
      address: observable,
    });
  }

  static create(dto: UserSchema) {
    return new UserModel(dto);
  }
}
