import UserModel from '@/models/UserModel';
import UserApi from '@/apis/UserApi';
import { BaseStore } from './BaseStore';

class MyPageStore extends BaseStore {
  myInfo: UserModel;

  async load() {
    this.isLoading = true;
    try {
      const result = await UserApi.getMyInfo();

      this.myInfo = UserModel.create(result.data);
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}

export default new MyPageStore();
