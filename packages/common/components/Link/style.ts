import styled from '@emotion/styled';
// import NextLink from 'next/link';

export const LinkItem = styled.a`
    display: block;
    border: 1px solid transparent;
    color: var(--text-color-4);
    text-decoration: none;

    &:hover {
        color: var(--text-color-1);
    }

    &[data-type=button] {
        display: inline-block;
        box-sizing: border-box;
        padding: 4px 8px;
        font-size: 1em;
        text-decoration: none;
        border-radius: 4px;
        border-color: var(--primary-color);
        background-color: var(--primary-color);
        color: var(--bg-color-1);
        line-height: 1.25;

        &:hover {
            background-color: var(--secondary-color);
            border-color: var(--secondary-color);
            cursor: pointer;
        }
        
    }
`;

export default {};
