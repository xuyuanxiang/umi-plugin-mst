export default `import React from 'react';
import { Provider } from 'mobx-react';
import root from './root';
import { MSTProvider } from './';

export function rootContainer(container) {
  return React.createElement(Provider, root, React.createElement(MSTProvider, { value: root }, container));
}

`;
