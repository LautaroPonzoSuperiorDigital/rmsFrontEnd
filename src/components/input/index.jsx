import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import { InputContainer, StyledInput } from './styles'

const InputWithRef = ({
  type,
  label,
  defaultValue,
  placeholder,
  onChange,
  className,
  name,
},
  ref) => {
  return (
    <InputContainer>
      {label}

      <StyledInput
        ref={ref}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        name={name}
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
  className: PropTypes.string,
  name: PropTypes.string,
}

export const Input = forwardRef(InputWithRef)