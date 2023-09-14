/* eslint-disable react/prop-types */
// import { FiX } from 'react-icons/fi'
import { styled } from "styled-components";
import { useModal } from "./context";
import { Close } from "../icons";
import { MobileClose } from "../icons/mobile-close";
import { useEffect, useState } from "react";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  padding: 1rem;

  @media (max-width: 768px) {
    // width: 100vw;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;

    button {
      position: fixed;
      display: inline-flex;
      margin-top: 1rem;
    }
  }
`;

const CloseButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  font-size: 0;
  outline: none;
  margin-left: auto;

  @media (max-width: 768px) {
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

export function ModalHeader({ children, showCloseIcon = false }) {
  const [isMobile, setIsMobile] = useState(false);
  const { close } = useModal();

  useEffect(() => {
    function updateModalWidth() {
      setIsMobile(window.outerWidth <= 768);
    }

    updateModalWidth();

    window.addEventListener("resize", updateModalWidth);

    return () => {
      window.removeEventListener("resize", updateModalWidth);
    };
  }, []);

  return (
    <Header>
      {children}

      {showCloseIcon && (
        <CloseButton type="button" onClick={close}>
          {isMobile ? <MobileClose /> : <Close size={16} />}
        </CloseButton>
      )}
    </Header>
  );
}
