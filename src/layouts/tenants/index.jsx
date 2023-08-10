import { Outlet } from 'react-router-dom'

import { BottomNavbar } from './bottom-navbar'

import { PageContent, TenantsLayoutWrapper } from "./styles"
import { TenanstHeader } from './header'

export function TenantsLayout() {
  return (
    <TenantsLayoutWrapper>
      <TenanstHeader />
      
      <PageContent>
        <Outlet />
      </PageContent>

      <BottomNavbar />
    </TenantsLayoutWrapper>
  )
}