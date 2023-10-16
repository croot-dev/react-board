import styled from '@emotion/styled';

export const CommentWriteBox = styled.div`
    h3 {
        color: var(--text-color-3);
        font-weight: 700;
    }
`;

export const CommentTitle = styled.h2`
    font-size: 1rem;
    margin-bottom: 4px;
`;

export const CommentEmpty = styled.div`
    position: relative;
    padding: 16px 8px;
    border-top: 1px solid var(--bg-color-5);
    text-align: center;

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
