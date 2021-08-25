import { makeAutoObservable } from 'mobx';

class RefreshStore {
  refreshComponent: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  refresh = () => {
    this.refreshComponent++;
  };
}

export default new RefreshStore();
