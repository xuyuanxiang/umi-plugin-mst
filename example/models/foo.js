import { types } from 'mobx-state-tree';

const Foo = types
  .model('Foo', {
    bar: types.optional(types.string, ''),
  })
  .actions((self) => ({
    setBar(text) {
      self.bar = text;
    },
    clearBar() {
      self.bar = '';
    },
  }));

export default Foo.create({});
