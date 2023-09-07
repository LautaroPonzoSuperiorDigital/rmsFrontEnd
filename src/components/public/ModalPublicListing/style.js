import { styled } from "styled-components";

export const ModalListingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100vw;
  }
`;

export const ModalListingDescription = styled.div`
  background-color: white;
  width: 100%;
  max-width: 670px;
  height: 100%;
  padding: 20px 48px;
  @media (max-width: 768px) {
    padding: 0px 10px;
  }
`;
export const DescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  @media (max-width: 768px) {
    margin-top: 0rem;
  }
`;
export const SpectDescriptioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const Text = styled.div`
  display: inline;
  margin: 0;
  padding: 0;
`;

export const PriceText = styled(Text)`
  font-size: 45px;
  font-weight: 600;
`;
export const PriceSpan = styled.span`
  font-size: 25px;
  font-weight: 400;
`;

export const FieldName = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
  color: #000000a5;
  margin-top: 1rem;
`;

export const FieldValue = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #131313;
`;

export const FieldValueLi = styled.li`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #131313;
`;
