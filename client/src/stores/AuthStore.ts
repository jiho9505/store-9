import UserModel from '@/models/UserModel';
import AuthApi from '@/apis/AuthApi';
import AuthRequest from '@shared/dtos/auth/request';
import { makeAutoObservable } from 'mobx';
import { BaseStore } from './BaseStore';

class AuthStore {
  myInfo: UserModel;
  isLoading: boolean = false;
  isError: boolean;

  constructor() {
    makeAutoObservable(this);
  }

  async login(body: AuthRequest.Login) {
    this.isLoading = true;
    try {
      const result = await AuthApi.login(body);

      this.myInfo = UserModel.create(result.data);

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

      this.myInfo = undefined;

      return result.ok;
    } catch (e) {
      this.isError = true;
    }
  }
}

export default new AuthStore();
