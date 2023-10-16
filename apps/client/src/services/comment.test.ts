import {
  readCommentList,
  readComment,
  createComment,
  updateComment,
  deleteComment,
  readReplyList,
} from './comment';
import { API_SERVER, API_COMMENT_URL } from '@/constants'

// Mock fetch function
global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ data: 'mocked data' }) }));

describe('Comment API functions', () => {
  const postId = Date.now();
  const password = 'testpassword';
  const commentId = postId + 1;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch comment list for a post', async () => {
    const comments = await readCommentList(postId);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_SERVER}/posts/${postId}/comments`);
    expect(comments).toEqual({ data: 'mocked data' });
  });

  it('should fetch a comment by ID', async () => {
    const commentId = 456;
    const comment = await readComment(commentId);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_SERVER}/${API_COMMENT_URL}/${commentId}`);
    expect(comment).toEqual({ data: 'mocked data' });
  });

  it('should create a new comment', async () => {
    const newComment = {
      id: commentId,
      parent: 123,
      postId,
      writer: 'Test Writer',
      password,
      content: 'Test Content',
    };
    const createdComment = await createComment(newComment);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_SERVER}/${API_COMMENT_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment),
    });
    expect(createdComment).toEqual({ data: 'mocked data' });
  });

  it('should update a comment', async () => {
    const updatedComment = { id: commentId, password, writer: 'Updated Writer' };
    const updatedCommentResponse = await updateComment(updatedComment);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_SERVER}/${API_COMMENT_URL}/${updatedComment.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: updatedComment.id, writer: updatedComment.writer, password }),
    });
    expect(updatedCommentResponse).toEqual({ data: 'mocked data' });
  });

  it('should delete a comment', async () => {
    const deletedComment = await deleteComment({ id: commentId, password });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_SERVER}/${API_COMMENT_URL}/${commentId}?password=${password}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    expect(deletedComment).toEqual({ data: 'mocked data' });
  });

  it('should fetch reply list for a post and parent comment', async () => {
    const postId = 123;
    const parentId = 456;
    const replyList = await readReplyList(postId, parentId);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_SERVER}/${API_COMMENT_URL}?postId=${postId}&parent=${parentId}`);
    expect(replyList).toEqual({ data: 'mocked data' });
  });
});