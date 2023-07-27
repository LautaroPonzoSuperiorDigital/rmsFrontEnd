import { ImageProvider } from "./context/imageContext";
import { AuthProvider } from "./context/authContext";
import AppRoutes from "./routes";

function App() {
  return (
    <AuthProvider>
      <ImageProvider>
        <AppRoutes />
      </ImageProvider>
    </AuthProvider>
  )
}

export default App;
