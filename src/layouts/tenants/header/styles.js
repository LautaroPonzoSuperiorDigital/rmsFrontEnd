import { css, styled } from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  inset: 0;
  bottom: unset;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;
  height: 3.5rem;
`

export const GoBackButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  
  cursor: pointer;

  ${({ hide }) => hide && css`
    >svg {
      display: none;
    }
  `};
`

export const Title = styled.span`
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.65);
  text-transform: uppercase;
`