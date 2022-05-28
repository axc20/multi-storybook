import styled, { css } from 'styled-components';

const baseShadow = css<{ color?: string }>`
  box-shadow: ${({ color }) => `0 10px 6px -6px ${color || '#777'}`};
`;

export const Container = styled.div`
  ${baseShadow}
`;
