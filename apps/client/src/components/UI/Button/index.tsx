import type {
  ButtonHTMLAttributes, HTMLAttributes, MouseEvent, MouseEventHandler,
} from 'react';
import React from 'react';
import { ButtonItem } from './style';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'normal' | 'large';
  children?: React.ReactNode | string;
  disabled?: boolean;
  // onClick?: (arg1: MouseEvent<HTMLButtonElement>) => void
}
export default function Button({
  type = 'button', size = 'normal', children, disabled = false, onClick = () => {}, ...args
}:IProps) {
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(event);
  };
  return (
    <ButtonItem
      type={type}
      data-size={size}
      disabled={disabled}
      onClick={onClickHandler}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...args}
    >
      {children}
    </ButtonItem>
  );
}
