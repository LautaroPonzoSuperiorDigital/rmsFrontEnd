import { styled } from "styled-components"

export const TextAreaContainer = styled.label`
  max-width: ${({ focused }) => focused ? 'calc(100% - 2px)' : '100%'};

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-bottom: 2px solid ${({ focused }) => focused ? '#197572' : 'rgba(0, 0, 0, 0.15)'};
  color: rgba(0, 0, 0, 0.65);

  cursor: text;

  transition: border-color 200ms ease, max-width 200ms ease;
`

export const Label = styled.span`
  font-size: 1rem;

  white-space: nowrap;
`

export const StyledTextArea = styled.textarea`
  width: 100%;

  border: none;
  outline: none;

  text-align: left;
  color: #000;
  font-weight: bold;

  white-space: pre-wrap;
  overflow-y: hidden;
  outline: none;
  resize: none;
`