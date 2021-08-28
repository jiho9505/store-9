import { makeAutoObservable } from 'mobx';

import { showErrorMsgTime } from '@/static/constants';

class AlertStore {
  isShow = false;

  constructor() {
    makeAutoObservable(this);
  }

  show = () => {
    this.isShow = true;
  };

  unShow = () => {
    this.isShow = false;
  };

  showAndUnShow = () => {
    this.show();
    setTimeout(() => {
      this.unShow();
    }, showErrorMsgTime);
  };
}

export default new AlertStore();
