// import UserModel from '@/models/UserModel';
import AuthApi from '@/apis/AuthApi';
import AuthRequest from '@shared/dtos/auth/request';
import { makeAutoObservable } from 'mobx';

class AuthStore {
  // myInfo: UserModel;
  isLoading: boolean = false;
  isLogined: boolean = false;
  isError: boolean;
  loginId: string;

  constructor() {
    makeAutoObservable(this);
  }

  async login(body: AuthRequest.Login) {
    this.isLoading = true;
    try {
      const result = await AuthApi.login(body);

      this.isLogined = true;
      this.loginId = result.data.loginId;
      if (this.isError) this.isError = false;

      return result;
    } catch (e) {
      this.isError = true;
      return e;
    } finally {
      this.isLoading = false;
    }
  }

  async githubLogin(body: AuthRequest.GithubLogin) {
    this.isLoading = true;
    try {
      const result = await AuthApi.githubLogin(body);
      return result;
    } catch (e) {
      this.isError = true;
      return e;
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    try {
      const result = await AuthApi.logout();

      // this.myInfo = undefined;
      this.isLogined = false;
      this.loginId = '';
      if (this.isError) this.isError = false;

      return result.ok;
    } catch (e) {
      this.isError = true;
    }
  }

  async check() {
    try {
      const result = await AuthApi.check();
      this.isLogined = result.ok;
      this.loginId = result.data.loginId;
      if (!this.isError) this.isError = false;

      return result.ok;
    } catch (e) {
      this.isError = true;
    }
  }
}

export default new AuthStore();
