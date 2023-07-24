import { createContext, useState } from "react";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  // ------- User -----------
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
