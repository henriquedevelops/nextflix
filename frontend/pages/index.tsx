import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent as FC, useEffect, useState } from "react";

/* Server-side rendering */
export async function getServerSideProps(context: NextPageContext) {
  /* Extracting current session information from incoming request */
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home: FC = () => {
  const { data: session } = useSession();
  const nextRouter = useRouter();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    if (!session?.user) nextRouter.push("/auth");
  }, []);

  return (
    <>
      <Sidebar
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <Main setSidebarIsOpen={setSidebarIsOpen} />
    </>
  );
};

export default Home;
