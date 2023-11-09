'use client';

import {
  useEffect, useMemo, useContext,
} from 'react';
import type { CustomError, IComment } from '@/types';
import CommentForm from '@/components/Comment/CommentForm';
import CommentListItem from '@/components/Comment/CommentListItem';
import { readCommentList } from '@/services/comment';
import { PostViewContext } from '@/contexts/postViewContext';
import { CommentWriteBox, CommentTitle, CommentEmpty } from './style';

export default function CommentList({ postId }: { postId: string }) {
  const { commentList, setCommentList } = useContext(PostViewContext);
  const getCommentList = async () => {
    try {
      const result = await readCommentList(postId);
      const newCommentList = Object.entries(result).map(([id, value]) => ({ ...value, id }));
      setCommentList(newCommentList || []);
    } catch (error) {
      window.alert((error as CustomError).message);
      // console.log(error);
    }
  };
  useEffect(() => {
    getCommentList();
  }, []);

  // 댓글 목록
  const rootCommentList: IComment[] = useMemo(
    () => (commentList.filter(({ parent }) => !parent) || []),
    [commentList],
  );

  return (
    <>
      <CommentWriteBox>
        <CommentTitle>댓글 등록</CommentTitle>
        <CommentForm postId={postId} />
      </CommentWriteBox>
      <div>
        <CommentTitle>댓글 목록</CommentTitle>
        { (rootCommentList.length === 0)
          ? <CommentEmpty>댓글이 없습니다.</CommentEmpty>
          : rootCommentList
            .map((comment, index) => (
              <CommentListItem key={comment.id} commentData={comment} />
            ))}
      </div>
    </>
  );
}
