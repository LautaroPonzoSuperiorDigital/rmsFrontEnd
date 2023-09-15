import { styled } from "styled-components";

export const ModalListingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    overflow-y: scroll;
  }
`;

export const ModalListingDescription = styled.div`
  background-color: white;
  width: 100%;
  max-width: 670px;
  height: 100%;
  padding: 20px 48px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 0px 10px;
  }
`;
export const DescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

export const BlackOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AmenitiesContainer = styled.div`
  display: flex;
  gap: 150px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0px;
  }
`;

export const BtnApply = styled.button`
  background-color: #197572;
  color: white;
  border: none;
  padding: 10px 20px;
  width: 100%;
  max-width: 580px;
  margin-top: auto;
`;

export const FieldContainer = styled.div`
  @media (max-width: 768px) {
    display: ${(props) => (props.amenities ? "" : "flex")}
    justify-content: space-between;
    align-items: ${(props) => (props.location ? "flex-start" : "center")}
    flex-direction: ${(props) => (props.location ? "column" : "row")};
    padding: 0px 10px;
    margin-bottom: ${(props) => (props.location ? "1rem" : "0px")};
    & > p {
      margin: 0;
    }
  }
`;
