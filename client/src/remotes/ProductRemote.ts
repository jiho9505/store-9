import ProductModel from '@/models/ProductModel';
import ProductApi from '@/apis/ProductApi';
import ProductRequest from '@shared/dtos/product/request';

export const getMainList = async () => {
  try {
    const result = await ProductApi.getMain();

    const { bestProducts, discountProducts, newProducts } = result.data;

    return {
      bestProducts: bestProducts.map(ProductModel.create),
      discountProducts: discountProducts.map(ProductModel.create),
      newProducts: newProducts.map(ProductModel.create),
    };
  } catch (e) {
    console.error(e);
  }
};

export const getProductList = async (params: ProductRequest.GetList) => {
  try {
    const result = await ProductApi.getList(params);

    return result.data.map(ProductModel.create);
  } catch (e) {
    console.error(e);
  }
};

export const getProductDetail = async (productId: number) => {
  try {
    const result = await ProductApi.getDetail({ productId });

    return ProductModel.create(result.data);
  } catch (e) {
    console.error(e);
  }
};
