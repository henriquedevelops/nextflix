import Main from "@/components/main-page/Main";
import axios from "@/utils/axios";
import { LoggedUserContext, MyListIdsContext } from "@/utils/contexts";
import { ResponseDataFromFetchMyListIds, User } from "@/utils/types";
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

  useEffect(() => {
    if (!loggedUser) nextRouter.push("/auth");

    fetchMyListIds();
  }, []);

  const fetchMyListIds = async () => {
    try {
      const response = await axios.get<{ moviesIdsFound: string[] }>(
        `/myList/id`
      );
      setMyListIds(response.data.moviesIdsFound);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MyListIdsContext.Provider value={{ myListIds, setMyListIds }}>
        <LoggedUserContext.Provider value={{ loggedUser }}>
          <Main />
        </LoggedUserContext.Provider>
      </MyListIdsContext.Provider>
    </>
  );
};

export default Home;
