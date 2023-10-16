import type { IComment } from '@/types';
import CustomException from './CustomException';
import { API_SERVER, API_COMMENT_URL } from '@/constants';

export const readCommentList = async (postId: string):Promise<IComment[]> => {
  try {
    const result = await fetch(`${API_SERVER}/posts/${postId}/comments.json`);
    if (result.ok !== true) throw result;
    return result.json();
  } catch (error) {
    throw new CustomException(error);
  }
};

export const readComment = async (commentId: string): Promise<IComment> => {
  try {
    if (!commentId) { throw new Error('Comment ID value is incorrect'); }

    const result = await fetch(`${API_SERVER}/${API_COMMENT_URL}/${commentId}.json`);
    if (result.ok !== true) throw result;
    return result.json();
  } catch (error) {
    throw new CustomException(error);
  }
};

type ICommentForm = Pick<IComment, 'parent'|'postId'|'writer'|'password'|'content'>
export const createComment = async (newPost: ICommentForm):Promise<IComment> => {
  try {
    const body = JSON.stringify(newPost);
    const result = await fetch(`${API_SERVER}/${API_COMMENT_URL}.json`, {
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

type ICommentEdit = Pick<IComment, 'id'|'parent'|'postId'|'writer'|'password'|'content'>
export const updateComment = async (newComment: ICommentEdit): Promise<IComment> => {
  try {
    if (!newComment.id) { throw new Error('Comment ID value is incorrect'); }

    const body = JSON.stringify({
      id: newComment.id,
      ...('writer' in newComment && { writer: newComment.writer }),
      ...('password' in newComment && { password: newComment.password }),
      ...('content' in newComment && { content: newComment.content }),
    });
    const result = await fetch(`${API_SERVER}/${API_COMMENT_URL}/${newComment.id}.json`, {
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

export const deleteComment = async ({ id, password }: Pick<IComment, 'id'|'password'>): Promise<IComment> => {
  try {
    if (!id) { throw new Error('Comment ID value is incorrect'); }

    const body = JSON.stringify({ password });
    const result = await fetch(`${API_SERVER}/${API_COMMENT_URL}/${id}.json?password=${password}`, {
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

export const readReplyList = async (postId: string, parentId: string):Promise<IComment[]> => {
  try {
    if (!postId) { throw new Error('Post ID value is missing'); }
    if (!parentId) { throw new Error('Parent ID value is missing'); }

    const result = await fetch(`${API_SERVER}/${API_COMMENT_URL}.json?postId=${postId}&parent=${parentId}`);
    if (result.ok !== true) throw result;
    return result.json();
  } catch (error) {
    throw new CustomException(error);
  }
};
