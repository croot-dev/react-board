import styled from '@emotion/styled';

export const PageTitle = styled.h1`
    margin-bottom: 20px;
    padding: 60px 0 20px;
    font-size: 2em;
    border-bottom: 2px solid var(--primary-color);

    @media screen and (max-width: 720px) {
        padding: 30px 0 15px;
    }
`;

export const Wrapper = styled.div`
    overflow: auto;
    max-width: 1280px;
    height: 100vh;
    margin: 0 auto;
    padding: 0 40px;
    background-color: var(--bg-color-1);
    padding-bottom: 80px;

    @media screen and (max-width: 720px) {
        padding: 0 15px;
        padding-bottom: 40px;
    }
`;
