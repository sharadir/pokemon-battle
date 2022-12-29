import { makeAutoObservable } from 'mobx';
import { RootStore } from './rootStore';

export class UserStore {
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
  rootStore?: RootStore = undefined;
}