import React, { forwardRef, useImperativeHandle, useState } from 'react';

export type AbdominationProps = {
  /**
   * size
   */
  size?: string;
};

// https://stackoverflow.com/questions/62210286/declare-type-with-react-useimperativehandle
export type AbdominationHandle = {
  cannibalize(): void;
  diseaseCloud(): void;
  clear(): void;
};

const Abdomination = forwardRef((props: AbdominationProps, ref) => {
  const [action, setAction] = useState('');

  useImperativeHandle(
    ref,
    (): AbdominationHandle => ({
      cannibalize() {
        setAction('cannibalize');
      },
      diseaseCloud() {
        setAction('diseaseCloud');
      },
      clear() {
        setAction('');
      }
    })
  );

  return (
    <div {...props}>
      an abdomination, {props.size}; {action}
    </div>
  );
});

export default Abdomination;
