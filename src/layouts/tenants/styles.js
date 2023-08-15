import { styled } from "styled-components"

const calcMaxHeight = ({ navbarIsShown }) => {
  if (navbarIsShown) {
    return 'calc(100vh - 3.5rem - 4rem)' 
  }

  return 'calc(100vh - 3.5rem)'
}

export const TenantsLayoutWrapper = styled.div`
  position: relative;

  height: 100vh;
  overflow-y: auto;
`

export const PageContent = styled.div`
  margin-top: 3.5rem;
  
  height: 100%;
  max-height: ${calcMaxHeight};
  overflow-y: auto;
`