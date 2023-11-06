import {} from '@emotion/react';
import styled from '@emotion/styled';

export const TextAreaBox = styled.div``;
export const TextAreaLabel = styled.div``;
export const TextAreaField = styled.textarea`
    box-sizing: border-box;
    width:100%;
    margin-bottom: -2px;
    padding: 7px 7px 5px;
    border: 1px solid var(--text-color-4);
    resize: none;
`;

export const RequireIcon = styled.span`
    color: red;
    margin-left: 2px;
    ::before {content: '*'}
`;
