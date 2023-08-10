import { Outlet } from 'react-router-dom'

import { BottomNavbar } from './bottom-navbar'

import { TenantsLayoutWrapper } from "./styles"
import { TenanstHeader } from './header'

export function TenantsLayout() {
  return (
    <TenantsLayoutWrapper>
      <TenanstHeader />
      
      <Outlet />

      <BottomNavbar />
    </TenantsLayoutWrapper>
  )
}