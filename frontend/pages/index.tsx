import Main from "@/components/main-page/Main";
import axios from "@/utils/axios";
import {
  LoggedUserContext,
  MessageAlertContext,
  MyListIdsContext,
} from "@/utils/contexts";
import { User } from "@/utils/types";
import { Alert, Snackbar, ThemeProvider, createTheme } from "@mui/material";
import jwtDecode from "jwt-decode";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { FunctionComponent as FC, useEffect, useState } from "react";

export async function getServerSideProps(context: NextPageContext) {
  const { ["accessToken-Nextflix"]: accessToken } = parseCookies(context);

  if (!accessToken) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const loggedUser: User = jwtDecode(accessToken);

  return { props: { loggedUser } };
}

const Home: FC<{ loggedUser: User }> = ({ loggedUser }) => {
  const [myListIds, setMyListIds] = useState<string[]>([]);
  const nextRouter = useRouter();
  const [messageAlert, setMessageAlert] = useState<string>("");
  const [messageAlertIsOpen, setMessageAlertIsOpen] = useState(false);

  useEffect(() => {
    if (!loggedUser) nextRouter.push("/auth");

    fetchMyListIds();
  }, []);

  useEffect(() => {
    messageAlert && setMessageAlertIsOpen(true);
  }, [messageAlert]);

  const fetchMyListIds = async () => {
    try {
      const response = await axios.get<{ moviesIdsFound: string[] }>(
        `/myList/id`
      );
      setMyListIds(response.data.moviesIdsFound);
    } catch (error) {
      setMessageAlert(
        "There was a connection error. Please check your internet connection, refresh the page and try again."
      );
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
