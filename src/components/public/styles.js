import { styled } from "styled-components"

export const ListingPublic = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  padding: 10px 48px;
  gap: 40px;
  @media (max-width: 900px) {
    padding: 10px 20px;
    justify-content: center;
  }
`

export const ListingPublicContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`
export const NavButtonLogin = styled.div`
  width: 70px;
  height: 30px;
  position: absolute;
  top: 10px;
  left: 20px;
`

export const LoginBtnMobile = styled.button`
  width: 100%;
  height: 100%;
  background-color: #197572;
  color: white;
`
