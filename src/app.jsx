import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import ListingsAdmin from "./components/listingsAdmin";
import Applicants from "./components/applicants";
import Chats from "./components/chats";
import Documents from "./components/documents";
import SubAdmins from "./components/subAdmins";
import PublicListings from "./components/public/publicListings";
import ApplicationModal from "./components/public/ApplicationModal";
import TenantsAdmin from "./components/tenantsAdmin";
import Tenants from "./components/tenants";
import { ImageProvider } from "./context/imageContext";
import TenantsProfile from "./components/TenantsProfile";
import { AppProvider } from "./context/userContext";
import TenantChatRoom from "./components/TenantChatRoom";

function App() {
  return (
    <BrowserRouter>
      <ImageProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/listingsAdmin" element={<ListingsAdmin />} />
            <Route path="/tenantsAdmin" element={<TenantsAdmin />} />
            <Route path="/applicantsAdmin" element={<Applicants />} />
            <Route path="/chatsAdmin" element={<Chats />} />
            <Route path="/documentsAdmin" element={<Documents />} />
            <Route path="/subAdminsAdmin" element={<SubAdmins />} />
            <Route path="/" element={<PublicListings />} />
            <Route path="/application" element={<ApplicationModal />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route
              path="/tenants/tenant-profile"
              element={<TenantsProfile />}
            />
            <Route path="/tenants/tenant-chat" element={<TenantChatRoom />} />
            <Route
              path="/tenants/tenant-profile"
              element={<TenantsProfile />}
            />
          </Routes>
        </AppProvider>
      </ImageProvider>
    </BrowserRouter>
  );
}

export default App;
