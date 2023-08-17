import { Outlet } from "react-router-dom";

import { BottomNavbar } from "./bottom-navbar";
import { TenanstHeader } from "./header";

import { PageContent, TenantsLayoutWrapper } from "./styles";
import { TenantsLayoutContext, TenantsLayoutProvider } from "./context";

const applicantsLayoutDesktop = () => {
  return (
    <TenantsLayoutProvider>
      <TenantsLayoutContext.Consumer>
        {({ navbarIsShown }) => (
          <TenantsLayoutWrapper>
            <TenanstHeader />
            <Outlet />
          </TenantsLayoutWrapper>
        )}
      </TenantsLayoutContext.Consumer>
    </TenantsLayoutProvider>
  );
};

export function TenantsLayout() {
  const windowWidth = window.innerWidth;

  if (windowWidth > 900) {
    return applicantsLayoutDesktop();
  }

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
  );
}
