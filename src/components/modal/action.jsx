import PropTypes from "prop-types"
import { styled } from "styled-components"

const getBackground = ({ outline, danger }) => {
  if (outline) {
    return 'transparent'
  }

  if (danger) {
    return 'red'
  }

  return '#197572'
}

const getColor = ({ outline, danger }) => {
  if (outline && danger) {
    return 'red'
  }

  if (outline) {
    return "#197572"
  }

  return '#fff'
}

const Action = styled.button`
  outline: none;
  border: none;

  background: ${getBackground};
  color: ${getColor};
  text-decoration: ${({ outline }) => outline ? 'underline' : 'none'};
  font-size: 1rem;

  width: 250px;
  height: 40px;

  transition: filter 200ms ease;

  &:hover {
    filter: brightness(0.9);
  }
`

export function ModalAction({ text, action, outline = false, danger = false }) {
  return (
    <Action
      type="button"
      onClick={action}
      outline={outline}
      danger={danger}
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
}