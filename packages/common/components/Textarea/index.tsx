import React from 'react';
import type { ChangeEvent, ChangeEventHandler } from 'react';
import { useEffect, useState } from 'react';
import {
  TextAreaBox, TextAreaLabel, TextAreaField, RequireIcon,
} from './style';

interface IProps {
  label?: string;
  value?: string;
  name?: string;
  cols?: number;
  rows?: number;
  required?: boolean;
  onChange?: (arg1?: any, arg2?: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Textarea({
  label = '', value = '', name = '', cols = 20, rows = 4, required = false, onChange = () => {},
}: IProps) {
  const [inputValue, setInputValue] = useState<string>(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue, event);
  };
  return (
    <TextAreaBox>
      {label && (
      <TextAreaLabel>
        {label}
        {required && <RequireIcon />}
      </TextAreaLabel>
      )}
      <TextAreaField
        name={name}
        cols={cols}
        rows={rows}
        value={inputValue}
        onChange={onChangeHandler}
        required={required}
      />
    </TextAreaBox>
  );
}
