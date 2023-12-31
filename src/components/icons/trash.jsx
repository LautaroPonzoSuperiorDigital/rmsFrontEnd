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

export function Trash() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="17.367" height="19.661" viewBox="0 0 17.367 19.661">
      <path id="trash.fill" d="M9.843,22.479h8.323a1.761,1.761,0,0,0,1.96-1.837l.554-12.7h1.213a.782.782,0,0,0,.791-.791.773.773,0,0,0-.791-.773H18.078V5.059a2.144,2.144,0,0,0-2.417-2.241h-3.34A2.144,2.144,0,0,0,9.9,5.059V6.377h-3.8a.782.782,0,1,0,0,1.564H7.329l.563,12.7A1.749,1.749,0,0,0,9.843,22.479Zm1.89-17.341a.636.636,0,0,1,.712-.65h3.1a.636.636,0,0,1,.712.65V6.377H11.732ZM11.179,19.78a.57.57,0,0,1-.606-.58l-.264-9.334a.559.559,0,0,1,.606-.589.57.57,0,0,1,.606.58l.264,9.334A.55.55,0,0,1,11.179,19.78Zm2.821,0a.563.563,0,0,1-.615-.58V9.857A.568.568,0,0,1,14,9.277a.575.575,0,0,1,.624.58V19.2A.571.571,0,0,1,14,19.78Zm2.821.009a.554.554,0,0,1-.607-.589l.264-9.343a.57.57,0,0,1,.606-.58.559.559,0,0,1,.606.589L17.428,19.2A.577.577,0,0,1,16.821,19.789Z" transform="translate(-5.316 -2.817)" fill="#000000A5"/>
    </Svg>
  )
}