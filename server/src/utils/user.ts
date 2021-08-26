const filterExistItem = (productsToLike, existItems) => {
  return productsToLike.filter((product) => {
    return !existItems.find((item) => item.product_id === product.product_id);
  });
};

export { filterExistItem };
