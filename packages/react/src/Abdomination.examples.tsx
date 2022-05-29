import React, { useRef } from 'react';
import Abdomination from './Abdomination';
import type { AbdominationProps, AbdominationHandle } from './Abdomination';

export const AbdominationExample = (props: AbdominationProps) => {
  const ref = useRef<AbdominationHandle>(null);

  return (
    <div>
      <button onClick={() => ref.current?.cannibalize()}>cannibalize</button>
      <button onClick={() => ref.current?.diseaseCloud()}>disease cloud</button>
      <button onClick={() => ref.current?.clear()}>clear</button>
      <Abdomination ref={ref} {...props} />
    </div>
  );
};
