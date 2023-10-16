'use client';

import type { MouseEvent } from 'react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { createPost } from '@/services/post';
import { Link, Input, Button } from '@/components/UI';
import { PageWrapper } from '@/components/Layout';
import { PostFormFooter, PostFormRow } from './page.style';
import {
  PostContentRegex, PasswordRegex, PostTitleRegex, writerRegex,
} from '@/utils/regex';
import type { CustomError } from '@/types';

const NoSsrEditor = dynamic(() => import('@/components/Editor/TuiEditor'), { ssr: false });

export default function PostFormPage() {
  const router = useRouter();

  // Form Inputs
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');

  const validate: () => string|boolean = () => {
    if (title === '') {
      return '제목을 입력해주세요.';
    }
    if (writer === '') {
      return '작성자명을 입력해주세요.';
    }
    if (password === '') {
      return '비밀번호를 입력해주세요.';
    }
    if (content === '') {
      return '내용을 입력해주세요.';
    }
    if (!PostTitleRegex.test(title)) {
      return '제목은 한글 40자 이하로 작성해주세요.';
    }
    if (!writerRegex.test(writer)) {
      return '작성자는 한글 10자 이하로 작성해주세요.';
    }
    if (!PasswordRegex.test(password)) {
      return '비밀번호는 영문+숫자+특수기호 16자 이하로 작성해주세요.';
    }
    if (!PostContentRegex.test(content.replace(/(<([^>]+)>)/ig, ''))) {
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

    const formData = {
      title,
      writer,
      content,
      password,
    };
    try {
      await createPost(formData);
      window.alert('Success');
      router.push('/posts');
    } catch (error) {
      window.alert((error as CustomError).message);
      console.log(error);
    }
  };

  const onClickSubmit = (event: MouseEvent) => {
    event.preventDefault();
    submit();
  };

  return (
    <PageWrapper title="글 추가">
      <PostFormRow><Input label="Title" name="title" value={title} required onChange={setTitle} /></PostFormRow>
      <PostFormRow><Input label="Writer" name="writer" value={writer} required onChange={setWriter} /></PostFormRow>
      <PostFormRow><Input label="Password" name="password" type="password" value={password} required onChange={setPassword} /></PostFormRow>
      <PostFormRow><NoSsrEditor initialValue={content} onChange={setContent} /></PostFormRow>
      <PostFormFooter>
        <Button type="submit" id="postFormSubmit" onClick={onClickSubmit}>Submit</Button>
        <Link href="/posts">Cancel</Link>
      </PostFormFooter>
    </PageWrapper>
  );
}
