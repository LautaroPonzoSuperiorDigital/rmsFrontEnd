import { FiLoader } from "react-icons/fi";
import { styled } from "styled-components";

const mobileBreakpoint = "768px";

export const ListingInspectionSectionCategoryContainer = styled.li`
  max-height: 15rem;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: ${mobileBreakpoint}) {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    max-height: 3rem;
    min-height: 3rem;
    border: 1px solid #00000026;
    background-color: #fdfdfdd9;
  }
`;

export const Header = styled.div`
  position: absolute;
  inset: 0;
  bottom: unset;
  display: flex;
  align-items: center;
  padding: 0.375rem 0.5rem;
  background: rgba(253, 253, 253, 0.85);
  &[data-loading="true"] {
    opacity: 0.7;
  }

  > span {
    color: #197572;
  }

  @media (max-width: ${mobileBreakpoint}) {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    padding: 0.375rem 0.5rem;
    background: unset;

    > span {
      padding-left: 3.5rem;
    }
  }
`;

export const Action = styled.button.attrs({ type: "button" })`
  font-size: 0;
  outline: none;
  background: transparent;
  cursor: pointer;
  color: #197572;

  &:last-child {
    margin-left: 1rem;
  }

  &:not(:last-child) {
    margin-left: auto;
  }

  &:disabled {
    cursor: not-allowed;
  }

  > svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const ImagePreview = styled.img`
  user-select: none;
  object-fit: cover;
  max-width: 15rem;

  &[data-loading="true"] {
    opacity: 0.7;
  }

  &[data-clickable="true"] {
    cursor: pointer;
  }
`;

export const ImagePreviewMobile = styled.img`
  @media (max-width: ${mobileBreakpoint}) {
    object-fit: scale-down;
    object-position: left;
    max-width: 15rem;
  }
`;

export const UploadInput = styled.input.attrs({ type: "file", multiple: true })`
  display: none;
`;

export const LoadingBox = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  > span {
    color: #333;
    text-transform: uppercase;
    font-weight: bold;
  }
`;

export const Loader = styled(FiLoader)`
  width: 1.5rem;
  height: 1.5rem;
  color: #333;
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;

  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
