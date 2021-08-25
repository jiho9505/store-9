import { makeAutoObservable } from 'mobx';

class GlobalStore {
  user: {};
  categories: {
    id: number;
    name: string;
    parentId: number;
  }[];
  autoCompletedNames: string[];

  constructor() {
    makeAutoObservable(this);
  }

  load() {
    try {
      const reuslt= await init()

      this.autoCompletedNames = result.auto;
      this.categories = result.categoreis;
      
    }
  }
}

export default new GlobalStore();
