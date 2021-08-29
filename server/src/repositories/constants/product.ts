export namespace PRODUCT_GET_MAIN {
  export const MAIN_BEST_PRODUCT_LIMIT = 4;
  export const MAIN_NEW_PRODUCT_LIMIT = 8;
  export const MAIN_RECOMMEND_PRODUCT_LIMIT = 2;
  export const MAIN_DISCOUNT_PRODUCT_LIMIT = 8;
}

export namespace PRODUCT_GET_DETAIL {
  export const DETAIL_REVIEW_LIMIT = 5;
  export const DETAIL_QNA_LIMIT = 5;
  export const DETAIL_RECOMMEND_PRODUCT_LIMIT = 3;
}

export namespace PRODUCT_QUERY {
  export const COMMON_SELECT = `
    IFNULL(jr.review_average, 0) AS review_average, 
    IFNULL(jr.review_cnt, 0) AS review_cnt,
    IFNULL(jl.like_cnt, 0) AS like_cnt,
    IFNULL(jd.rate, 0) AS discount_rate
  `;

  export const COMMON_LEFT_JOIN = `
    LEFT JOIN (
      SELECT AVG(r.rate) AS review_average, COUNT(*) AS review_cnt, r.product_id
      FROM reviews r
      GROUP BY r.product_id
    ) jr
    ON p.id = jr.product_id
    LEFT JOIN (
      SELECT COUNT(l.id) AS like_cnt, l.product_id
      FROM likes l
      GROUP BY l.product_id
    ) jl
    ON p.id = jl.product_id
    LEFT JOIN (
      select d.product_id, d.rate
      from discounts d
    ) jd
    ON p.id = jd.product_id
  `;
}
