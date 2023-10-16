import styled from '@emotion/styled';

export const ItemContainer = styled.div`
  position: relative;
  padding: 16px 0 8px 8px;
  border-top: 1px solid var(--bg-color-5);

  ::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: var(--primary-color);
    opacity: 0.2;
  }
`;

export const ItemInnerContainer = styled.div`
  position: relative;
  z-index: 1;
`;

export const ItemRow = styled.div`
  margin-bottom: 6px;
  padding-left: 20px;
  text-indent: -20px;
  word-break: break-word;

  & svg {
    margin-right: 5px;
    vertical-align: middle;
  }
`;

export const ItemButtons = styled.div`
  display: flex;
  gap: 2px;
  margin-right: 10px;
  @media screen and (max-width: 720px) {
    flex-direction: column;
  }
`;

export const ReplyItemButtons = styled(ItemButtons)`
  margin-left: 5px;
`;
