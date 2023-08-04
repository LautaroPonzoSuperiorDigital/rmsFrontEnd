import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import { InputContainer, StyledInput } from './styles'

const InputWithRef = ({ type, label, defaultValue, placeholder, onChange }, ref) => {
  return (
    <InputContainer>
      {label}

      <StyledInput
        ref={ref}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
      />
    </InputContainer>
  )
}

InputWithRef.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export const Input = forwardRef(InputWithRef)