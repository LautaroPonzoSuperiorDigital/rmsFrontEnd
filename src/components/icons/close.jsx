/* eslint-disable react/prop-types */
import { styled } from "styled-components"

const Svg = styled.svg`
  path {
    fill: #1C1C1E;

    transition: fill 200ms ease;
  }

  &:hover path {
    fill: #31AF9A;
  }
`

export function Close() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="11.932" height="13.974" viewBox="0 0 11.932 13.974">
      <path id="close" d="M8.314,19.682a1.325,1.325,0,0,0,.009,1.646.913.913,0,0,0,1.415.01L14,16.348l4.263,4.991a.9.9,0,0,0,1.406-.01,1.328,1.328,0,0,0,.009-1.657l-4.263-4.991L19.678,9.7a1.328,1.328,0,0,0-.009-1.657.9.9,0,0,0-1.406-.01L14,13.025,9.737,8.034a.913.913,0,0,0-1.415.01,1.325,1.325,0,0,0-.009,1.646l4.263,4.991Z" transform="translate(-8.031 -7.7)" fill="#1c1c1e"/>
    </Svg>
  )
}