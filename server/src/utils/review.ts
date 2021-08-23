const convertImagesToUrlString = (images) => {
  return images
    .map((image) => {
      return image.filename + ';';
    })
    .reduce((acc, filename) => acc + filename, '');
};

const convertImageUrlStringToArray = (review) => {
  const parsedImageArray = review.images.split(';');
  parsedImageArray.pop();

  const result = {
    ...review,
    images: parsedImageArray,
  };
  return result;
};
const convertImageUrlStringToArrayAll = (reviews) => {
  return reviews.map((review) => convertImageUrlStringToArray(review));
};
export { convertImagesToUrlString, convertImageUrlStringToArray, convertImageUrlStringToArrayAll };
