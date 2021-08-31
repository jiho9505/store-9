import { BadgeSchema } from '@shared/dtos/product/schema';

export default class BadgeModel implements BadgeSchema {
  isBest: boolean;
  isGreen: boolean;
  isDiscount: boolean;
  isNew: boolean;

  constructor(dto: BadgeSchema) {
    Object.assign(this, dto);
  }

  static create(dto: BadgeSchema) {
    return new BadgeModel(dto);
  }
}
