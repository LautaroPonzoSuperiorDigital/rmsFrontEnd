import PropTypes from 'prop-types'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { TextAreaContainer, Label, StyledTextArea } from './styles'

const TextAreaWithRef = (
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
    onFocus,
  },
  ref,
) => {
  const [focused, setFocused] = useState(false)
  
  const textAreaRef = useRef(null)

  const handleResize = useCallback(() => {
    let element

    if (!ref?.current) {
      element = textAreaRef.current
    } else {
      element = ref.current
    }

    element.style.height = 'auto'
    element.style.height = `${element.scrollHeight}px`
  }, [ref, textAreaRef])

  const handleChange = (event) => {
    handleResize()

    onChange?.(event)
  }

  const handleFocus = (event) => {
    setFocused(true)

    handleResize()

    onFocus?.(event)
  }

  const handleBlur = (event) => {
    setFocused(false)

    onBlur?.(event)
  }

  useEffect(() => {
    if (defaultValue) {
      handleResize()
    }
  }, [defaultValue, handleResize])

  return (
    <TextAreaContainer focused={focused}>
      {label && <Label>{label}</Label>}

      <StyledTextArea
        ref={element => {
          if (!ref) {
            textAreaRef.current = element
          } else {
            ref.current = element
          }
        }}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={className}
        name={name}
        disabled={disabled}
        onFocus={handleFocus}
        onChange={handleChange}
        onClick={onClick}
        onBlur={handleBlur}
      />
    </TextAreaContainer>
  )
}

TextAreaWithRef.propTypes = {
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
  onFocus: PropTypes.func,
}

export const TextArea = forwardRef(TextAreaWithRef)