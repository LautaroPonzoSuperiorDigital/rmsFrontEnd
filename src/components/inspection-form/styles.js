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
  }
`;
