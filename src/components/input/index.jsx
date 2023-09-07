import PropTypes from 'prop-types'
import { forwardRef, useState } from 'react'

import { InputContainer, Label, StyledInput } from './styles'

const InputWithRef = (
  {
    type,
    label,
    defaultValue,
    placeholder,
    className,
    name,
    disabled,
    onChange,
    onClick,
    onBlur,
    containerStyle,
  },
  ref,
) => {
  const [focused, setFocused] = useState(false)

  const handleBlur = (event) => {
    setFocused(false)

    onBlur?.(event)
  }

  return (
    <InputContainer style={containerStyle} focused={focused}>
      {label && <Label>{label}</Label>}

      <StyledInput
        ref={ref}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={className}
        name={name}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onChange={onChange}
        onClick={onClick}
        onBlur={handleBlur}
      />
    </InputContainer>
  )
}

InputWithRef.propTypes = {
  containerStyle: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
}

export const Input = forwardRef(InputWithRef)