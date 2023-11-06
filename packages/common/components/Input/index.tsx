import type { ChangeEvent, ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import React, { useEffect, useState } from 'react';
import {
  InputField, InputBox, InputLabel, RequireIcon,
} from './style';

interface IProps {
  type?: HTMLInputTypeAttribute;
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (arg1?: any, arg2?: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type = 'text', label = '', value = '', name = '', required = false, placeholder = '', onChange = () => {},
}: IProps) {
  const [inputValue, setInputValue] = useState<string>(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue, event);
  };
  return (
    <InputBox>
      {label && (
      <InputLabel>
        {label}
        {required && <RequireIcon />}
      </InputLabel>
      )}
      <InputField
        type={type}
        name={name}
        value={inputValue}
        placeholder={placeholder}
        onChange={onChangeHandler}
        required={required}
      />
    </InputBox>
  );
}
