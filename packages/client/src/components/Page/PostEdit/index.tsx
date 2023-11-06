'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { readPost, updatePost } from '@/services/post';
import type { CustomError } from '@/types';
import { Link, Input, Button } from '@react-board/common';
import { PageWrapper } from '@/components/Layout';
import { PostEditFooter, PostEditRow } from './page.style';
import {
  PostContentRegex, PasswordRegex, PostTitleRegex, writerRegex,
} from '@/utils/regex';

const NoSsrWysiwyg = dynamic(() => import('@/components/Editor/TuiEditor'), { ssr: false });

export default function PostEditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId') || '';
  const [isPageLoaded, setPageLoaded] = useState(false);
  const getPost = async () => {
    try {
      setPageLoaded(false);
      const result = await readPost(postId);
      setTitle(result.title);
      setContent(result.content);
      setWriter(result.writer);
    } catch (error) {
      if ((error as CustomError).statusCode === 404) {
        window.alert('Non-existent post');
        router.replace('/posts');
      } else {
        window.alert((error as CustomError).message);
        console.log(error);
      }
    } finally {
      setPageLoaded(true);
    }
  };
  useEffect(() => {
    getPost();
  }, [postId]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');

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
      console.log(content.replace(/(<([^>]+)>)/ig, ''));
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
      id: postId,
      title,
      writer,
      content,
      password,
    };
    try {
      await updatePost(formData);
      window.alert('Success');
      router.push(`/posts/view?postId=${postId}`);
    } catch (error) {
      window.alert((error as CustomError).message);
      console.log(error);
    }
  };
  const onClickSubmit = () => {
    submit();
  };

  return (
    <PageWrapper title="글 수정" loading={!isPageLoaded}>
      <PostEditRow>
        {postId}
      </PostEditRow>
      <PostEditRow>
        <Input label="Title" value={title} required onChange={setTitle} />
      </PostEditRow>
      <PostEditRow>
        <Input label="Writer" value={writer} required onChange={setWriter} />
      </PostEditRow>
      <PostEditRow>
        <Input label="Password" type="password" value={password} required onChange={setPassword} />
      </PostEditRow>
      <PostEditRow>
        {content && <NoSsrWysiwyg initialValue={content} onChange={setContent} />}
      </PostEditRow>
      <PostEditFooter>
        <Button type="submit" onClick={onClickSubmit}>Submit</Button>
        <Link href={`/posts/view?postId=${postId}`}>Cancel</Link>
      </PostEditFooter>
    </PageWrapper>
  );
}
