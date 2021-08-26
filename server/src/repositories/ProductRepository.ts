import { EntityRepository, Repository } from 'typeorm';

import { PRODUCT_GET_DETAIL, PRODUCT_GET_MAIN, PRODUCT_QUERY } from './constants/product';
import Product from '../entities/product';
import { OrderStatus } from '../../../shared/dtos/order/schema';
import { ProductSortBy } from '../../../shared/dtos/product/schema';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  async getDetail({ productId, userId = 0 }: { productId: number; userId?: number }) {
    const product = await this.query(`
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

    const reviews = await this.query(`
      SELECT r.*, ju.name AS username
      FROM reviews r
      LEFT JOIN (
        SELECT u.id, u.name
        FROM users u
      ) ju
      ON r.user_id = ju.id
      WHERE r.product_id = ${productId}
      LIMIT ${PRODUCT_GET_DETAIL.DETAIL_REVIEW_LIMIT}
    `);

    const qnas = await this.query(`
      SELECT q.*, ju.name AS username
      FROM qnas q
      LEFT JOIN (
        SELECT u.id, u.name
        FROM users u
      ) ju
      ON q.user_id = ju.id
      WHERE q.product_id = ${productId}
      LIMIT ${PRODUCT_GET_DETAIL.DETAIL_QNA_LIMIT}
    `);

    // const recommendProducts = await this.query(`
    //   SELECT
    //     p.*,
    //     ${PRODUCT_QUERY.COMMON_SELECT}
    //   FROM products p
    //   LEFT JOIN (
    //     SELECT SUM(oi.amount) AS sold_cnt, oi.product_id
    //     FROM order_items oi
    //     GROUP BY oi.product_id
    //   ) joi
    //   ON joi.product_id = p.id
    //   ${PRODUCT_QUERY.COMMON_LEFT_JOIN}
    //   ORDER BY joi.sold_cnt DESC
    //   LIMIT 10
    // `);

    const productTotalSoldAmount = await this.query(`
      SELECT SUM(oi.amount) AS product_total_amount
      FROM order_items oi
      GROUP BY oi.product_id
    `);

    const productCnt = await this.count();

    return {
      product: product[0],
      reviews,
      qnas,
      // recommendProducts,
      productTotalSoldAmount,
      productCnt,
    };
  }

  async getMain() {
    const bestProductsPromise = this.query(`
      SELECT 
        p.*, 
        SUM(o.amount) AS total_amount,
        c.name AS category_name, 
        ${PRODUCT_QUERY.COMMON_SELECT}
      FROM products p
      LEFT JOIN (
        SELECT oi.amount, oi.product_id
        FROM order_items oi
        LEFT OUTER JOIN orders
        ON orders.id = oi.order_id
        WHERE orders.status = '${OrderStatus.PURCHASING_COMPLETE}'
      ) o
      ON p.id = o.product_id
      INNER JOIN categories c
      ON c.id = p.category_id
      ${PRODUCT_QUERY.COMMON_LEFT_JOIN}
      GROUP BY p.id
      ORDER BY total_amount DESC
      LIMIT ${PRODUCT_GET_MAIN.MAIN_BEST_PRODUCT_LIMIT}
    `);

    const newProductsPromise = this.query(`
      SELECT 
        p.*, 
        SUM(o.amount) AS total_amount,
        ${PRODUCT_QUERY.COMMON_SELECT}
      FROM products p
      ${PRODUCT_QUERY.COMMON_LEFT_JOIN}
      LEFT JOIN (
        SELECT oi.amount, oi.product_id
        FROM order_items oi
        LEFT OUTER JOIN orders
        ON orders.id = oi.order_id
        WHERE orders.status = '${OrderStatus.PURCHASING_COMPLETE}'
      ) o
      ON p.id = o.product_id
      GROUP BY p.id
      ORDER BY created_at DESC
      LIMIT ${PRODUCT_GET_MAIN.MAIN_NEW_PRODUCT_LIMIT}
    `);

    const discountProductsPromise = this.query(`
      SELECT 
        p.*, 
        SUM(o.amount) AS total_amount, 
        ${PRODUCT_QUERY.COMMON_SELECT}
      FROM products p
      INNER JOIN (
        SELECT oi.* 
        FROM order_items oi
        LEFT OUTER JOIN orders
        ON orders.id = oi.order_id
        WHERE orders.status = '${OrderStatus.PURCHASING_COMPLETE}'
      ) o
      ON p.id = o.product_id
      ${PRODUCT_QUERY.COMMON_LEFT_JOIN}
      WHERE EXISTS (
        SELECT 1
        FROM discounts
        WHERE discounts.product_id = p.id
      )
      GROUP BY p.id
      ORDER BY total_amount DESC
      LIMIT ${PRODUCT_GET_MAIN.MAIN_DISCOUNT_PRODUCT_LIMIT}
    `);

    const productTotalSoldAmountPromise = this.query(`
      SELECT SUM(oi.amount) AS product_total_amount
      FROM order_items oi
      GROUP BY oi.product_id
    `);

    const productCntPromise = this.count();

    const [bestProducts, newProducts, discountProducts, productTotalSoldAmount, productCnt] =
      await Promise.all([
        bestProductsPromise,
        newProductsPromise,
        discountProductsPromise,
        productTotalSoldAmountPromise,
        productCntPromise,
      ]);

    return {
      bestProducts,
      newProducts,
      discountProducts,
      productTotalSoldAmount,
      productCnt,
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
          SELECT 
            p.*, 
            SUM(o.amount) AS total_amount,
            ${PRODUCT_QUERY.COMMON_SELECT}
          FROM products p
          LEFT JOIN (
            SELECT oi.* 
            FROM order_items oi
            LEFT OUTER JOIN orders
            ON orders.id = oi.order_id
            WHERE orders.status = '${OrderStatus.PURCHASING_COMPLETE}'
          ) o
          ON p.id = o.product_id
          ${PRODUCT_QUERY.COMMON_LEFT_JOIN}
          GROUP BY p.id
          ORDER BY total_amount DESC
          LIMIT ${size}
          OFFSET ${page * size}
        `;
        break;
      case ProductSortBy.NEW:
        QUERY = `
          SELECT 
            p.*,
            ${PRODUCT_QUERY.COMMON_SELECT}
          FROM products p
          ${PRODUCT_QUERY.COMMON_LEFT_JOIN}
          ${whereCategory}
          ORDER BY created_at DESC
          LIMIT ${size}
          OFFSET ${page * size}
        `;
        break;
      case ProductSortBy.RECOMMEND:
        QUERY = `
          SELECT 
            p.*, 
            COUNT(l.id) AS like_count,
            ${PRODUCT_QUERY.COMMON_SELECT}
          FROM products p 
          LEFT JOIN likes l 
          ON p.id = l.product_id 
          ${PRODUCT_QUERY.COMMON_LEFT_JOIN}
          ${whereCategory}
          GROUP BY p.id 
          ORDER BY like_count DESC
          LIMIT ${size}
          OFFSET ${page * size}
        `;
        break;
      case ProductSortBy.HIGH_PRICE:
        QUERY = `
          SELECT 
            p.*,
            ${PRODUCT_QUERY.COMMON_SELECT}
          FROM products p
          ${PRODUCT_QUERY.COMMON_LEFT_JOIN}
          ${whereCategory}
          ORDER BY p.price DESC
          LIMIT ${size}
          OFFSET ${page * size}
        `;
        break;
      case ProductSortBy.LOW_PRICE:
        QUERY = `
          SELECT 
            p.*,
            ${PRODUCT_QUERY.COMMON_SELECT}
          FROM products p
          ${PRODUCT_QUERY.COMMON_LEFT_JOIN}
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

    const totalCountByCategoryPromise = this.query(`
      SELECT COUNT(p.id) AS total_count
      FROM products p
      ${whereCategory}
    `);

    const productTotalSoldAmountPromise = this.query(`
    SELECT SUM(oi.amount) AS product_total_amount
    FROM order_items oi
    GROUP BY oi.product_id
  `);

    const totalProductCountPromise = this.count();

    const [products, totalCountByCategory, productTotalSoldAmount, totalProductCount] =
      await Promise.all([
        productsPromise,
        totalCountByCategoryPromise,
        productTotalSoldAmountPromise,
        totalProductCountPromise,
      ]);

    return {
      products,
      totalCountByCategory,
      productTotalSoldAmount,
      totalProductCount,
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
