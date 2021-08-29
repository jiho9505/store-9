import { EntityRepository, Like, Repository } from 'typeorm';

import { PRODUCT_GET_DETAIL, PRODUCT_GET_MAIN, PRODUCT_QUERY } from './constants/product';
import Product from '../entities/product';
import { OrderStatus } from '../../../shared/dtos/order/schema';
import { ProductSortBy } from '../../../shared/dtos/product/schema';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  async getDetail({ productId, userId = 0 }: { productId: number; userId?: number }) {
    const product = await this.query(`
      SELECT p.*, IFNULL(l.id, 0) AS is_like, IFNULL(jo.order_item_product_id, 0) as is_bought
      FROM products p 
      LEFT JOIN (
        SELECT l.id, l.product_id
        FROM likes l
        WHERE l.user_id = ${userId}
      ) l
      ON p.id = l.product_id
      LEFT JOIN (
        SELECT o.*, joi.product_id as order_item_product_id
        FROM orders o
        INNER JOIN (
          SELECT oi.*
          FROM order_items oi
        ) joi
        ON joi.order_id = o.id
      ) jo
      ON jo.user_id = ${userId} AND jo.order_item_product_id = ${productId}
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
      ORDER BY r.created_at DESC
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
      ORDER BY q.created_at DESC
    `);

    const recommendProducts = await this.query(`
      SELECT
        p.*,
        ${PRODUCT_QUERY.COMMON_SELECT}
      FROM products p
      LEFT JOIN (
        SELECT SUM(oi.amount) AS sold_cnt, oi.product_id
        FROM order_items oi
        GROUP BY oi.product_id
      ) joi
      ON joi.product_id = p.id
      ${PRODUCT_QUERY.COMMON_LEFT_JOIN}
      ORDER BY RAND()
      LIMIT ${PRODUCT_GET_DETAIL.DETAIL_RECOMMEND_PRODUCT_LIMIT}
    `);

    const soldProductAmounts = await this.query(`
      SELECT SUM(oi.amount) AS sold_product_amount
      FROM order_items oi
      GROUP BY oi.product_id
    `);

    const totalProductCount = await this.count();

    return {
      product: product[0],
      reviews,
      qnas,
      recommendProducts,
      soldProductAmounts,
      totalProductCount,
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
      WHERE p.stock != 0
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
      WHERE p.stock != 0
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
      AND p.stock != 0
      GROUP BY p.id
      ORDER BY total_amount DESC
      LIMIT ${PRODUCT_GET_MAIN.MAIN_DISCOUNT_PRODUCT_LIMIT}
    `);

    const soldProductAmountPromise = this.query(`
      SELECT SUM(oi.amount) AS sold_product_amount
      FROM order_items oi
      GROUP BY oi.product_id
    `);

    const totalProductCountPromise = this.count();

    const [bestProducts, newProducts, discountProducts, soldProductAmounts, totalProductCount] =
      await Promise.all([
        bestProductsPromise,
        newProductsPromise,
        discountProductsPromise,
        soldProductAmountPromise,
        totalProductCountPromise,
      ]);

    return {
      bestProducts,
      newProducts,
      discountProducts,
      soldProductAmounts,
      totalProductCount,
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

    const whereName = `p.name LIKE '%${search}%'`;

    let parentCategories = await this.query(`
      SELECT id
      FROM categories
      WHERE parent_id IS NULL
    `);

    parentCategories = parentCategories.map(({ id }) => id);

    const isParentCategory = parentCategories.includes(Number(categoryId));

    let whereCategory = '';

    if (isParentCategory) {
      let childrenCategoryIds = await this.query(`
        select c.id
        from categories c
        where c.parent_id = ${categoryId}
      `);

      childrenCategoryIds = childrenCategoryIds.map(({ id }) => id);

      whereCategory = `WHERE p.category_id IN (${childrenCategoryIds.join(',')})`;
    } else {
      whereCategory = `WHERE p.category_id ${
        categoryId ? `= ${categoryId}` : 'IS NOT NULL'
      } AND ${whereName}`;
    }

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

    const soldProductAmountPromise = this.query(`
    SELECT SUM(oi.amount) AS sold_product_amount
    FROM order_items oi
    GROUP BY oi.product_id
  `);

    const totalProductCountPromise = this.count();

    const [products, totalCountByCategory, soldProductAmounts, totalProductCount] =
      await Promise.all([
        productsPromise,
        totalCountByCategoryPromise,
        soldProductAmountPromise,
        totalProductCountPromise,
      ]);

    return {
      products,
      totalCountByCategory,
      soldProductAmounts,
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

  async getProductNames() {
    const result = await this.query(`
      select name 
      from products
    `);

    return result;
  }
}
