import Review from '../entities/review';

type MulterFiles =
  | Express.Multer.File[]
  | {
      [fieldname: string]: Express.Multer.File[];
    };
type ImageString = string;

const convertImagesToUrlString = (images: MulterFiles): ImageString => {
  return (images as any[])
    .map((image) => {
      return image.key + ';';
    })
    .reduce((acc, filename) => acc + filename, '');
};

const convertImageUrlStringToArray = (review: Review) => {
  const parsedImageArray = review.images.split(';');
  parsedImageArray.pop();

  const result = {
    ...review,
    userId: review.user_id,
    productId: review.product_id,
    createdAt: review.created_at,
    images: parsedImageArray,
  };
  return result;
};
const convertImageUrlStringToArrayAll = (reviews: Review[]) => {
  return reviews.map((review) => convertImageUrlStringToArray(review));
};
export { convertImagesToUrlString, convertImageUrlStringToArray, convertImageUrlStringToArrayAll };
