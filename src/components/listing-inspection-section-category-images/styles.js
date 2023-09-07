import { styled } from "styled-components"

export const ListingInspectionSectionCategoryImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  user-select: none;

  >svg {
    width: 3rem;
    height: 3rem;

    cursor: pointer;
  }

  >img {
    width: 100%;
    height: 70vh;

    object-fit: contain;
  }
`

export const InspectionImagesDetailsBox = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);

  background: rgba(253, 253, 253, 0.85);

  color: #197572;

  padding: 0.375rem 0.5rem;
`