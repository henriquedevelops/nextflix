import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { FunctionComponent as FC, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import jwtDecode from "jwt-decode";
import { User } from "@/utils/types";
import { log } from "console";

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
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  console.log(loggedUser.isAdmin);

  useEffect(() => {
    if (!loggedUser) nextRouter.push("/auth");
  }, []);

  return (
    <>
      <Sidebar
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
        userIsAdmin={false}
      />
      <Main setSidebarIsOpen={setSidebarIsOpen} />
    </>
  );
};

export default Home;
