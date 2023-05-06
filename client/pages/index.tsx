import Main from "@/components/Main";
import axios from "@/utils/axios";
import {
  LoggedUserContext,
  MessageAlertContext,
  MyListIdsContext,
} from "@/utils/contexts";
import { User } from "@/utils/types";
import { genericErrorAlert } from "@/utils/validators";
import { Alert, Snackbar, ThemeProvider, createTheme } from "@mui/material";
import jwtDecode from "jwt-decode";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { FunctionComponent as FC, useEffect, useState } from "react";

/* 
This page performs server side rendering logic to check if the user is logged in.
If he is it renders the "Main" component, otherwise it redirects him to the 
authentication page.

It is also responsible for a global message alert system and for passing context 
providers to the "Main" component and its children 
*/

export async function getServerSideProps(context: NextPageContext) {
  const { ["accessToken-Nextflix"]: accessToken } = parseCookies(context);

  if (!accessToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const loggedUser: User = jwtDecode(accessToken);

  return { props: { loggedUser } };
}

const Home: FC<{ loggedUser: User }> = ({ loggedUser }) => {
  const [myListIds, setMyListIds] = useState<number[]>([]);
  const [messageAlert, setMessageAlert] = useState<string>("");
  const [messageAlertIsOpen, setMessageAlertIsOpen] = useState(false);
  const nextRouter = useRouter();

  useEffect(() => {
    if (!loggedUser) nextRouter.push("/auth");

    fetchMyListIds();
  }, [loggedUser, nextRouter]);

  useEffect(() => {
    messageAlert && setMessageAlertIsOpen(true);
  }, [messageAlert]);

  const fetchMyListIds = async () => {
    try {
      const response = await axios.get<{ moviesIdsFound: number[] }>(
        `/myList/id`
      );

      if (response.status === 204) return;

      setMyListIds(response.data.moviesIdsFound);
    } catch (error) {
      setMessageAlert(genericErrorAlert);
      console.log(error);
    }
  };

  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <Snackbar
          open={messageAlertIsOpen}
          autoHideDuration={messageAlert.length * 100}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          onClose={() => setMessageAlertIsOpen(false)}
          TransitionProps={{ onExited: () => setMessageAlert("") }}
          sx={{ zIndex: 9999 }}
        >
          <Alert
            severity={messageAlert.includes("success") ? "success" : "error"}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {messageAlert}
          </Alert>
        </Snackbar>
      </ThemeProvider>

      <MessageAlertContext.Provider value={{ setMessageAlert }}>
        <MyListIdsContext.Provider value={{ myListIds, setMyListIds }}>
          <LoggedUserContext.Provider value={{ loggedUser }}>
            <Main />
          </LoggedUserContext.Provider>
        </MyListIdsContext.Provider>
      </MessageAlertContext.Provider>
    </>
  );
};

export default Home;
