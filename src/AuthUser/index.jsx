import { useEffect } from "react";
import { useContext, createContext, useState } from "react";
const ContextAuthUser = createContext();

function AuthUser({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("login", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const user = sessionStorage.getItem("login");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  return (
    <ContextAuthUser.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </ContextAuthUser.Provider>
  );
}

export const UseAuthUserContext = () => {
  return useContext(ContextAuthUser);
};

export default AuthUser;
