import { useState } from "react";

import { createContext, useContext } from "react";

const ContextStore = createContext();

function Store({ children }) {
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(null);
  return (
    <ContextStore.Provider
      value={{
        search,
        setSearch,
        alert,
        setAlert,
      }}
    >
      {children}
    </ContextStore.Provider>
  );
}

export const useContextStore = () => {
  return useContext(ContextStore);
};

export default Store;
