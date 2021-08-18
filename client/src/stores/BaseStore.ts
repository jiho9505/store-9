import { makeAutoObservable } from 'mobx';

export class BaseStore {
  isLoading: boolean = false;
  isError: boolean;

  constructor() {
    makeAutoObservable(this);
  }
}

export class PageableStore<List = unknown, SortBy = unknown> extends BaseStore {
  list: List;
  page: number = 0;
  size: number = 20;
  sortBy?: SortBy;

  constructor() {
    super();
    makeAutoObservable(this);
  }
}
