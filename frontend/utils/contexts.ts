import { Dispatch, SetStateAction, createContext, useContext } from "react";
import {
  LoggedUserContextType,
  Movie,
  MyListIdsContextType,
  AddRemoveToMyListContextType,
} from "@/utils/types";

export const LoggedUserContext = createContext<LoggedUserContextType>(
  {} as LoggedUserContextType
);

export const useLoggedUser = () => useContext(LoggedUserContext);

export const MyListIdsContext = createContext<MyListIdsContextType>(
  {} as MyListIdsContextType
);

export const useMyListIds = () => useContext(MyListIdsContext);

export const AddRemoveToMyListContext =
  createContext<AddRemoveToMyListContextType>(
    {} as AddRemoveToMyListContextType
  );

export const useAddRemoveToMyList = () => useContext(AddRemoveToMyListContext);
