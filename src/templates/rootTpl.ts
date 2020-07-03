export default `import { Instance } from 'mobx-state-tree';
{{{ imports }}}

export type MSTRoot = {
{{{ instance }}}
};

const root: MSTRoot = {
{{{ store }}}
};

export default root;

`;
