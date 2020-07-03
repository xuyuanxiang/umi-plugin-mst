export default `import { useContext, createContext } from 'react';
import root, { MSTRoot } from './root';

export { observer, inject } from 'mobx-react';
export const MSTContext = createContext<MSTRoot>(root);
export const MSTConsumer = MSTContext.Consumer;
export const MSTProvider = MSTContext.Provider;
export function useMst(): MSTRoot {
  return useContext(MSTContext);
}

`;
