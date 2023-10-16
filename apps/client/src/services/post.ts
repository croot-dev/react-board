import dayjs from 'dayjs';
import type { IPost, IPostForm, IPostWithComment } from '@/types';
import CustomException from './CustomException';
import { API_SERVER, API_POST_URL } from '@/constants';

interface IReadQuery{
  _sort?: string;
  _order?: string;
  _page?: string;
  _limit?: string;
}
export const readPostList = async (query?:IReadQuery):Promise<IPostWithComment[]> => {
  try {
    const queryString = new URLSearchParams(query as Record<string, string>).toString();
    const result = await fetch(`${API_SERVER}/${API_POST_URL}.json?${queryString}`);
    if (result.ok !== true) throw result;
    return result.json();
  } catch (error) {
    throw new CustomException(error);
  }
};
export const createPost = async (newPost: IPostForm):Promise<IPost> => {
  try {
    const body = JSON.stringify({
      ...newPost,
      created_at: dayjs().format(),
    });
    const result = await fetch(`${API_SERVER}/${API_POST_URL}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    if (result.ok !== true) throw result;
    return result.json();
  } catch (error) {
    throw new CustomException(error);
  }
};
export const readPost = async (postId: string): Promise<IPost> => {
  try {
    if (!postId) { throw new Error('Post ID value is incorrect'); }

    const result = await fetch(`${API_SERVER}/${API_POST_URL}/${postId}.json`);
    if (result.ok !== true) throw result;
    return result.json();
  } catch (error) {
    throw new CustomException(error);
  }
};
// // not use.
// export const readPostWithComment = async (postId: number): Promise<IPostWithComment> => {
//   const result = await fetch(`${API_SERVER}/${API_POST_URL}/${postId}?_embed=comments`);
//   if (result.ok !== true) {
//     throw result;
//   }
//   return result.json();
// };
export const updatePost = async (newPost: Omit<IPost, 'created_at'|'updated_at'>): Promise<IPost[]> => {
  try {
    if (!newPost.id) { throw new Error('Post ID value is incorrect'); }

    const body = JSON.stringify({
      ...newPost,
      updated_at: dayjs().format(),
    });
    const result = await fetch(`${API_SERVER}/${API_POST_URL}/${newPost.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    if (result.ok !== true) throw result;
    return result.json();
  } catch (error) {
    throw new CustomException(error);
  }
};
export const deletePost = async ({ id, password }: Pick<IPost, 'id'|'password'>): Promise<IPost[]> => {
  try {
    if (!id) { throw new Error('Post ID value is incorrect'); }

    const body = JSON.stringify({ password });
    const result = await fetch(`${API_SERVER}/${API_POST_URL}/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    if (result.ok !== true) throw result;
    return result.json();
  } catch (error) {
    throw new CustomException(error);
  }
};
