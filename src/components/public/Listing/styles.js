import { styled } from "styled-components";

export const PublicListing = styled.div`
  border: 1px solid rgba(128, 128, 128, 0.41);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  height: auto;
  width: 100%;

  max-width: 560px;
  max-height: 548px;

  @media (max-width: 1230px) {
    max-width: 400px;
    max-height: 800px;
  }
`;
