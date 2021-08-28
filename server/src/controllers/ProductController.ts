import { getCustomRepository } from 'typeorm';

import ProductRepository from '../repositories/ProductRepository';
import ProductRequest from '../../../shared/dtos/product/request';
import ProductResponse from '../../../shared/dtos/product/response';

const DAY = 1000 * 60 * 60 * 24;
const MONTH_DAY = 31;

namespace ProductController {
  export const getMain: RouteHandler<null, ProductResponse.GetMain> = async (req, res) => {
    try {
      const result = await getCustomRepository(ProductRepository).getMain();

      const totalProductAmount = result.productTotalSoldAmount.reduce(
        (acc, cur) => acc + Number(cur.product_total_amount),
        0
      );
      const standardOfBest = totalProductAmount / result.productCnt;

      const createBadges = (data) => {
        const isSaled = data.discount_rate !== '0';
        const DayDiff = (new Date().getTime() - new Date(data.created_at).getTime()) / DAY;
        const isNew = DayDiff < MONTH_DAY;
        const isBest = data.total_amount >= standardOfBest;

        const badges = [];

        if (isSaled) badges.push('sale');
        if (isNew) badges.push('new');
        if (isBest) badges.push('best');

        return badges;
      };

      const createData = (data) => ({
        productId: data.id,
        name: data.name,
        price: data.price,
        thumbnail: data.thumbnail,
        reviewAverageRate: Number(data.review_average),
        reviewCount: Number(data.review_cnt),
        likeCount: Number(data.like_cnt),
        discountRate: Number(data.discount_rate),
        isGreen: data.isGreen || false,
        badges: createBadges(data),
      });

      res.json({
        ok: true,
        data: {
          bestProducts: result.bestProducts.map(createData),
          newProducts: result.newProducts.map(createData),
          discountProducts: result.discountProducts.map(createData),
        },
      });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };

  export const getList: RouteHandler<ProductRequest.GetList, ProductResponse.GetList> = async (
    req,
    res
  ) => {
    try {
      const { categoryId, page, search, size, sortBy } = req.query;

      const result = await getCustomRepository(ProductRepository).getProductsByCategory({
        categoryId,
        page,
        size,
        search,
        sortBy,
      });

      const totalProductAmount = result.productTotalSoldAmount.reduce(
        (acc, cur) => acc + Number(cur.product_total_amount),
        0
      );
      const standardOfBest = totalProductAmount / result.totalProductCount;

      const createBadges = (data) => {
        const isSaled = data.discount_rate !== '0';
        const DayDiff = (new Date().getTime() - new Date(data.created_at).getTime()) / DAY;
        const isNew = DayDiff < MONTH_DAY;
        const isBest = data.total_amount >= standardOfBest;

        const badges = [];

        if (isSaled) badges.push('sale');
        if (isNew) badges.push('new');
        if (isBest) badges.push('best');

        return badges;
      };

      const createData = (data) => ({
        productId: data.id,
        name: data.name,
        price: data.price,
        thumbnail: data.thumbnail,
        reviewAverageRate: Number(data.review_average),
        reviewCount: Number(data.review_cnt),
        likeCount: Number(data.like_cnt),
        discountRate: Number(data.discount_rate),
        isGreen: data.isGreen || false,
        badges: createBadges(data),
      });

      res.json({
        ok: true,
        data: {
          products: result.products.map(createData),
          totalCount: Number(result.totalCountByCategory[0]['total_count']),
        },
      });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };

  export const getDetail: RouteHandler<ProductRequest.GetDetail, ProductResponse.GetDetail> =
    async (req, res) => {
      try {
        const { productId } = req.params;

        const { product, reviews, qnas, productTotalSoldAmount, productCnt } =
          await getCustomRepository(ProductRepository).getDetail({
            productId,
          });

        // const randomRecommendProducts = extractRandomlyProduct(recommendProducts, 4);

        const totalProductAmount = productTotalSoldAmount.reduce(
          (acc, cur) => acc + Number(cur.product_total_amount),
          0
        );
        const standardOfBest = totalProductAmount / productCnt;

        const createBadges = (data) => {
          const isSaled = data.discount_rate !== '0';
          const DayDiff = (new Date().getTime() - new Date(data.created_at).getTime()) / DAY;
          const isNew = DayDiff < MONTH_DAY;
          const isBest = data.total_amount >= standardOfBest;

          const badges = [];

          if (isSaled) badges.push('sale');
          if (isNew) badges.push('new');
          if (isBest) badges.push('best');

          return badges;
        };

        const createData = (data) => ({
          productId: data.id,
          name: data.name,
          price: data.price,
          thumbnail: data.thumbnail,
          reviewAverageRate: Number(data.review_average),
          reviewCount: Number(data.review_cnt),
          likeCount: Number(data.like_cnt),
          discountRate: Number(data.discount_rate),
          isGreen: data.isGreen || false,
          badges: createBadges(data),
        });

        res.json({
          ok: true,
          data: {
            productId,
            name: product.name,
            price: product.price,
            thumbnail: product.thumbnail,
            contentImages: product.content,
            discountRate: product.discount_rate,
            isLike: product['is_like'] !== '0',
            reviews: reviews.map((review) => ({
              id: review.id,
              title: review.title,
              content: review.content,
              rate: review.rate,
              username: '',
              createdAt: review.created_at,
            })),
            qnas: qnas.map((qna) => ({
              id: qna.id,
              title: qna.title,
              content: qna.content,
              username: qna.useranme,
              createdAt: qna.created_at,
              isPrivate: qna.isPrivate,
            })),
            recommends: [],
            // recommends: randomRecommendProducts.map(createData),
          },
        });
      } catch (e) {
        console.error(e);

        res.status(500).json({ ok: false });
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

const extractRandomlyProduct = (productArray, extractNum) => {
  const randomItems = [];
  const totalLength = productArray.length;
  while (productArray.length > totalLength - extractNum) {
    let target = productArray.splice(Math.floor(Math.random() * productArray.length), 1)[0];
    randomItems.push(target);
  }
  return randomItems;
};
