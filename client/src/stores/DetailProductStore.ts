import { makeAutoObservable } from 'mobx';

class DetailProductStore {
  products = [];

  constructor() {
    makeAutoObservable(this);
  }

  load = () => {
    console.log('load products...');
    // try {
    //   const data = await api;
    //   this.products= data;
    // } catch (e) {
    //   alert(e);
    // }

    // 렌더링 체크용
    this.products = [...this.products, '1'];
  };
}

export default new DetailProductStore();
