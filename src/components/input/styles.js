import { styled } from 'styled-components'

export const InputContainer = styled.label`
  max-width: ${({ focused }) => (focused ? 'calc(100% - 2px)' : '100%')};

  display: flex;
  align-items: center;

  border-bottom: 2px solid
    ${({ focused }) => (focused ? '#197572' : 'rgba(0, 0, 0, 0.15)')};
  color: rgba(0, 0, 0, 0.65);

  cursor: text;

  transition: border-color 200ms ease, max-width 200ms ease;
`

export const Label = styled.span`
  font-size: 1rem;

  white-space: nowrap;
`

export const StyledInput = styled.input`
  width: 100%;

  border: none;
  outline: none;

  text-align: right;
  color: #000;
  font-weight: bold;

  /* Remove Input Number Arrows */
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`
