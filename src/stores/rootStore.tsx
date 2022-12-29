import { UserStore } from './userStore';
import { UiStore } from './uiStore';

export class RootStore {
  userStore: UserStore = new UserStore(this);
  uiStore: UiStore = new UiStore(this);
}
