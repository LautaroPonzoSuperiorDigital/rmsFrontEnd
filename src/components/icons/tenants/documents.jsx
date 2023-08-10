import PropTypes from "prop-types"
import { styled } from "styled-components"

const Svg = styled.svg`
  path {
    fill: #272727;

    transition: fill 200ms ease;
  }

  &:hover path {
    fill: #197572;
  }
`

export function Documents({ filled = false }) {
  if (filled) {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width="16.479" height="20.786" viewBox="0 0 16.479 20.786">
        <path
          d="M9.577,24.921H19.8c2.062,0,3.127-1.084,3.127-3.156V13.181H15.735a1.556,1.556,0,0,1-1.774-1.774V4.136H9.577C7.524,4.136,6.45,5.22,6.45,7.3V21.766A2.8,2.8,0,0,0,9.577,24.921Zm6.34-13.141h6.916a2.619,2.619,0,0,0-.873-1.362L16.713,5.1a2.554,2.554,0,0,0-1.352-.873v6.993A.5.5,0,0,0,15.917,11.78Z"
          transform="translate(-6.45 -4.136)"
        />
      </Svg>
    )
  }

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="16.479" height="20.786" viewBox="0 0 16.479 20.786">
      <path
        d="M9.577,24.921H19.8c2.062,0,3.127-1.084,3.127-3.156V13.056a3.3,3.3,0,0,0-1.007-2.81L16.905,5.152a3.207,3.207,0,0,0-2.7-1.017H9.577C7.524,4.136,6.45,5.22,6.45,7.3V21.766A2.8,2.8,0,0,0,9.577,24.921ZM9.74,23a1.223,1.223,0,0,1-1.381-1.362V7.416A1.23,1.23,0,0,1,9.75,6.054h4.067v5.218a1.814,1.814,0,0,0,2.062,2.062H21.02v8.307A1.226,1.226,0,0,1,19.629,23Zm6.321-11.347c-.4,0-.575-.173-.575-.566V6.3l5.275,5.352Z"
        transform="translate(-6.45 -4.136)"
      />
    </Svg>
  )
}

Documents.propTypes = {
  filled: PropTypes.boolean
}