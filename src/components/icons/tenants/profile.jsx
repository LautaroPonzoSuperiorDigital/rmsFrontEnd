import PropTypes from "prop-types"
import { styled } from "styled-components"

const Svg = styled.svg`
  path {
    fill: #1c1c1e;

    transition: fill 200ms ease;
  }

  &:hover path {
    fill: #197572;
  }
`

export function Profile({ filled = false }) {
  if (filled) {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width="21.314" height="21.304" viewBox="0 0 21.314 21.304">
        <path 
          d="M15.555,25.87A10.652,10.652,0,1,0,4.9,15.218,10.721,10.721,0,0,0,15.555,25.87Zm-.01-8.973a3.715,3.715,0,0,1-3.585-3.935,3.71,3.71,0,0,1,3.585-3.853,3.724,3.724,0,0,1,3.585,3.853A3.7,3.7,0,0,1,15.545,16.9Zm0,7.211A8.865,8.865,0,0,1,9.23,21.482c1.185-1.772,3.533-2.8,6.315-2.8,2.751,0,5.12,1.01,6.315,2.8A8.864,8.864,0,0,1,15.545,24.109Z"
          transform="translate(-4.903 -4.566)"
        />
      </Svg>
    )
  }

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="21.314" height="21.304" viewBox="0 0 21.314 21.304">
      <path
        d="M15.555,25.87A10.652,10.652,0,1,0,4.9,15.218,10.721,10.721,0,0,0,15.555,25.87Zm0-7.088A8.625,8.625,0,0,0,9.3,21.018a8.52,8.52,0,1,1,12.516.01A8.592,8.592,0,0,0,15.555,18.783Zm0-1.689A3.667,3.667,0,0,0,19.109,13.2a3.7,3.7,0,0,0-3.554-3.822A3.689,3.689,0,0,0,12.011,13.2,3.691,3.691,0,0,0,15.555,17.093Z"
        transform="translate(-4.903 -4.566)"
      />
    </Svg>
  )
}

Profile.propTypes = {
  filled: PropTypes.boolean
}