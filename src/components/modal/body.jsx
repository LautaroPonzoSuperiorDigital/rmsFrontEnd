/* eslint-disable react/prop-types */

import { styled } from "styled-components"

const BodyContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  max-height: 90vh;
  overflow-y: auto;

  /* width: 100% */
  border-radius: 4px;

  background: #fff;
`

export function ModalBody({ children, width }) {
  return (
    <BodyContainer style={{ width }}>
      {children}
    </BodyContainer>
  )
}
