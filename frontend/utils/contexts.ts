import {
  AddRemoveToMyListContextType,
  LoggedUserContextType,
  MessageAlertContextType,
  MyListIdsContextType,
} from "@/utils/types";
import { createContext, useContext } from "react";

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

export const MessageAlertContext = createContext<MessageAlertContextType>(
  {} as MessageAlertContextType
);
export const useMessageAlert = () => useContext(MessageAlertContext);
