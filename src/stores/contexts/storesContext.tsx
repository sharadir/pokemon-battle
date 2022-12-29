import React from 'react';
import { RootStore } from '../rootStore';

export const rootStore = new RootStore();

export const storesContext = React.createContext({
  rootStore,
  battleStore: rootStore.battleStore,
  uiStore: rootStore.uiStore,
});
