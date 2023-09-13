import { styled } from "styled-components";
import { useModal } from "./context";

const BodyContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 4px;
  background: #fff;

  @media (max-width: 768px) {
    position: relative;
    display: flex;
    flex-direction: column;
    transform: unset;
    left: 0;
    top: 0;
  }
`;

// eslint-disable-next-line react/prop-types
export function ModalBody({ children, width }) {
  const { height } = useModal();

  return <BodyContainer style={{ width, height }}>{children}</BodyContainer>;
}
