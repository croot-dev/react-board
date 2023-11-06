import React from 'react';
import type { ReactNode } from 'react';
import { LinkItem } from './style';

interface IProps {
  href: string;
  type?: 'button' | 'anchor';
  size?: 'small' | 'normal' | 'large';
  children?: ReactNode | string;
}
export function Link({
  type = 'anchor', size = 'normal', children, href,
}:IProps) {
  return (<LinkItem href={href} data-type={type} data-size={size}>{children}</LinkItem>);
}
