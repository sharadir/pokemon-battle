import React from 'react';
import { RootStore } from '../rootStore';

export const rootStore = new RootStore();

export const storesContext = React.createContext({
  rootStore,
  userStore: rootStore.userStore,
  uiStore: rootStore.uiStore,
});
