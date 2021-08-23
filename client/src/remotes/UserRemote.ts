import UserApi from '../apis/UserApi';

export const setLike = async ({ isLike, productId }: { isLike: boolean; productId: number }) => {
  try {
    const result = isLike ? await UserApi.unlike({ productId }) : await UserApi.like({ productId });

    return result.ok;
  } catch (e) {
    console.error(e);
  }
};
