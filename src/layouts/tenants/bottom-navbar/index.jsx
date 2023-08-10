import { useLocation } from "react-router-dom"
import { Chats, Documents, Payments } from "../../../components/icons/tenants"
import { BottomNavBarContainer, NavItem, NavItemText } from "./styles"

export function BottomNavbar() {
  const { pathname } = useLocation()

  console.log(pathname=== '/contact-us')

  return (
    <BottomNavBarContainer>
      <NavItem to="/contact-us" active={pathname === '/contact-us'}>
        <Chats filled={pathname === '/contact-us'} />
        <NavItemText>Contact Us</NavItemText>
      </NavItem>

      <NavItem to="/documents" active={pathname === '/documents'}>
        <Documents filled={pathname === '/documents'} />
        <NavItemText>Documents</NavItemText>
      </NavItem>

      <NavItem to="/payments" active={pathname === '/payments'}>
        <Payments filled={pathname === '/payments'} />
        <NavItemText>Payments</NavItemText>
      </NavItem>
    </BottomNavBarContainer>
  )
}