# umi-plugin-mst

[![NPM version](https://img.shields.io/npm/v/umi-plugin-mst.svg?style=flat)](https://npmjs.org/package/umi-plugin-mst) [![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-mst.svg?style=flat)](https://npmjs.org/package/umi-plugin-mst)

umi plugin for [Mobx-state-tree](https://mobx-state-tree.js.org).

You can use it instead of dva, or use it with [@umijs/plugin-dva](https://umijs.org/zh-CN/plugins/plugin-dva) and [@umijs/plugin-model](https://umijs.org/zh-CN/plugins/plugin-model).

These three types of models(dva, hooks, mobx) can coexist in the `models/` directory.

[中文文档](docs/README_zh-CN.md)

## Install

```bash
# or npm
$ yarn add umi-plugin-mst --dev
```

## Usage

[example](/example)

Create a model file and use [Types API](https://mobx-state-tree.js.org/overview/types) to define your model under `models/` dir:

```typescript
/**
 * @file models/foo.ts
 */
import { types } from 'mobx-state-tree';

const Foo = types
  .model({
    bar: types.optional(types.string, ''),
  })
  .actions(self => ({
    setBar(text: string) {
      self.bar = text;
    },
    clearBar() {
      self.bar = '';
    },
  }));

export default Foo.create({});
```

Using mobx-state-tree (MST) with React Hooks (**recommended**):

```tsx
/**
 * @file pages/index.tsx
 */
import React from 'react';
import { useMst, observer } from 'umi';

function Index(): JSX.Element {
  const { foo } = useMst(); // the property name is same as model file's basename.
  return (
    <div>
      record: {JSON.stringify(foo)}
      <input
        value={foo.bar}
        onChange={event => foo.setBar(event.target.value)}
      />
      <button onClick={foo.clearBar}>Clear</button>
    </div>
  );
}

export default observer(Index);
```

Using mobx-state-tree (MST) with Decorator:

```tsx
/**
 * @file pages/home.tsx
 */
import React, { Component } from 'react';
import { Instance } from 'mobx-state-tree';
import { observer, inject } from 'umi';
import foo from '@/models/foo';

type FooInstance = Instance<typeof foo>;

interface IHomeProps {
  foo: FooInstance;
}

@inject('foo') // the property name is same as model file's basename.
@observer
export default class Home extends Component<IHomeProps> {
  render(): JSX.Element {
    const foo = this.props.foo;
    return (
      <div>
        record: {JSON.stringify(foo)}
        <input
          value={foo.bar}
          onChange={event => foo.setBar(event.target.value)}
        />
        <button onClick={foo.clearBar}>Clear</button>
      </div>
    );
  }
}
```

## LICENSE

[MIT](/LICENSE)
