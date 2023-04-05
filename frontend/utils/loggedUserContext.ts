import { createContext, useContext } from "react";
import { LoggedUserContextType } from "@/utils/types";

export const LoggedUserContext = createContext<LoggedUserContextType>(
  {} as LoggedUserContextType
);

export const useLoggedUser = () => useContext(LoggedUserContext);
