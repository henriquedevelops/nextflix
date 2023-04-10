import { createContext, useContext } from "react";
import { LoggedUserContextType, MyListIdsContextType } from "@/utils/types";

export const LoggedUserContext = createContext<LoggedUserContextType>(
  {} as LoggedUserContextType
);

export const useLoggedUser = () => useContext(LoggedUserContext);

export const MyListIdsContext = createContext<MyListIdsContextType>(
  {} as MyListIdsContextType
);

export const useMyListIds = () => useContext(MyListIdsContext);
