import {
  readPostList,
  createPost,
  readPost,
  updatePost,
  deletePost,
} from './post';
import { API_SERVER, API_POST_URL } from '@/constants'

// Mock fetch function
global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ data: 'mocked data' }) }));

describe('API functions', () => {
  const postId = Date.now().toString();
  const password = 'testpassword';
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch post list with query parameters', async () => {
    const query = { _sort: 'date', _order: 'asc' };
    const posts = await readPostList(query);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_SERVER}/${API_POST_URL}?_embed=comments&_sort=date&_order=asc`);
    expect(posts).toEqual({ data: 'mocked data' });
  });

  it('should create a new post', async () => {
    const newPost = { id: postId, title: 'Test Post', writer: 'Test Writer', password, content: 'Test Content' };
    const createdPost = await createPost(newPost);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_SERVER}/${API_POST_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });
    expect(createdPost).toEqual({ data: 'mocked data' });
  });

  it('should fetch a post by ID', async () => {
    const post = await readPost(postId);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_SERVER}/${API_POST_URL}/${postId}`);
    expect(post).toEqual({ data: 'mocked data' });
  });

  it('should update a post', async () => {
    const updatedPost = { id: postId, title: 'Updated Post', password, content: 'Updated Content' };
    const updatedPosts = await updatePost(updatedPost);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_SERVER}/${API_POST_URL}/${updatedPost.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    });
    expect(updatedPosts).toEqual({ data: 'mocked data' });
  });

  it('should delete a post', async () => {
    const deletedPosts = await deletePost({ id: postId, password });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_SERVER}/${API_POST_URL}/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    expect(deletedPosts).toEqual({ data: 'mocked data' });
  });
});