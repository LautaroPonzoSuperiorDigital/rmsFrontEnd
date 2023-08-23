import { useLocation } from "react-router-dom"
import { Chats, Documents, Payments } from "../../../components/icons/tenants"
import { BottomNavBarContainer, NavItem, NavItemText } from "./styles"
import { useAuth } from "../../../hooks/useAuth"
import { useTenantsNavbar } from "../context"

export function BottomNavbar() {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const { navbarIsShown } = useTenantsNavbar()

  if (!user || !navbarIsShown || pathname === '/public-listings') {
    return null
  }

  return (
    <BottomNavBarContainer>
      {!user.isApplicant && (
        <NavItem to="/contact-us" active={pathname === '/contact-us' || pathname === '/chat'}>
          <Chats filled={pathname === '/contact-us' || pathname === '/chat'} />
          <NavItemText>Contact Us</NavItemText>
        </NavItem>
      )}

      <NavItem to="/documents" active={pathname === '/documents'}>
        <Documents filled={pathname === '/documents'} />
        <NavItemText>Documents</NavItemText>
      </NavItem>
      
      {!user.isApplicant && (
        <NavItem to="/payments" active={pathname === '/payments'}>
          <Payments filled={pathname === '/payments'} />
          <NavItemText>Payments</NavItemText>
        </NavItem>
      )}
    </BottomNavBarContainer>
  )
}