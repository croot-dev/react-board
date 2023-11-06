import styled from '@emotion/styled';

export const ButtonItem = styled.button`
  box-sizing: border-box;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--primary-color);
  background-color: var(--primary-color);
  color: var(--bg-color-1);
  font-size: 1em;
  line-height: 1.25;
  
  &:not(:disabled):hover {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &[type=submit] {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
  }
  &[type=submit]:hover,
  &[type=submit]:focus {
    background-color: var(--tertiary-color);
    border-color: var(--tertiary-color);
  }

  &[type=reset] {
    border: 1px solid black;
    background-color: white;
    color: black;
  }
  &[type=reset]:hover,
  &[type=reset]:focus {
    background-color: lightgrey;
  }

  &[data-size=small] {
    font-size: 0.8em;
  }
`;

export const dum = '';
