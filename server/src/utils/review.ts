const convertImageFilesToUrlArray = (images) => {
  return images
    .map((image) => {
      return image.filename + ';';
    })
    .reduce((acc, filename) => acc + filename, '');
};

export { convertImageFilesToUrlArray };
