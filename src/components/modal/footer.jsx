import PropTypes from "prop-types";
import { styled } from "styled-components";
import { useModal } from "./context";

const Footer = styled.footer`
  margin-top: 1.5rem;
  padding: 3rem 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border-top: 2px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-top: 1rem;
    border-top: none;

    padding: 2rem 1rem;
  }
`;

export function ModalFooter({ style, children }) {
  const { footerIsShown } = useModal();

  if (!footerIsShown) {
    return null;
  }

  return <Footer style={style}>{children}</Footer>;
}

ModalFooter.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};
