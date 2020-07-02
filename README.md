# umi-plugin-mst

> 正在施工

针对 [MobX](https://mobx.js.org) 的 [umi](https://umijs.org/) 插件，需要 umi **3.0 及以上（>= 3.0.0）版本**。

提供 [@umijs/plugin-dva](https://umijs.org/zh-CN/plugins/plugin-dva) 和 [@umijs/plugin-model](https://umijs.org/zh-CN/plugins/plugin-model) 之外的另一种选择。

**umi-plugin-mst** 内置：

- [mobx@5.15.x](https://mobx.js.org)
- [mobx-state-tree@3.16.x](https://mobx-state-tree.js.org)
- [mobx-react@6.2.x](https://github.com/mobxjs/mobx-react)

**零配置，安装 umi-plugin-mst 后开箱即用。**

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
├── .umirc.ts
├── .env
├── dist
├── mock
├── public
└── src
    ├── .umi
    ├── layouts/index.tsx
+   ├── models
+       ├── foo.ts
+       └── bar.ts
    ├── pages
        ├── index.less
        └── index.tsx
    └── app.ts
```

#### models 目录

在 `models/` 目录下有 [types.model](https://mobx-state-tree.js.org/concepts/trees) 时启用 **umi-plugin-mst**。

#### 连接数据的三种方式

##### 使用 Decorator

##### 使用 Hooks

##### 使用 HOC
