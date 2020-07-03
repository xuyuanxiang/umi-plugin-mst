import React from 'react';
import { useMst, observer } from 'umi';

function Index() {
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
