import {
  useContext,
  createContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const LogeadoContext = createContext({
  login: () => {},
  logout: () => {},
  isLogeado: false,
});
