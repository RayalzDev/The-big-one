import { createContext, useState, useContext } from "react";

const LogeadoContext = createContext({
  info: {},
  setInfo: () => {},
});

export default function LogeadoContextProvider({ children }) {
  const [info, setInfo] = useState({});

  const value = {
    info,
    setInfo,
  };

  return (
    <LogeadoContext.Provider value={value}>{children}</LogeadoContext.Provider>
  );
}

export function useLogeadoContext() {
  return useContext(LogeadoContext);
}
