import React from 'react';
import styled from '@emotion/styled';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    gap?: number;
}

const RowBox = styled.div<{$gap: number}>`
  display: flex;
  flex-direction: row;
  gap: ${({ $gap }) => $gap}px;
`;

export default function Row({ children, gap = 0, ...args }: IProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RowBox $gap={gap} {...args}>
      {children}
    </RowBox>
  );
}
