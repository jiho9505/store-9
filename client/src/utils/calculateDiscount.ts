export const calculateDiscount = (price: string, discount_rate: string): string => {
  const priceWithoutComma = Number(price.replace(/[,]/g, ''));
  const discountWithoutPercent = Number(discount_rate.replace('%', ''));
  const discountPrice = (
    priceWithoutComma - Math.floor(priceWithoutComma / discountWithoutPercent)
  ).toLocaleString();
  return discountPrice;
};
