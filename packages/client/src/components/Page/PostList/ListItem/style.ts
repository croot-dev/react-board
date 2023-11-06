import styled from '@emotion/styled';

export const PostList = styled.div` 
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 15px 12px;
  border-top: 1px solid var(--bg-color-4);
  background-color: var(--bg-color-1);
  transition: all ease .2s;
  justify-content: space-between;
  align-items: center;

  & > div:first-of-type { min-width: 0; }

  &:hover {
    background-color: var(--bg-color-3);
    cursor: pointer;
  }
`;

export const PostTitle = styled.h2`
  font-size: 1.25em;
  margin: 0 0 5px;
  font-weight: 700;
  color: var(--text-color-3);
`;

export const PostContent = styled.p`
margin: 0;
overflow: hidden;
text-overflow: ellipsis;
font-size: 1em;
@media screen and (max-width: 720px) {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
@media screen and (min-width: 721px) {
  max-width: 400px;
  white-space: nowrap;
}
`;

export const PostCreatedAt = styled.span`
  display: block;
  font-size: 1em;
  margin: 0;
  transform: translateY(-50%);
`;

export const CommentCount = styled.span`
margin-left: 6px;
font-size: .9rem;
color: #555;
vertical-align: top;
`;
