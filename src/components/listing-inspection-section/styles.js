import { styled } from "styled-components"

export const ListingInspectionSectionContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 3rem;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  >h1:first-child {
    font-size: 2rem;

    cursor: pointer;
    color: rgba(0, 0, 0, 0.46);

    &:hover {
      color: #31AF9A;
    }
  }

  >h1:last-child {
    font-size: 2rem;

    color: #272727;
    text-transform: uppercase;
  }
`

export const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  
  margin-top: 3rem;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
`

export const NewCategory = styled.li`
  min-height: 12rem;
  height: 100%;

  border: 1px solid #197572;

  position: relative;

  cursor: pointer;

  >span {
    color: #197572;

    &:first-child {
      display: block;

      margin-top: 0.375rem;
      margin-left: 1rem;
    }

    &:last-child {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
`