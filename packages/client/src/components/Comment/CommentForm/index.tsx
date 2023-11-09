'use client';

import type { MouseEvent } from 'react';
import { useContext, useEffect, useState } from 'react';
import {
  Row, Col, Input, Button, Textarea,
} from '@react-board/common';
import { createComment } from '@/services/comment';
import { PostViewContext } from '@/contexts/postViewContext';
import { CommentFormContainer, CommentFormButton } from './style';
import type { CustomError, IComment } from '@/types';
import {
  PasswordRegex, CommentWriterRegex, CommentContentRegex,
} from '@/utils/regex';

interface IProps {
  postId: string;
  parent?: string;
  data?: IComment | null;
  onUpdate?: Function;
  onCancel?: Function;
}

export default function commentForm({
  postId, data = null, parent = undefined, onCancel,
}: IProps) {
  const { commentList, setCommentList } = useContext(PostViewContext);
  const [textValue, setTextValue] = useState<string>(data?.content || '');
  const [writer, setWriter] = useState<string>(data?.writer || '');
  const [password, setPassword] = useState<string>('');
  const clearForm = () => {
    setWriter('');
    setPassword('');
    setTextValue('');
  };

  const validate = () => {
    if (writer === '') {
      return '작성자명을 입력해주세요.';
    }
    if (password === '') {
      return '비밀번호를 입력해주세요.';
    }
    if (textValue === '') {
      return '내용을 입력해주세요.';
    }
    if (!CommentWriterRegex.test(writer)) {
      return '작성자는 한글 10자 이하로 작성해주세요.';
    }
    if (!PasswordRegex.test(password)) {
      return '비밀번호는 영문+숫자+특수기호 16자 이하로 작성해주세요.';
    }
    if (!CommentContentRegex.test(textValue.replace(/(<([^>]+)>)/ig, ''))) {
      return '내용은 한글 2000자 이하로 작성해주세요.';
    }
    return true;
  };
  const submit = async () => {
    const isValid = validate();
    if (isValid !== true) {
      window.alert(isValid);
      return;
    }

    const params = {
      postId,
      parent,
      content: textValue,
      writer,
      password,
    };
    try {
      const result = await createComment(params);
      debugger;
      setCommentList([...commentList, result]);
      clearForm();
      window.alert('등록되었습니다.');
      if (typeof onCancel === 'function') onCancel();
    } catch (error) {
      window.alert((error as CustomError).message);
      console.log(error);
    }
  };

  const onClickCancel = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };
  const onClickSubmit = (event: MouseEvent) => {
    event.preventDefault();
    submit();
  };

  return (
    <CommentFormContainer title="글 등록" data-testid="comment-form">
      <Row gap={8}>
        <Col>
          <Input placeholder="Writer" value={writer} onChange={setWriter} />
        </Col>
        <Col>
          <Input type="password" placeholder="Password" value={password} onChange={setPassword} />
        </Col>
      </Row>
      <Row gap={8}>
        <Col size="8">
          <Textarea
            cols={30}
            rows={4}
            value={textValue}
            onChange={setTextValue}
          />
        </Col>
        <Col>
          <CommentFormButton type="submit" onClick={onClickSubmit}>Submit</CommentFormButton>
          {(typeof onCancel === 'function') && <CommentFormButton type="reset" onClick={onClickCancel}>취소</CommentFormButton>}
        </Col>
      </Row>
    </CommentFormContainer>
  );
}
