// import UserModel from '@/models/UserModel';
import AuthApi from '@/apis/AuthApi';
import AuthRequest from '@shared/dtos/auth/request';
import { makeAutoObservable } from 'mobx';

class AuthStore {
  // myInfo: UserModel;
  isLoading: boolean = false;
  isLogined: boolean = false;
  isError: boolean;

  constructor() {
    makeAutoObservable(this);
  }

  async login(body: AuthRequest.Login) {
    this.isLoading = true;
    try {
      const result = await AuthApi.login(body);

      // this.myInfo = UserModel.create(result.data);
      this.isLogined = true;
      if (this.isError) this.isError = false;

      return result.ok;
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    try {
      const result = await AuthApi.logout();

      // this.myInfo = undefined;
      this.isLogined = false;
      if (this.isError) this.isError = false;

      return result.ok;
    } catch (e) {
      console.log(e);
      this.isError = true;
    }
  }

  async check() {
    try {
      const result = await AuthApi.check();
      this.isLogined = result.ok;

      if (!this.isError) this.isError = false;
      return result.ok;
    } catch (e) {
      this.isError = true;
    }
  }
}

export default new AuthStore();
