import type { MouseEvent } from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Button, Col, Input, Row,
} from '@react-board/common';
import { PasswordRegex } from '@/utils/regex';

const Container = styled.div`
  padding: 25px;
  border-radius: 6px;
  border: 1px solid var(--bg-color-4);
  background: var(--bg-color-1);
`;
const Title = styled.h1`
  font-size: 1em;
`;

const InputField = styled.div`
  margin: 5px 0 7px;
`;

const Buttons = styled(Row)`
  button { width: 100% }
`;

interface IProps {
    onChange?: (value?: string) => void;
    onConfirm?: (value?: string, event?: MouseEvent) => void;
    onClose?: () => void;
}
export default function PasswordConfirm({
  onChange = () => {}, onConfirm = () => {}, onClose = () => {},
}: IProps) {
  const [value, setValue] = useState('');
  const onChangeInput = (newValue: string) => {
    setValue(newValue);
    if (typeof onChange === 'function') onChange(newValue);
  };
  const validate = () => {
    if (value === '') {
      return '비밀번호를 입력해주세요.';
    }
    return true;
  };
  const onClickConfirm = (event: MouseEvent) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid !== true) {
      window.alert(isValid);
      return;
    }

    if (typeof onChange === 'function') onConfirm(value, event);
  };
  const onClickClose = (event: MouseEvent) => {
    event.preventDefault();
    if (typeof onClose === 'function') onClose();
  };
  return (
    <Container>
      <Title>Please Input Password</Title>
      <InputField><Input name="password_confirm" type="password" value={value} placeholder="Input password" onChange={onChangeInput} /></InputField>
      <Buttons gap={4}>
        <Col><Button onClick={onClickClose}>Close</Button></Col>
        <Col>
          <Button
            type="submit"
            onClick={onClickConfirm}
          >
            Confirm
          </Button>

        </Col>
      </Buttons>
    </Container>
  );
}
