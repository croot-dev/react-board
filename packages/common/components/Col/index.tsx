import React from 'react';
import styled from '@emotion/styled';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number | string;
    children: React.ReactNode;
}

const ColBox = styled.div`
    flex: 1 1 auto;
`;

export function Col({ size, children, ...args }: IProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ColBox {...(size && { style: { flexBasis: `${(Number(size) / 12) * 100}%` } })} {...args}>
      {children}
    </ColBox>
  );
}
