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

export function Edit() {
  return (
    <Svg id="pencil" xmlns="http://www.w3.org/2000/svg" width="17.443" height="16.497" viewBox="0 0 17.443 16.497">
      <path id="pencil-2" data-name="pencil" d="M22.523,9.887l1.138-1.071A1.014,1.014,0,0,0,23.734,7.2l-.407-.4a1.148,1.148,0,0,0-1.7.089L20.487,7.953ZM9.731,22.019l11.789-11.2L19.495,8.9,7.706,20.084,6.682,22.425a.415.415,0,0,0,.522.516Z" transform="translate(-6.659 -6.465)" fill="#000000A5"/>
    </Svg>
  )
}