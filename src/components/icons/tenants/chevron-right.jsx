import PropTypes from "prop-types"
import { styled } from "styled-components"

const Svg = styled.svg`
  path {
    transition: fill 200ms ease;
  }

  &:hover path {
    fill: #197572;
  }
`

export function ChevronRight({ filled, color }) {
  if (filled) {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width="6.922" height="12.024" viewBox="0 0 6.922 12.024">
        <path
          d="M15.271,11.87a.807.807,0,0,1-.278.617L9.718,17.652a.772.772,0,0,1-.563.23.8.8,0,0,1-.807-.807.828.828,0,0,1,.244-.576l4.752-4.629L8.593,7.241a.84.84,0,0,1-.244-.576.8.8,0,0,1,.807-.807.772.772,0,0,1,.563.23l5.274,5.158A.831.831,0,0,1,15.271,11.87Z"
          transform="translate(-8.349 -5.858)"
          fill={color || "#197572"}
        />
      </Svg>
    )
  }

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="6.922" height="12.024" viewBox="0 0 6.922 12.024">
      <path
        d="M15.271,11.87a.807.807,0,0,1-.278.617L9.718,17.652a.772.772,0,0,1-.563.23.8.8,0,0,1-.807-.807.828.828,0,0,1,.244-.576l4.752-4.629L8.593,7.241a.84.84,0,0,1-.244-.576.8.8,0,0,1,.807-.807.772.772,0,0,1,.563.23l5.274,5.158A.831.831,0,0,1,15.271,11.87Z"
        transform="translate(-8.349 -5.858)"
      />
    </Svg>
  )
}

ChevronRight.propTypes = {
  filled: PropTypes.bool,
  color: PropTypes.string,
}