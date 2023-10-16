import styled from '@emotion/styled';
import type { ChangeEvent, ChangeEventHandler } from 'react';
import { useEffect, useState } from 'react';

const Selectbox = styled.div`
  display: inline-block;
  padding: 7px 7px 5px;
  border: 1px solid var(--text-color-4);
  color: black;
  font-size: 1em;
  font-weight: bold;
  
  &:focus,
  &:hover {
    outline: 1px solid var(--text-color-4);
  }

  select {
    margin: 0;
    outline: none;
    border: none;
  }
`;

export interface IOption {
    label?: string,
    value: string | number
}
interface IProps {
  options: IOption[];
  name?: string;
  defaultValue?: string;
  label?: string;
  onChange?: (arg1?: any, arg2?: ChangeEvent<HTMLSelectElement>) => void
}

export default function Select({
  name = '', label = '', defaultValue = '', options = [], onChange = () => {},
}: IProps) {
  const [value, setValue] = useState<any>();
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    } else {
      setValue(options[0].value);
    }
  }, []);

  const onChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue, event);
  };

  return (
    <Selectbox tabIndex={0}>
      {label && <span>{label}</span>}
      <select name={name} onChange={onChangeHandler} value={value} tabIndex={-1}>
        {options.map((option: IOption) => (
          <option key={option.value} value={option.value}>{option.label || option.value}</option>
        ))}
      </select>
    </Selectbox>
  );
}
