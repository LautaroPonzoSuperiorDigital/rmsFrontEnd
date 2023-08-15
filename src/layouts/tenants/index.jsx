import { Outlet } from 'react-router-dom'

import { BottomNavbar } from './bottom-navbar'
import { TenanstHeader } from './header'

import { PageContent, TenantsLayoutWrapper } from "./styles"
import { TenantsLayoutContext, TenantsLayoutProvider } from './context'

export function TenantsLayout() {
  return (
    <TenantsLayoutProvider>
      <TenantsLayoutContext.Consumer>
        {({ navbarIsShown }) => (
          <TenantsLayoutWrapper>
            <TenanstHeader />

            <PageContent navbarIsShown={navbarIsShown}>
              <Outlet />
            </PageContent>

            <BottomNavbar />
          </TenantsLayoutWrapper>
        )}
      </TenantsLayoutContext.Consumer>
    </TenantsLayoutProvider>
  )
}