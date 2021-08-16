import { makeAutoObservable } from 'mobx';

import { AddressSchema } from '@shared/dtos/address/schema';

export default class AddressModel implements AddressSchema {
  postalCode: number;
  address1: string;
  address2: string;

  constructor(dto: AddressSchema) {
    Object.assign(this, dto);

    makeAutoObservable(this);
  }

  static create(dto: AddressSchema) {
    return new AddressModel(dto);
  }
}
