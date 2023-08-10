import { Link, useLocation, useNavigate } from "react-router-dom"

import { HeaderGoBack, Profile } from "../../../components/icons/tenants"

import { GoBackButton, HeaderContainer, Title } from "./styles"

export function TenanstHeader() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  const hideGoBackButton = pathname === '/contact-us'

  return (
    <HeaderContainer>
      <GoBackButton
        type="button"
        onClick={goBack}
        hide={hideGoBackButton}
        disabled={hideGoBackButton}
      >
        <HeaderGoBack />
      </GoBackButton>

      <Title>Contact Us</Title>

      <Link to="/profile">
        <Profile />
      </Link>
    </HeaderContainer>
  )
}