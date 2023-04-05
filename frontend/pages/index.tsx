import Main from "@/components/Main";
import { LoggedUserContext } from "@/utils/loggedUserContext";
import { User } from "@/utils/types";
import jwtDecode from "jwt-decode";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { FunctionComponent as FC, useEffect } from "react";

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
  const nextRouter = useRouter();

  useEffect(() => {
    if (!loggedUser) nextRouter.push("/auth");
  }, []);

  return (
    <>
      <LoggedUserContext.Provider value={{ loggedUser }}>
        <Main />
      </LoggedUserContext.Provider>
    </>
  );
};

export default Home;
