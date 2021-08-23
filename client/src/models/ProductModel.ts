import { makeAutoObservable } from 'mobx';

import { ProductSchema } from '@shared/dtos/product/schema';
import BadgeModel from './BadgeModel';
import CategoryModel from './CategoryModel';
import ProductDetailModel from './ProductDetailModel';
import { setLike } from '@/remotes/UserRemote';

export default class ProductModel implements ProductSchema {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  stock: number;
  isLike: boolean;
  category: CategoryModel;
  badge: BadgeModel;
  detail: ProductDetailModel;

  constructor(dto: ProductSchema) {
    Object.assign(this, dto);

    this.category = CategoryModel.create(dto.category);
    this.badge = BadgeModel.create(dto.badge);
    this.detail = ProductDetailModel.create(dto.detail);

    makeAutoObservable(this);
  }

  static create(dto: ProductSchema) {
    return new ProductModel(dto);
  }

  async changeLike() {
    const isSuccess = await setLike({ isLike: this.isLike, productId: this.id });

    if (isSuccess) {
      this.isLike = !this.isLike;
    }
  }
}
