import { getCustomRepository } from 'typeorm';

import ProductRepository from '../repositories/ProductRepository';
import ProductRequest from '../../../shared/dtos/product/request';
import ProductResponse from '../../../shared/dtos/product/response';

namespace ProductController {
  export const getMain: RouteHandler<null, ProductResponse.GetMain> = async (req, res) => {
    try {
      const data = await getCustomRepository(ProductRepository).getMain();

      res.json({ ok: true, data });
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

      res.json({
        ok: true,
        data: {
          prodcuts: result.products,
          totalCount: Number(result.totalCount[0]['total_count']),
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

        const {
          product,
          detail = {},
          likes,
          reviews,
          qnas,
        } = await getCustomRepository(ProductRepository).getDetail({ productId });

        Reflect.deleteProperty(product, 'is_like');

        res.json({
          ok: true,
          data: {
            ...product,
            isLike: product['is_like'] !== '0',
            detail,
            likeCount: Number(likes[0]['like_count']),
            reviews,
            qnas,
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

      res.json({
        ok: true,
        data: {
          id: result.id,
          name: result.name,
          stock: result.stock,
          thumbnail: result.thumbnail,
        },
      });
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
