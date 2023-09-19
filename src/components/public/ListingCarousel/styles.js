import { styled } from "styled-components";

export const BtnBackToSearch = styled.button`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  top: 10%;
  left: 5%;
  transform: translate(0, -50%);
  z-index: 10;
  cursor: pointer;
  color: red;
  height: 30px;
  wdith: 300px !important;
  color: #197572;
  padding: 0 10px;

  @media (max-width: 768px) {
    top: 10%;
  }
`;
export const ImgCarousel = styled.img`
  width: 100%;
  height: 100%;
  @media (max-width: 1230px) {
    max-width: 100%;
    max-height: 290px;
  }
`;

export const BtnGallery = styled.button`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  bottom: 10%;
  left: 30px;
  transform: translate(0, -50%);
  z-index: 10;
  cursor: pointer;
  color: red;
  height: 30px;
  wdith: 300px !important;
  color: #197572;
  padding: 0 10px;
  display: flex;
  @media (max-width: 1024px) {
    bottom: 50px;
  }
  @media (max-width: 768px) {
    bottom: 0%;
  }
`;
