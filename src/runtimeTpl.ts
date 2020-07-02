export default `import React from 'react';
import { Provider } from './exports';

export function rootContainer(container) {
  return React.createElement(Provider, {{{ models }}}, container);
}

`;
