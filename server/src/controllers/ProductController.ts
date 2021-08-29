import { getCustomRepository } from 'typeorm';

import ProductRepository from '../repositories/ProductRepository';
import ProductRequest from '../../../shared/dtos/product/request';
import ProductResponse from '../../../shared/dtos/product/response';
import createProduct from '../utils/product';
import constant from '../utils/constant';

namespace ProductController {
  export const getMain: RouteHandler<null, ProductResponse.GetMain> = async (req, res) => {
    try {
      const { bestProducts, discountProducts, newProducts, soldProductAmounts, totalProductCount } =
        await getCustomRepository(ProductRepository).getMain();

      const formatProduct = createProduct({
        soldProductAmounts: soldProductAmounts.map(
          ({ sold_product_amount }) => sold_product_amount
        ),
        totalProductCount: totalProductCount,
      });

      res.json({
        ok: true,
        data: {
          bestProducts: bestProducts.map(formatProduct),
          newProducts: newProducts.map(formatProduct),
          discountProducts: discountProducts.map(formatProduct),
        },
      });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false, message: constant.PRODUCT_LOAD_FAILURE });
    }
  };

  export const getList: RouteHandler<ProductRequest.GetList, ProductResponse.GetList> = async (
    req,
    res
  ) => {
    try {
      const { categoryId, page, search, size, sortBy } = req.query;

      const { soldProductAmounts, totalProductCount, products, totalCountByCategory } =
        await getCustomRepository(ProductRepository).getProductsByCategory({
          categoryId: Number(categoryId),
          page,
          size,
          search: decodeURIComponent(search),
          sortBy,
        });

      const formatProduct = createProduct({
        soldProductAmounts: soldProductAmounts.map(
          ({ sold_product_amount }) => sold_product_amount
        ),
        totalProductCount: totalProductCount,
      });

      res.json({
        ok: true,
        data: {
          products: products.map(formatProduct),
          totalCount: Number(totalCountByCategory[0]['total_count']),
        },
      });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false, message: constant.PRODUCT_LOAD_FAILURE });
    }
  };

  export const getDetail: RouteHandler<ProductRequest.GetDetail, ProductResponse.GetDetail> =
    async (req, res) => {
      try {
        const userId = res.locals?.user?.id || 1;
        const { productId } = req.params;

        const { product, reviews, qnas, recommendProducts, totalProductCount, soldProductAmounts } =
          await getCustomRepository(ProductRepository).getDetail({
            productId,
            userId,
          });

        const formatProduct = createProduct({
          soldProductAmounts: soldProductAmounts.map(
            ({ sold_product_amount }) => sold_product_amount
          ),
          totalProductCount: totalProductCount,
        });

        res.json({
          ok: true,
          data: {
            productId: Number(productId),
            name: product.name,
            price: Number(product.price),
            stock: Number(product.stock),
            thumbnail: product.thumbnail,
            contentImages: product.content?.split(';')?.filter(Boolean),
            discountRate: product.discount_rate,
            isLike: product.is_like !== '0',
            isBuy: product.is_bought !== '0',
            reviews: reviews.map((review) => ({
              id: review.id,
              title: review.title,
              content: review.content,
              rate: review.rate,
              username: review.username,
              createdAt: review.created_at,
            })),
            qnas: qnas.map((qna) => ({
              id: qna.id,
              title: qna.title,
              content: qna.content,
              username: qna.username,
              createdAt: qna.created_at,
              isPrivate: qna.isPrivate,
            })),
            recommends: recommendProducts.map(formatProduct),
          },
        });
      } catch (e) {
        console.error(e);

        res.status(500).json({ ok: false, message: constant.PRODUCT_LOAD_FAILURE });
      }
    };

  export const create: RouteHandler<ProductRequest.Create, ProductResponse.Create> = async (
    req,
    res
  ) => {
    try {
      const { name, price, stock, thumbnail = '/', content, categoryId } = req.body;

      const result = await getCustomRepository(ProductRepository).createProduct({
        name,
        price,
        stock,
        thumbnail,
        content,
        categoryId,
      });

      res.json({ ok: true });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };

  export const remove: RouteHandler<ProductRequest.Remove> = async (req, res) => {
    try {
      const { productId } = req.params;

      const result = await getCustomRepository(ProductRepository).delete(productId);

      res.json({ ok: result.affected > 0 });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };
}

export default ProductController;
