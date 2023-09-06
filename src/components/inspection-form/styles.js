import { styled } from "styled-components";

export const AddInspectionContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 3rem 10rem;

  > h1 {
    font-size: 2.25rem;
  }
`;

export const Form = styled.form`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SectoinListTitle = styled.div`
  > h1 {
    text-align: left;
    font-style: normal;
    font-weight: normal;
    font-size: 1.875rem;
    line-height: 37px;
    font-family: "Proxima Nova", sans-serif;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
  }
`;

export const SectionList = styled.div`
  > p {
    text-align: left;
    font-style: normal;
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.3rem;
    font-family: "Proxima Nova", sans-serif;
    letter-spacing: 0px;
    color: #000000a5;
    text-transform: uppercase;
    opacity: 1;

    > img {
      padding-left: 0.781rem;
      paddingBox: true,
      opacity: 1,
    }

    &:hover {
      color: #31af9a;
      cursor: pointer;
    }
  }
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover::before {
    content: ${(props) => `"${props.tooltipText}"`};
    position: absolute;
    background-color: #333;
    color: #fff;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    white-space: nowrap;
    z-index: 1;
    bottom: 30px; /* Adjust the distance from the icon */
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }
`;
