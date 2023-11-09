'use client';

/* eslint-disable react/no-unstable-nested-components */

import {
  useState, useEffect,
} from 'react';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import { confirmAlert } from 'react-confirm-alert';
import { useRouter, useSearchParams } from 'next/navigation';
import { Link, Button } from '@react-board/common';
import { deletePost, readPost } from '@/services/post';
import type { CustomError, IPost } from '@/types';
import { PostViewContextProvider } from '@/contexts/postViewContext';
import { PageWrapper } from '@/components/Layout';
import { PostViewButtons, PostViewRow, PostViewFooter } from './page.style';
import CommentList from '@/components/Comment/CommentList';
import PasswordConfirm from '@/components/PasswordConfirm';

const NoSsrViewer = dynamic(() => import('@/components/Editor/TuiViewer'), { ssr: false });

export default function PostViewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId') || '';
  const [isPageLoaded, setPageLoaded] = useState(false);
  // 게시글 정보
  const [post, setPost] = useState<IPost>();
  const getPost = async () => {
    try {
      setPageLoaded(false);
      const result = await readPost(postId);
      setPost({
        ...result,
        id: postId,
      });
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

  // 게시글 삭제 기능
  const removePost = async (checkPassword: string) => {
    try {
      await deletePost({
        id: post?.id || '',
        password: checkPassword,
      });
      window.alert('Success');
      router.push('/posts');
    } catch (error) {
      window.alert((error as CustomError).message);
      console.log(error);
    }
  };
  const onClickDelete = () => {
    confirmAlert({
      closeOnEscape: false,
      closeOnClickOutside: false,
      customUI: ({ onClose }) => (
        <PasswordConfirm
          onConfirm={(checkPassword) => {
            removePost(checkPassword || '');
            onClose();
          }}
          onClose={onClose}
        />
      ),
    });
  };

  return (
    <PostViewContextProvider>
      <PageWrapper title="글 상세" loading={!isPageLoaded}>
        <PostViewRow>
          <dt>Title</dt>
          <dd>{post?.title}</dd>
        </PostViewRow>
        <PostViewRow>
          <dt>Writer</dt>
          <dd>{post?.writer}</dd>
        </PostViewRow>
        <PostViewRow>
          <dt>Created Date</dt>
          <dd>{(post?.created_at) ? dayjs(post?.created_at).format('YYYY/MM/DD HH:mm:ss') : '-'}</dd>
        </PostViewRow>
        <PostViewRow>
          <dt>Updated Date</dt>
          <dd>{(post?.updated_at) ? dayjs(post?.updated_at).format('YYYY/MM/DD HH:mm:ss') : '-'}</dd>
        </PostViewRow>
        <PostViewRow>
          <dt>Content</dt>
          <dd><NoSsrViewer content={post?.content || ''} /></dd>
        </PostViewRow>
        <PostViewButtons>
          <Link type="button" href={`/posts/edit?postId=${post?.id}`}>Modify</Link>
          <Button onClick={onClickDelete}>Delete</Button>
        </PostViewButtons>
        {isPageLoaded
        && <CommentList postId={postId} />}

        <PostViewFooter>
          <Link type="button" href="/posts">List</Link>
        </PostViewFooter>
      </PageWrapper>
    </PostViewContextProvider>
  );
}
