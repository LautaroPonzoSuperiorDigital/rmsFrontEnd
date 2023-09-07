import { styled } from "styled-components";

export const ListingPublic = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  padding: 10px 48px;
  gap: 40px;
  @media (max-width: 900px) {
    padding: 10px 20px;
  }
`;

export const ListingPublicContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;
