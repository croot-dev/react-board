import React from 'react';
import { render, screen } from '@testing-library/react';
import CommentList from './index';
import { PostViewContext } from '@/contexts/postViewContext';

window.alert = jest.fn();

// Mock the CommentForm component since we're only interested in CommentList
jest.mock('@/components/Comment/CommentForm', () => function MockedCommentForm() {
  return <div data-testid="mocked-comment-form" />;
});

describe('CommentList', () => {
  it('displays comments', () => {
    // Mock the comment list
    const comments = [
      {
        id: 1,
        content: 'Test Comment 1',
        writer: 'Test writer',
        parent: null,
      },
      {
        id: 2,
        content: 'Test Comment 2',
        writer: 'Test writer2',
        parent: null,
      },
    ];

    // Render the CommentList component inside a PostViewContext provider
    render(
      <PostViewContext.Provider value={{ commentList: comments }}>
        <CommentList postId={1} />
      </PostViewContext.Provider>,
    );

    // Verify that the comment list is displayed
    expect(screen.getByText('댓글 목록')).toBeInTheDocument();

    // Verify that each comment is displayed
    comments.forEach((comment) => {
      expect(screen.getByText(comment.content)).toBeInTheDocument();
    });

    // Verify that the CommentForm is displayed
    expect(screen.getByTestId('mocked-comment-form')).toBeInTheDocument();
  });

  it('displays "댓글이 없습니다." when there are no comments', () => {
    // Mock an empty comment list
    const comments = [];

    // Render the CommentList component inside a PostViewContext provider
    render(
      <PostViewContext.Provider value={{ commentList: comments }}>
        <CommentList postId={1} />
      </PostViewContext.Provider>,
    );

    // Verify that the "댓글이 없습니다." message is displayed
    expect(screen.getByText('댓글이 없습니다.')).toBeInTheDocument();

    // Verify that the CommentForm is displayed
    expect(screen.getByTestId('mocked-comment-form')).toBeInTheDocument();
  });
});
