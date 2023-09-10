import styled from "styled-components";

export const NavContainer = styled.div`
  border-bottom: 1px solid rgba(128, 128, 128, 0.533);
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  @media screen and (max-width: 768px) {
    padding: 0 1rem;
    gap: 2rem;
  }
`;

export const NavText = styled.p`
  margin: 0;
  font-size: 25px;
  font-weight: 600;
  color: #272727;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

export const GoBackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const GoBackStyle = styled.div`
    margin: 0,
    font-size: "100px"
    cursor: "pointer",
    @media screen and (max-width: 768px) {
        font-size: 5px;
      }
  ;`;

export const ApplicationContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SideBarDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 500px;
  padding: 10px 47px;
  border-right: 1px solid rgba(128, 128, 128, 0.533);
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

export const ImgSideBar = styled.img`
margin: 0 !important;,
  width: 100%;
  height: 100%;
  
`;

export const SideBarDescription = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Text = styled.p`
  margin: 0;
  padding: 0;
`;

export const FieldText = styled(Text)`
  color: #000000a5;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5rem;
`;
export const FieldValue = styled(Text)`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
  line-height: 0rem;
`;
export const PriceText = styled(Text)`
    margin: 0;
    padding: 0;
  color: #272727;
  font-size: 25px
  font-weight: 600;
`;

export const AmenitiesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0px;
`;
