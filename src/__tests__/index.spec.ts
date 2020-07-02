import { join } from 'path';
import { Service } from 'umi';

const FIXTURES_ROOT = join(__dirname, 'fixtures');

it('should work', async () => {
  const service = new Service({
    cwd: FIXTURES_ROOT,
    plugins: [require.resolve('../')],
  });
  await service.run({
    name: 'g',
    args: {
      _: ['g', 'tmp'],
    },
  });
});
