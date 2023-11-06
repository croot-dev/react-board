export const listType = 'list';

export const rowPerPageDefault = '10';

export const rowPerPageOptions = [
  { value: '5', label: '5 per page' },
  { value: '10', label: '10 per page' },
  { value: '20', label: '20 per page' },
];

export const orderOptions = [
  { label: '제목 오름차순', value: 'title asc' },
  { label: '제목 내림차순', value: 'title desc' },
  { label: '작성일 오름차순', value: 'created_at asc' },
  { label: '작성일 내림차순', value: 'created_at desc' },
];

export const defaultSortOrder = 'created_at desc';

export const replyDepthLimit = 3;

export const API_SERVER = 'https://react-board-8bdfb-default-rtdb.firebaseio.com';
export const API_POST_URL = 'posts';
export const API_COMMENT_URL = 'comments';
