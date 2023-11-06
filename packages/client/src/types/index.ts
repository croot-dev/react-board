export interface IPost { // /posts
  id: string; // 글번호 - 자동 생성
  title: string; // 제목
  content: string; // 내용
  writer: string; // Writer
  password: string; // 비밀번호: 응답 값에서는 보이지 않음
  created_at: string; // 작성일자: ISO 8601
  updated_at?: string; // 수정일자: ISO 8601
}

export type IPostForm = Omit<IPost, 'id'|'created_at'|'updated_at'>

export interface IPostWithComment extends IPost { // /posts
  comments: IComment[]
}

export interface IComment { // /comments
  id: string; // 댓글번호 - 자동 생성
  postId: string; // 글번호(FK): 댓글이 달린 게시글의 `index`
  parent?: string; // 부모댓글번호: is답글 ? (부모 댓글의 `index`) : undefined
  content: string; // 내용
  writer: string; // Writer
  password: string; // 비밀번호: 응답 값에서는 보이지 않음
  created_at: string; // 작성일자: ISO 8601
  updated_at?: string; // 수정일자: ISO 8601
}

export interface CustomError {
  statusCode: number;
  message: string;
  stack?: string;
}

export type OrderBy = 'asc' | 'desc';
