export default `import { useContext, createContext } from 'react';
import { types, Instance } from 'mobx-state-tree';

const RootModel = types.model({
  counter: Counter,
  cart: Cart,
});
export const mstStore = RootModel.create({
  counter: {
    count: 0,
  },
  cart: { items: [] },
});
export type MSTInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | MSTInstance>(null);
export const MSTProvider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}

`;
