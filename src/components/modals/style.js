import styled from "styled-components"

export const ModalOverlayTenant = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  position: fixed;

  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`

export const BoxDocuments = styled.div`
  display: flex;
  width: 500px;
  border: 1px solid #00000026;
  margin-bottom: 5px;
  margin-top: 5px;
  margin-left: 10px;
  padding: 5px;
  max-height: 300px;
  overflow-y: auto;
`
export const TitleDocuments = styled.div`
  font-size: 18px;
  font-weight: 400;
`
export const DateTextDocuments = styled.div`
  font-size: 16px;
  color: #000000a5;
`

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 75%;
`
export const ApplicationContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  max-height: 50%;
`
