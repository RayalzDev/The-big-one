import { createContext, useState, useContext,useMemo } from "react";

const LogeadoContext = createContext({
  info: {},
  setInfo: () => {},
});

export default function LogeadoContextProvider({ children }) {
  const [info, setInfo] = useState( JSON.parse(localStorage.getItem("usuario")) ?? null);

  const value =useMemo(()=> ({
    info,
    setInfo,
  }),[info,setInfo])

  return (
    <LogeadoContext.Provider value={value}>{children}</LogeadoContext.Provider>
  );
}

export function useLogeadoContext() {
  return useContext(LogeadoContext);
}
