# umi-plugin-mst

针对 [MobX](https://mobx.js.org) 的 [umi](https://umijs.org/) 插件，需要 umi **3.0 及以上（>= 3.0.0）版本**。

**umi-plugin-mst** 内置：

- [mobx@5.15.x](https://mobx.js.org)
- [mobx-state-tree@3.16.x](https://mobx-state-tree.js.org)
- [mobx-react@6.2.x](https://github.com/mobxjs/mobx-react)

可以和 [@umijs/plugin-dva](https://umijs.org/zh-CN/plugins/plugin-dva), [@umijs/plugin-model](https://umijs.org/zh-CN/plugins/plugin-model) 一起使用。

**在`models/`目录下同时存在三种类型（dva、hooks、mobx）的 model 时，不会冲突。**

## 安装

在 umi 工程根目录下 使用 yarn 安装：

```npm
yarn add umi-plugin-mst --dev
```

## 使用

示例工程：[example](/example)

### 目录规约

一个基础的 umi 项目目录结构:

```diff
├── package.json
└── src
+   ├── models
+       └── foo.ts
    ├── pages
        └── index.tsx
    └── app.ts
```

在 `models/` 目录下有 [types.model](https://mobx-state-tree.js.org/concepts/trees) 时启用 **umi-plugin-mst**:

```typescript
/**
 * @file src/models/foo.js
 */
import { types } from 'mobx-state-tree';

const Foo = types
  .model({
    bar: types.optional(types.string, ''),
  })
  .actions((self) => ({
    setBar(text: string) {
      self.bar = text;
    },
    clearBar() {
      self.bar = '';
    },
  }));

export default Foo.create({});
```

使用 Hooks 连接数据到视图：

```tsx
/**
 * @file src/pages/index.js
 */
import React from 'react';
import { useMst, observer } from 'umi';

function Index(): JSX.Element {
  const { foo } = useMst();
  return (
    <div>
      record: {JSON.stringify(foo)}
      <input value={foo.bar} onChange={(event) => foo.setBar(event.target.value)} />
      <button onClick={foo.clearBar}>Clear</button>
    </div>
  );
}

export default observer(Index);
```

使用 Decorator 连接数据到视图：

```tsx
/**
 * @file src/pages/home.js
 */
import React, { Component } from 'react';
import { Instance } from 'mobx-state-tree';
import { observer, inject } from 'umi';
import foo from '@/models/foo';

type FooInstance = Instance<typeof foo>;

interface IHomeProps {
  foo: FooInstance;
}

@inject('foo')
@observer
export default class Home extends Component<IHomeProps> {
  render(): JSX.Element {
    const foo = this.props.foo;
    return (
      <div>
        record: {JSON.stringify(foo)}
        <input value={foo.bar} onChange={(event) => foo.setBar(event.target.value)} />
        <button onClick={foo.clearBar}>Clear</button>
      </div>
    );
  }
}
```
