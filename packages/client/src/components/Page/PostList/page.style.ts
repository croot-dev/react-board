import styled from '@emotion/styled';
import { Select } from '@react-board/common/components';

export const BoardContainer = styled.div`
  margin: 0 auto;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 4px;
`;

export const PageSizeSelect = styled(Select)`
  width: 150px;
  margin-right: 20px;
`;

export const BoardTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const BoardEmpty = styled.div`
  padding: 25px 0;
  text-align: center;
`;
