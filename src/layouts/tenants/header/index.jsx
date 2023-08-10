import { Link, useLocation, useNavigate } from "react-router-dom"

import { useAuth } from "../../../hooks/useAuth"

import { HeaderGoBack, Profile } from "../../../components/icons/tenants"

import { GoBackButton, HeaderContainer, Title } from "./styles"

export function TenanstHeader() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const goBack = () => navigate(-1)

  const hideGoBackButton = user.isApplicant ? pathname === '/documents' : pathname === '/contact-us'

  const title = pathname
    .replace(/-/g, ' ')
    .replace(/\//g, ' ')
    .toUpperCase()

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

      <Title>{title}</Title>

      <Link to="/profile">
        <Profile />
      </Link>
    </HeaderContainer>
  )
}