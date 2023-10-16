import React from 'react';
import {
  render, screen, fireEvent, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react';
import PostsPage from './index';
import { readPostList } from '@/services/post';

// Mock the readPostList function
jest.mock('@/services/post', () => ({
  readPostList: jest.fn(),
}));

// Sample post data for testing
const mockPosts = [{
  id: 1,
  title: '제목이여기에붙어요',
  content: '내용이여기에붙어요',
  writer: '글쓴이가여기에붙어요',
  password: 'password_here',
  created_at: '2014-03-17T14:03:17.000Z',
  updated_at: null,
}, {
  id: 2,
  title: '제목이여기에붙어요',
  content: '내용이여기에붙어요',
  writer: '글쓴이가여기에붙어요',
  password: 'password_here',
  created_at: '2014-03-17T14:03:17.000Z',
  updated_at: null,
},
];

describe('PostsPage', () => {
  beforeAll(() => {
    // Mock the readPostList function to return mockPosts
    readPostList.mockResolvedValue(mockPosts);
  });

  it('renders PostsPage with posts', async () => {
    const { container } = render(<PostsPage />);

    await waitForElementToBeRemoved(() => screen.getByText('글이 없습니다.'));

    waitFor(() => {
    // Check if the posts are displayed
      const postElements = screen.getAllByTestId('post-item');
      expect(postElements.length).toBe(mockPosts.length);
    });
  });
});
