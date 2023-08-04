import { styled } from "styled-components"

export const InputContainer = styled.label`
  display: flex;
  align-items: center;

  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  color: rgba(0, 0, 0, 0.65);

  cursor: text;
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
  &[type=number] {
    -moz-appearance: textfield;
  }
`