import { types } from 'umi';

export default types
  .model({
    bar: types.optional(types.string),
  })
  .actions((self) => ({
    setBar(bar) {
      self.bar = bar;
    },
  }))
  .create({});
