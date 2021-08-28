export const calculateDiscount = (price: number, discountRate: number): string => {
  const discountPrice = (price - Math.floor(price / discountRate)).toLocaleString();
  return discountPrice;
};
