
import { UiStore } from './uiStore';
import { BattleStore } from './battleStore';

export class RootStore {
  uiStore: UiStore = new UiStore(this);
  battleStore: BattleStore = new BattleStore(this);
}
