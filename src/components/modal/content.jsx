/* eslint-disable react/prop-types */

import { styled } from 'styled-components'

const Content = styled.div`
  @media (max-width: 768px) {
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`

export function ModalContent({ children }) {
  return <Content>{children}</Content>
}
