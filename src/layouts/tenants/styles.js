import { styled } from "styled-components"

export const TenantsLayoutWrapper = styled.div`
  position: relative;

  height: 100vh;
  overflow-y: auto;
`

export const PageContent = styled.div`
  margin-top: 3.5rem;
  
  height: 100%;
  max-height: calc(100vh - 3.5rem - 3.125rem);
  overflow-y: auto;
`