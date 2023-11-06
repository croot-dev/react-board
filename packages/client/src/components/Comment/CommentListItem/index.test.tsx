import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import CommentListItem from './index';

describe('CommentListItem', () => {
  const commentData = {
    id: 1,
    writer: 'User1',
    content: 'This is a comment.',
    postId: 123,
  };

  it('renders comment content', () => {
    render(<CommentListItem commentData={commentData} />);
    const commentContent = screen.getByText(commentData.content);
    expect(commentContent).toBeInTheDocument();
  });

  it('renders writer name', () => {
    render(<CommentListItem commentData={commentData} />);
    const writerName = screen.getByText(commentData.writer);
    expect(writerName).toBeInTheDocument();
  });

  it('clicking reply button opens reply form', () => {
    render(<CommentListItem commentData={commentData} />);
    const replyButton = screen.getByText('Reply');
    fireEvent.click(replyButton);
    const replyForm = screen.getByTestId('comment-form');
    expect(replyForm).toBeInTheDocument();
  });

  it('clicking modify button opens edit mode', () => {
    render(<CommentListItem commentData={commentData} />);
    const modifyButton = screen.getByText('Modify');
    fireEvent.click(modifyButton);
    const editForm = screen.getByTestId('edit-form');
    expect(editForm).toBeInTheDocument();
  });

  it('clicking delete button opens confirmation modal', async () => {
    render(<CommentListItem commentData={commentData} />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    const modalTitle = screen.getByText('Please Input Password');
    expect(modalTitle).toBeInTheDocument();
  });

  it('clicking cancel button on reply form closes reply form', () => {
    render(<CommentListItem commentData={commentData} />);
    const replyButton = screen.getByText('Reply');
    fireEvent.click(replyButton);
    waitFor(() => {
      const cancelReplyButton = screen.getByText('Cancel');
      fireEvent.click(cancelReplyButton);
      const replyForm = screen.queryByTestId('comment-form');
      expect(replyForm).toBeNull();
    });
  });

  it('clicking cancel button on edit form exits edit mode', () => {
    render(<CommentListItem commentData={commentData} />);
    const modifyButton = screen.getByText('Modify');
    fireEvent.click(modifyButton);
    const cancelEditButton = screen.getByText('Cancel');
    fireEvent.click(cancelEditButton);
    const editForm = screen.queryByTestId('edit-form');
    expect(editForm).toBeNull();
  });

  // Add more test cases as needed.
});
