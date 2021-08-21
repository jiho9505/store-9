import UserModel from '@/models/UserModel';
import AuthApi from '@/apis/AuthApi';
import AuthRequest from '@shared/dtos/auth/request';

export const login = async (body: AuthRequest.Login) => {
  try {
    const result = await AuthApi.login(body);

    return UserModel.create(result.data);
  } catch (e) {
    console.error(e);

    return false;
  }
};

export const signup = async (body: AuthRequest.Signup) => {
  try {
    const result = await AuthApi.signup(body);

    return result.ok;
  } catch (e) {
    console.error(e);

    return false;
  }
};

export const logout = async () => {
  try {
    const result = await AuthApi.logout();

    return result.ok;
  } catch (e) {
    console.error(e);

    return false;
  }
};

export const getTerms = async () => {
  try {
    const result = await AuthApi.getTerms();

    return result.data;
  } catch (e) {
    console.error(e);

    return false;
  }
};
