import { styled } from "styled-components"

/* eslint-disable react/prop-types */
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.675;

  color: #222;
`

export function ModalTitle({ title }) {
  return (
    <Title>
      {title}
    </Title>
  )
}
