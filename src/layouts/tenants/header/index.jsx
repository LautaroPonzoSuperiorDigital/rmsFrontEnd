import { Link, useLocation, useNavigate } from "react-router-dom"

import { useAuth } from "../../../hooks/useAuth"

import { HeaderGoBack, Profile } from "../../../components/icons/tenants"

import { GoBackButton, HeaderContainer, Title } from "./styles"
import { useTenantsHeader } from "../context"

export function TenanstHeader() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user } = useAuth()
  const { headerTitle } = useTenantsHeader()

  const goBack = () => navigate(-1)

  const hideGoBackButton = user.isApplicant ? pathname === '/documents' : pathname === '/contact-us'

  const title = headerTitle || pathname
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