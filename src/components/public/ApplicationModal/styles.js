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
    padding: 0 10px;
    gap: 2rem;
  }
`;
export const LogoImg = styled.img`
  height: 100%;
  width: 100%;
  @media screen and (max-width: 768px) {
    width: 100px;
  }
`;
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
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
        font-size: 10px;
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
  height: 100%;
  width: 100%;
  max-width: 420px;
  padding: 20px 47px;
  // border-right: 1px solid rgba(128, 128, 128, 0.533);
  @media (max-width: 768px) {
    flex-direction: row;
    padding: 9px;
    height: 85px;
  }
`;

export const ImgSideBar = styled.img`
margin: 0 !important;,
  width: 100%;
  height: 100%;
  max-width: 314px;
    max-height: 314px;
    object-fit: cover;
    
    @media (max-width: 768px) {
      width: 94px;
      height: 67px;
    }
  
`;

export const SideBarDescription = styled.div`
  display: flex;

  justify-content: space-between;
`;
export const SideBarDescriptionPrice = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 314px;
  @media (max-width: 768px) {
    display: flex;
  }
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
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
export const FieldValue = styled(Text)`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
  line-height: 0rem;
  overflow-wrap: break-word;
  @media (max-width: 768px) {
    font-size: 16px;
  }
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
export const Ulcontainers = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  gap: 60px;
  margin-left: 20px;
`;

export const Ul = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0px;
`;

export const Li = styled.li`
  font-size: 20px;
  color: #000000;
  font-weight: 600;
`;
