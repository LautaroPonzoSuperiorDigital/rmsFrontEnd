import { styled } from "styled-components";

export const ListingInspectionSectionCategoryImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  user-select: none;

  > svg {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
  }

  > img {
    width: 100%;
    height: 70vh;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    > img {
      width: 100%;
      height: 100vh;
      object-fit: contain;
    }
  }
`;

export const InspectionImagesDetailsBox = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(253, 253, 253, 0.8);
  color: #197572;
  padding: 0.375rem 0.5rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: unset;
    transform: unset;
    color: #000000a5;
    padding: 1rem 0;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    height: fit-content;
  }
`;
