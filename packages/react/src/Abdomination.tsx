import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';

export type AbdominationProps = {
  /**
   * num of eyes
   * @default 2
   */
  eyes?: number;
  /**
   * num of legs
   * @default 2
   */
  legs?: number;
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

const Eye = styled.div`
  display: inline-block;
  background-color: red;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  margin-right: 5px;
`;

const Leg = styled.div`
  display: inline-block;
  background-color: black;
  height: 60px;
  width: 20px;
  margin-right: 5px;
`;

const Abdomination = forwardRef(({ eyes = 2, legs = 2, size }: AbdominationProps, ref) => {
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
    <div>
      an abdomination, {size}; {action}
      <div>
        {Array.from({ length: eyes }, (_, i) => (
          <Eye key={i} />
        ))}
        <br />
        {Array.from({ length: legs }, (_, i) => (
          <Leg key={i} />
        ))}
      </div>
    </div>
  );
});

export default Abdomination;
