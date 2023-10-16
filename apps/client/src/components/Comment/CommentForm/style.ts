import styled from '@emotion/styled';
import { Button, Textarea } from '@/components/UI';

export const CommentFormContainer = styled.form`
    background-color: var(--bg-color-4);
    padding: 10px;
    margin-bottom: 15px;

    & > div + div {
        margin-top: 6px;
    }
`;

export const CommentFormTextArea = styled(Textarea)`
    height: 100%;
`;

export const CommentFormButton = styled(Button)`
    width: 100%;
    height: 32px;

    & + & { margin-top: 6px }
    
    &:only-of-type {
        height: 70px;
    }
`;
