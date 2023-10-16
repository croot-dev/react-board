import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostFormPage from './index';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      postId: '1', // 설정할 postId 값
    },
  }),
}));

// Mock useRouter for Next.js
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock createPost function
jest.mock('@/services/post', () => ({
  createPost: jest.fn(),
}));

const mockWindowAlert = jest.fn();
window.alert = jest.fn();

beforeEach(() => {
  jest.spyOn(window, 'alert').mockImplementation(mockWindowAlert);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('PostFormPage', () => {
  it('renders PostFormPage with form fields', async () => {
    const { container } = render(<PostFormPage />);

    // Check if form fields are rendered
    const titleInput = container.querySelector('input[name="title"]');
    const writerInput = container.querySelector('input[name="writer"]');
    const passwordInput = container.querySelector('input[name="password"]');
    const contentEditor = container.querySelector('.toastui-editor-');

    expect(titleInput).toBeInTheDocument();
    expect(writerInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    // expect(contentEditor).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const { container } = render(<PostFormPage />);

    // Fill in the form field
    const titleInput = container.querySelector('input[name="title"]');
    const writerInput = container.querySelector('input[name="writer"]');
    const passwordInput = container.querySelector('input[name="password"]');
    const submitButton = container.querySelector('#postFormSubmit');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    // expect(titleInput.value).toEqual('Test Title');
    fireEvent.change(writerInput, { target: { value: 'Test Writer' } });
    fireEvent.change(passwordInput, { target: { value: 'Test123!' } });
    await userEvent.click(submitButton);
    waitFor(() => {
      expect(mockWindowAlert).toHaveBeenCalledWith('내용을 입력해주세요.');
    });
  });

  it('displays an error message for invalid data', async () => {
    const { container } = render(<PostFormPage />);

    // Submit the form without filling in the fields
    const submitButton = container.querySelector('#postFormSubmit');
    await userEvent.click(submitButton);
    waitFor(() => {
      expect(window.alert).toBeCalled();
    });
  });
});
