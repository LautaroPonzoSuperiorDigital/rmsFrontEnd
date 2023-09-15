import { styled } from "styled-components";

const mobileBreakpoint = "768px";

export const ListingInspectionSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3rem;

  @media (max-width: ${mobileBreakpoint}) {
    padding: 0 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  > h1:first-child {
    font-size: 2rem;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.46);

    &:hover {
      color: #31af9a;
    }
  }

  > h1:last-child {
    font-size: 2rem;
    color: #272727;
    text-transform: uppercase;
  }

  @media (max-width: ${mobileBreakpoint}) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;

    > h1:first-child {
      font-size: 1.2rem;
      position: absolute;
      align-self: center;
      top: 1rem;
      font-family: "proxima-nova", sans-serif;
      text-transform: uppercase;
      color: #000000a5;
    }

    > h1:last-child {
      font-size: 1.875rem;
      color: #272727;
      text-transform: capitalize;
      padding-top: 1.6rem;
      align-self: flex-start;
    }
  }
`;

export const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;

  @media (max-width: ${mobileBreakpoint}) {
    display: flex;
    gap: 1.3rem;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    margin-top: 1.3rem;
  }
`;

export const NewCategory = styled.li`
  min-height: 12rem;
  height: 100%;
  border: 1px solid #31af9a;
  position: relative;
  cursor: pointer;

  > span {
    margin-top: unset;
    margin-left: unset;
    color: #197572;
    padding: 0.2rem;

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

  @media (max-width: ${mobileBreakpoint}) {
    min-height: unset;
    height: unset;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    max-height: 3rem;
    border: 1px solid #197572;
    background-color: #fdfdfdd9;

    > span {
      color: #197572;

      &:first-child {
        font-size: 1.125rem;
        color: #197572;
      }

      &:last-child {
        display: none;
      }
    }
  }
`;
