import React from 'react';
import { render, screen } from '@testing-library/react';
import ListItem from './index';

// Sample post data for testing
const mockPost = {
  id: 1,
  title: '제목이여기에붙어요',
  content: '<p>내용이 여기에 붙어요</p>',
  comments: [],
  created_at: '2023-10-20T14:03:17.000Z',
};

describe('ListItem', () => {
  it('renders ListItem with post title and content', () => {
    render(<ListItem data={mockPost} />);

    // Check if post title is displayed
    const postTitleElement = screen.getByText(mockPost.title);
    expect(postTitleElement).toBeInTheDocument();

    // Check if post content (stripped of HTML tags) is displayed
    const postContentElement = screen.getByText('내용이 여기에 붙어요');
    expect(postContentElement).toBeInTheDocument();
  });

  it('displays comment count when there are comments', () => {
    const postWithComments = {
      ...mockPost,
      comments: [{}, {}, {}], // Sample comments
    };
    render(<ListItem data={postWithComments} />);

    // Check if comment count is displayed
    const commentCountElement = screen.getByText('3'); // Adjust the count as needed
    expect(commentCountElement).toBeInTheDocument();
  });

  it('displays relative timestamp for post creation date', () => {
    render(<ListItem data={mockPost} />);

    // Check if the relative timestamp is displayed
    const relativeTimestampElement = screen.getByText('2 days ago'); // Adjust the timestamp as needed
    expect(relativeTimestampElement).toBeInTheDocument();
  });
});
