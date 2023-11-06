import { render, screen, fireEvent } from '@testing-library/react';
import PostEditPage from './index';
import { updatePost } from '@/services/post';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      postId: '1', // 설정할 postId 값
    },
  }),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => '1', // 설정할 postId 값
  }),
}));

jest.mock('@/services/post', () => ({
  updatePost: jest.fn(),
}));

const mockWindowAlert = jest.fn();

beforeEach(() => {
  jest.spyOn(window, 'alert').mockImplementation(mockWindowAlert);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('PostEditPage', () => {
  it('1+1=2', () => {
    expect(1 + 1).toEqual(2);
  });
  //   it('renders the page and submits the form', async () => {
  //     render(<PostEditPage />);

  //     // 여기에 필요한 요소와 상태를 설정하고 테스트
  //     const titleInput = screen.getByLabelText('Title');
  //     const writerInput = screen.getByLabelText('Writer');
  //     const passwordInput = screen.getByLabelText('Password');
  //     const submitButton = screen.getByText('Submit');

  //     // 필드에 입력
  //     fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  //     fireEvent.change(writerInput, { target: { value: 'John Doe' } });
  //     fireEvent.change(passwordInput, { target: { value: 'password123' } });

  //     // Submit 버튼 클릭
  //     fireEvent.click(submitButton);

  //     // updatePost 함수 호출 여부 확인
  //     expect(updatePost).toHaveBeenCalledWith({
  //       id: 1, // postId 값 설정
  //       title: 'Test Title',
  //       writer: 'John Doe',
  //       content: '', // content 필드에 대한 테스트 추가 필요
  //       password: 'password123',
  //     });

  //     // window.alert 함수 호출 여부 확인
  //     expect(mockWindowAlert).toHaveBeenCalledWith('Success');
  //   });
});
