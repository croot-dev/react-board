import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostViewPage from './index';

window.alert = jest.fn();

// Mock useRouter for Next.js
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Mock deletePost function
jest.mock('@/services/post', () => ({
  deletePost: jest.fn(),
  readPost: jest.fn(),
}));

describe('PostViewPage', () => {
  it('displays post details and deletes a post', async () => {
    // Mocked post data
    const mockPost = {
      id: 1,
      title: 'Test Post',
      writer: 'Test Writer',
      created_at: '2022-01-01T12:00:00.000Z',
      updated_at: null,
      content: 'Test content',
    };

    // Mock the deletePost function
    const mockDeletePost = jest.fn();

    // Mock the readPost function
    jest.spyOn(global.require('@/services/post'), 'readPost').mockResolvedValue(mockPost);

    // Render the component
    const { container } = render(<PostViewPage />);

    // Check if post details are displayed
    await waitFor(() => {
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Test Post')).toBeInTheDocument();
      expect(screen.getByText('Writer')).toBeInTheDocument();
      expect(screen.getByText('Test Writer')).toBeInTheDocument();
      expect(screen.getByText('Created Date')).toBeInTheDocument();
      expect(screen.getByText('Updated Date')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    // Delete the post
    const deleteButton = screen.getByText('Delete');
    await userEvent.click(deleteButton);

    // Confirm the delete action
    expect(screen.getByText('Please Input Password')).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText('Input password');
    fireEvent.change(passwordInput, { target: { value: 'test123@@' } });
    const confirmButton = screen.getByText('Confirm');
    userEvent.click(confirmButton);
    // // Check if the deletePost function was called
    expect(window.alert).toHaveBeenCalled();
  });
});
