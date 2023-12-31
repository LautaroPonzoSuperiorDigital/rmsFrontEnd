import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const BottomNavBarContainer = styled.nav`
  height: 3.125rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  position: fixed;
  inset: 0;
  top: unset;
`

export const NavItemText = styled.span`
  font-size: 0.875rem;
  color: #272727;

  transition: color 200ms ease;
`

export const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  text-decoration: none;

  ${({ active }) => active && css`
    ${NavItemText} {
      color: #197572;
    }
  `};

  &:hover ${NavItemText} {
    color: #197572;
  }

  &:hover path {
    fill: #197572;
  }
`