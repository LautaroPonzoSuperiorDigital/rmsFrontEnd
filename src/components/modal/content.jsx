/* eslint-disable react/prop-types */

import { styled } from "styled-components"

const Content = styled.div`
`

export function ModalContent({ children }) {
  return <Content>{children}</Content>
}
