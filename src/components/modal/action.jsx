import PropTypes from "prop-types"
import { styled } from "styled-components"

const Action = styled.button`
  outline: none;
  border: none;

  background: #197572;
  color: #fff;
  font-size: 1rem;

  width: 250px;
  height: 40px;

  transition: filter 200ms ease;

  &[data-outline="true"][data-danger="true"] {
    color: red;
    background: transparent;

    text-decoration: underline;
  }

  &[data-outline="false"][data-danger="true"] {
    color: #fff;
    background: red;
  }

  &[data-outline="true"][data-danger="false"] {
    color: #197572;
    background: transparent;

    text-decoration: underline;
  }

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`

export function ModalAction({ text, action, outline = false, danger = false, disabled }) {
  return (
    <Action
      type="button"
      onClick={action}
      data-outline={outline}
      data-danger={danger}
      disabled={disabled}
    >
      {text}
    </Action>
  )
}

ModalAction.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  outline: PropTypes.bool,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
}