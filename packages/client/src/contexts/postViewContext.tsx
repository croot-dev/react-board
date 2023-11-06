'use client';

import React, {
  createContext, useState,
} from 'react';
import type { IComment } from '@/types';

export const PostViewContext = createContext({
  commentList: [] as IComment[],
  setCommentList: (value: IComment[]) => { console.log(value); },
});

interface IProps {
    children: React.ReactNode
}
export function PostViewContextProvider({ children }: IProps) {
  const [commentList, setCommentList] = useState<IComment[]>([]);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PostViewContext.Provider value={{ commentList, setCommentList }}>
      {children}
    </PostViewContext.Provider>
  );
}
