import { styled } from "styled-components";

export const BtnBackToSearch = styled.button`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  top: 25%;
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

export const BtnGallery = styled.button`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  bottom: 25%;
  left: 30px;
  transform: translate(0, -50%);
  z-index: 10;
  cursor: pointer;
  color: red;
  height: 30px;
  wdith: 300px !important;
  color: #197572;
  padding: 0 10px;
  @media (max-width: 1024px) {
    bottom: 50px;
  }
  @media (max-width: 768px) {
    bottom: 0%;
  }
`;
