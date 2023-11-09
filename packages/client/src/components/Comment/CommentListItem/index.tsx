/* eslint-disable react/no-unstable-nested-components */

'use client';

import {
  useMemo, useEffect, useState, useContext,
} from 'react';
import { BiCommentDetail, BiSolidUserCircle } from 'react-icons/bi';
import { confirmAlert } from 'react-confirm-alert';
import {
  Button, Row, Col, Input, Textarea,
} from '@react-board/common';
import type { CustomError, IComment } from '@/types';
import CommentForm from '@/components/Comment/CommentForm';
import { PostViewContext } from '@/contexts/postViewContext';
import { replyDepthLimit } from '@/constants';
import {
  ItemContainer, ItemInnerContainer, ItemRow, ItemButtons, ReplyItemButtons,
} from './style';
import { deleteComment, updateComment } from '@/services/comment';
import PasswordConfirm from '@/components/PasswordConfirm';

interface IProps {
    commentData: IComment;
    depth?: number;
}

export default function CommentListItem({ commentData, depth = 0 }: IProps) {
  const { commentList, setCommentList } = useContext(PostViewContext);
  const [editMode, setEditMode] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const replyList = useMemo(
    () => commentList.filter(({ parent }) => parent === commentData?.id),
    [commentList],
  );

  const [writer, setWriter] = useState(commentData.writer);
  const [content, setContent] = useState(commentData.content);
  const [password, setPassword] = useState('');
  const onChangeWriter = (value: string) => {
    setWriter(value);
  };
  const onChangeContent = (value: string) => {
    setContent(value);
  };
  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onClickModify = () => {
    setShowReplyForm(false);
    setEditMode(true);
  };
  const onClickModifySubmit = async () => {
    const params = {
      id: commentData.id,
      postId: commentData.postId,
      writer,
      password,
      content,
    };
    try {
      const result = await updateComment(params);
      setCommentList(commentList.map((v) => ((v.id === commentData.id) ? result : v)));
      setEditMode(false);
      window.alert('Success');
    } catch (error) {
      window.alert((error as CustomError).message);
      console.log(error);
    } finally {
      // empty.
    }
  };
  const onClickModifyCancel = () => {
    setEditMode(false);
  };

  const removeComment = async (checkPassword: string) => {
    const params = {
      id: commentData.id,
      postId: Number(commentData.postId),
      password: checkPassword || '',
    };
    try {
      await deleteComment(params);
      setCommentList(commentList.filter((v) => ((v.id !== commentData.id))));
      window.alert('Success');
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
            removeComment(checkPassword || '');
            onClose();
          }}
          onClose={onClose}
        />
      ),
    });
  };
  const onClickReply = () => {
    setShowReplyForm(true);
  };
  const onCancelHandler = () => {
    setShowReplyForm(false);
  };

  return (
    <ItemContainer>
      {editMode ? (
        <ItemInnerContainer data-testid="edit-form">
          <Row gap={8}>
            <Col><Input placeholder="Writer" value={commentData.writer} onChange={onChangeWriter} /></Col>
            <Col><Input type="password" placeholder="Password" onChange={onChangePassword} /></Col>
          </Row>
          <Row style={{ marginTop: '5px' }}>
            <Col>
              <Textarea value={commentData.content} onChange={onChangeContent} />
            </Col>
            <ReplyItemButtons>
              <Button onClick={onClickModifySubmit}>Submit</Button>
              <Button onClick={onClickModifyCancel}>Cancel</Button>
            </ReplyItemButtons>
          </Row>
        </ItemInnerContainer>
      ) : (
        <ItemInnerContainer>
          <Row>
            <Col size="10">
              <ItemRow>
                <BiSolidUserCircle />
                {commentData.writer}
              </ItemRow>
              <ItemRow>
                <BiCommentDetail />
                {commentData.content}
              </ItemRow>
            </Col>
            <Col size="2">
              <ItemButtons>
                {depth < replyDepthLimit - 1 && <Button size="small" onClick={onClickReply}>Reply</Button>}
                <Button size="small" onClick={onClickModify}>Modify</Button>
                <Button size="small" onClick={onClickDelete}>Delete</Button>
              </ItemButtons>
            </Col>
          </Row>
          {showReplyForm && (
          <CommentForm
            postId={commentData.postId}
            parent={commentData.id}
            onCancel={onCancelHandler}
          />
          )}
        </ItemInnerContainer>
      )}
      {replyList.length > 0
      && (
      <div style={{ marginTop: '8px', paddingLeft: '20px' }}>
        {replyList.map((reply) => (
          <CommentListItem key={reply.id} commentData={reply} depth={depth + 1} />
        ))}
      </div>
      )}
    </ItemContainer>
  );
}
