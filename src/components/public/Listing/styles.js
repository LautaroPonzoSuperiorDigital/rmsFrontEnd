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
    border: none;
    box-shadow: none;
  }
`;

export const ListingPublicDescription = styled.div`
  display: flex;
  flex-direction: column;
  height: 10rem;
  justify-content: space-around;

  @media (max-width: 1230px) {
    max-width: 400px;
    max-height: 800px;
    display: block;
    justify-content: center;
    gap: 10px;
    height: auto;
  }
`;

export const ListingPublicImg = styled.img`
  width: 100%;
  height: 24rem;
  object-fit: cover;
  margin-bottom: 10px;
  @media (max-width: 1230px) {
    max-width: 400px;
    max-height: 250px;
    border: none;
    box-shadow: none;
    margin-bottom: 10px;
  }
`;

export const ListingPriceLocation = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  padding: 0 1rem;

  @media (max-width: 1230px) {
    padding: 0 0rem;
  }
`;

export const Text = styled.div`
  display: inline;
  margin: 0;
  padding: 0;
`;

export const PriceText = styled(Text)`
  font-size: 25px;
  font-weight: 500;
  @media (min-width: 1230px) {
    font-size: 35px;
  }
`;

export const SpanPrince = styled.span`
  font-size: 14px;
  font-weight: 400;
  @media (min-width: 1230px) {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const LocationText = styled(Text)`
  font-size: 18px;
  font-weight: 400;
`;

export const FieldName = styled(Text)`
  font-size: 15px;
  font-weight: 400;
  @media (min-width: 1230px) {
    font-size: 18px;
  }
`;

export const FieldValue = styled.span`
  font-size: 15px;
  font-weight: 600;
  @media (min-width: 1230px) {
    font-size: 18px;
  }
`;

export const LotValue = styled(Text)`
  font-size: 15px;
  font-weight: 600;
`;
