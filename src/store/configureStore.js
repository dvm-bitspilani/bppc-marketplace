import { createStore } from 'redux';

export const configureStore = () => {
  const store = createStore();

  return store;
}