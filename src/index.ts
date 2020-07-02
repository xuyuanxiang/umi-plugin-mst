import { IApi, utils } from 'umi';
import { join, dirname } from 'path';
import runtimeTpl from './runtimeTpl';
import rootTpl from './rootTpl';
import getModels from './getModels';
import { dependencies } from '../package.json';

const DIR = 'mobx-state-tree';

export default (api: IApi): void => {
  const {
    utils: { Mustache, winPath, lodash },
    paths: { absTmpPath = '', absSrcPath = '', absPagesPath = '' },
  } = api;
  const LIBS = lodash.keysIn(dependencies);

  function getModelDir() {
    return api.config.singular ? 'model' : 'models';
  }

  function getSrcModelsPath() {
    return join(absSrcPath, getModelDir());
  }

  function getAllModels() {
    const srcModelsPath = getSrcModelsPath();
    const baseOpts = {
      extraModels: api.config.dva?.extraModels,
    };
    return lodash.uniq([
      ...getModels({
        base: srcModelsPath,
        ...baseOpts,
      }),
      ...getModels({
        base: absPagesPath,
        pattern: `**/${getModelDir()}/**/*.{ts,tsx,js,jsx}`,
        ...baseOpts,
      }),
      ...getModels({
        base: absPagesPath,
        pattern: `**/model.{ts,tsx,js,jsx}`,
        ...baseOpts,
      }),
    ]);
  }

  api.describe({
    key: 'mst',
    config: {
      schema(joi) {
        return joi.object({
          extraModels: joi.array().items(joi.string()),
        });
      },
    },
  });

  api.addProjectFirstLibraries(() =>
    LIBS.map((it: string) => ({
      name: it,
      path: winPath(dirname(require.resolve(`${it}/package.json`))),
    })),
  );

  api.addRuntimePlugin(() => [join(absTmpPath, DIR, 'runtime.ts')]);

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: `${DIR}/runtime.ts`,
      content: Mustache.render(runtimeTpl, { models: JSON.stringify(getAllModels()) }),
    });
    api.writeTmpFile({
      path: `${DIR}/index.ts`,
      content: rootTpl,
    });
  });

  api.addUmiExports(() => LIBS.map((it: string) => ({ exportAll: true, source: it })));
};
