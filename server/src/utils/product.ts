const DAY = 1000 * 60 * 60 * 24;
const MONTH_DAY = 31;

const createBadges = ({
  totalCount,
  createdAt,
  discountRate,
  standardOfBest,
}: {
  totalCount: number;
  standardOfBest: number;
  createdAt: Date;
  discountRate: number;
}) => {
  const isSaled = discountRate !== 0;
  const DayDiff = (Date.now() - createdAt.getTime()) / DAY;
  const isNew = DayDiff < MONTH_DAY;
  const isBest = totalCount >= standardOfBest;

  const badges = [];

  if (isSaled) badges.push('sale');
  if (isNew) badges.push('new');
  if (isBest) badges.push('best');

  return badges;
};

const createProduct = ({
  soldProductAmounts,
  totalProductCount,
}: {
  soldProductAmounts: number[];
  totalProductCount: number;
}) => {
  const totalSoldProductAmount = soldProductAmounts.reduce((acc, cur) => acc + Number(cur), 0);

  const standardOfBest = totalSoldProductAmount / totalProductCount;

  return (data) => ({
    productId: data.id,
    name: data.name,
    price: Number(data.price),
    stock: Number(data.stock),
    thumbnail: data.thumbnail,
    reviewAverageRate: Number(data.review_average),
    reviewCount: Number(data.review_cnt),
    likeCount: Number(data.like_cnt),
    discountRate: Number(data.discount_rate),
    isGreen: data.isGreen || false,
    badges: createBadges({
      standardOfBest,
      createdAt: new Date(data.created_at),
      discountRate: Number(data.discount_rate),
      totalCount: Number(data.total_amount),
    }),
  });
};

export default createProduct;
