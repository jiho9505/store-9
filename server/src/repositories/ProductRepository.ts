import { EntityRepository, Repository } from 'typeorm';

import { PRODUCT_GET_DETAIL, PRODUCT_GET_MAIN } from './constants/product';
import Product from '../entities/product';
import { OrderStatus } from '../../../shared/dtos/order/schema';
import { ProductSortBy } from '../../../shared/dtos/product/schema';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  async getDetail({ productId, userId = 0 }: { productId: number; userId?: number }) {
    const productPromise = await this.query(`
      SELECT p.*, IFNULL(l.id, 0) AS is_like
      FROM products p 
      LEFT JOIN (
        SELECT l.id, l.product_id
        FROM likes l
        WHERE l.user_id = ${userId}
      ) l
      ON p.id = l.product_id
      WHERE p.id = ${productId}
    `);

    const detailPromise = this.query(`
      SELECT pd.* 
      FROM product_details pd
      WHERE pd.product_id = ${productId}
    `);

    const likesPromise = this.query(`
      SELECT COUNT(l.id) AS like_count
      FROM likes l
      WHERE l.product_id = ${productId}
    `);

    const reviewsPromise = this.query(`
      SELECT r.*
      FROM reviews r
      WHERE r.product_id = ${productId}
      LIMIT ${PRODUCT_GET_DETAIL.DETAIL_REVIEW_LIMIT}
    `);

    const qnasPromise = this.query(`
      SELECT q.*
      FROM qnas q
      WHERE q.product_id = ${productId}
      LIMIT ${PRODUCT_GET_DETAIL.DETAIL_QNA_LIMIT}
    `);

    const [product, detail, likes, reviews, qnas] = await Promise.all([
      productPromise,
      detailPromise,
      likesPromise,
      reviewsPromise,
      qnasPromise,
    ]);

    return {
      product: product[0],
      detail: detail[0],
      likes,
      reviews,
      qnas,
    };
  }

  async getMain() {
    const bestProductsPromise = this.query(`
      SELECT 
        p.*, 
        SUM(o.amount) AS total_amount,
        c.name AS category_name
      FROM products p
      INNER JOIN (
        SELECT oi.amount, oi.product_id
        FROM order_items oi
        LEFT OUTER JOIN orders
        ON orders.id = oi.order_id
        WHERE orders.status = '${OrderStatus.PURCHASING_COMPLETE}'
      ) o
      ON p.id = o.product_id
      INNER JOIN categories c
      ON c.id = p.category_id
      GROUP BY p.id
      ORDER BY total_amount DESC
      LIMIT ${PRODUCT_GET_MAIN.MAIN_BEST_PRODUCT_LIMIT}
    `);

    const newProductsPromise = this.query(`
      SELECT p.* 
      FROM products p
      ORDER BY created_at DESC
      LIMIT ${PRODUCT_GET_MAIN.MAIN_NEW_PRODUCT_LIMIT}
    `);

    const recommendProductsPromise = this.query(`
      SELECT p.*, count(p.id) AS like_count
      FROM products p
      INNER JOIN likes l
      ON p.id = l.product_id
      WHERE p.category_id = 21
      GROUP BY p.id
      ORDER BY like_count DESC
      LIMIT ${PRODUCT_GET_MAIN.MAIN_RECOMMEND_PRODUCT_LIMIT}
    `);

    const discountProductsPromise = this.query(`
      SELECT p.*, SUM(o.amount) AS total_amount
      FROM products p
      INNER JOIN (
        SELECT oi.* 
        FROM order_items oi
        LEFT OUTER JOIN orders
        ON orders.id = oi.order_id
        WHERE orders.status = '${OrderStatus.PURCHASING_COMPLETE}'
      ) o
      ON p.id = o.product_id
      WHERE EXISTS (
        SELECT 1
        FROM discounts
        WHERE discounts.product_id = p.id
      )
      GROUP BY p.id
      ORDER BY total_amount DESC
      LIMIT ${PRODUCT_GET_MAIN.MAIN_DISCOUNT_PRODUCT_LIMIT}
    `);

    const [bestProducts, newProducts, recommendProducts, discountProducts] = await Promise.all([
      bestProductsPromise,
      newProductsPromise,
      recommendProductsPromise,
      discountProductsPromise,
    ]);

    return {
      bestProducts,
      newProducts,
      recommendProducts,
      discountProducts,
    };
  }

  async getProductsByCategory({
    search = '',
    categoryId,
    page = 0,
    size = 20,
    sortBy = ProductSortBy.RECOMMEND,
  }: {
    search?: string;
    categoryId?: number;
    page?: number;
    size?: number;
    sortBy?: ProductSortBy;
  }) {
    let QUERY: string;

    // TODO 검색 api
    // const name = Like(`%${search}%`);

    const whereCategory = `WHERE p.category_id ${categoryId ? `= ${categoryId}` : 'IS NOT NULL'}`;

    switch (sortBy) {
      case ProductSortBy.BEST:
        QUERY = `
          SELECT p.*, SUM(o.amount) AS total_amount
          FROM products p
          LEFT JOIN (
            SELECT oi.* 
            FROM order_items oi
            LEFT OUTER JOIN orders
            ON orders.id = oi.order_id
            WHERE orders.status = '${OrderStatus.PURCHASING_COMPLETE}'
          ) o
          ON p.id = o.product_id
          GROUP BY p.id
          ORDER BY total_amount DESC
          LIMIT ${size}
          OFFSET ${page * size}
        `;
        break;
      case ProductSortBy.NEW:
        QUERY = `
          SELECT p.* 
          FROM products p
          ${whereCategory}
          ORDER BY created_at DESC
          LIMIT ${size}
          OFFSET ${page * size}
        `;
        break;
      case ProductSortBy.RECOMMEND:
        QUERY = `
          SELECT p.*, COUNT(l.id) AS like_count 
          FROM products p 
          LEFT JOIN likes l 
          ON p.id = l.product_id 
          ${whereCategory}
          GROUP BY p.id 
          ORDER BY like_count DESC
          LIMIT ${size}
          OFFSET ${page * size}
        `;
        break;
      case ProductSortBy.HIGH_PRICE:
        QUERY = `
          SELECT p.*
          FROM products p
          ${whereCategory}
          ORDER BY p.price DESC
          LIMIT ${size}
          OFFSET ${page * size}
        `;
        break;
      case ProductSortBy.LOW_PRICE:
        QUERY = `
          SELECT p.*
          FROM products p
          ${whereCategory}
          ORDER BY p.price ASC
          LIMIT ${size}
          OFFSET ${page * size}
        `;
        break;
      default:
        throw Error(`The ${sortBy} is not defined in ProductSortBy enum`);
    }

    const productsPromise = this.query(QUERY);

    const totalCountPromise = this.query(`
      SELECT COUNT(p.id) AS total_count
      FROM products p
      ${whereCategory}
    `);

    const [products, totalCount] = await Promise.all([productsPromise, totalCountPromise]);

    return {
      products,
      totalCount,
    };
  }

  async createProduct({
    name,
    price,
    stock,
    thumbnail,
    content,
    categoryId,
  }: {
    name: string;
    price: number;
    thumbnail: string;
    stock: number;
    content: string;
    categoryId: number;
  }) {
    const result = await this.insert({
      name,
      price,
      stock,
      thumbnail,
      content,
      category_id: categoryId,
    });

    const product = this.findOne(result.identifiers[0].id);

    return product;
  }
}
