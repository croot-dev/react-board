import styled from '@emotion/styled';

export const InputBox = styled.div`
`;
export const InputLabel = styled.div`

`;
export const InputField = styled.input`
    width: 100%;
    padding: 7px 7px 5px;
    border: 1px solid var(--text-color-4);
    &:hover,
    &:focus {
        outline: 1px solid #bbb
    }
`;

export const RequireIcon = styled.span`
    color: red;
    margin-left: 2px;
    ::before {content: '*'}
`;
