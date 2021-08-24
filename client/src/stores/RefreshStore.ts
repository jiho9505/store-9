import { makeAutoObservable } from 'mobx';

class RefreshStore {
  refreshToken: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  refresh = () => {
    this.refreshToken++;
  };
}

export default new RefreshStore();
