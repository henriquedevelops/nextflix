import { GetServerSidePropsContext, NextPageContext } from "next";
import { FunctionComponent as FC } from "react";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";

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

  return (
    <>
      {session?.user ? (
        <h1 className="text2xl text-gray-200">Logadissimo</h1>
      ) : (
        <h1 className="text2xl text-gray-200">nao logado</h1>
      )}
    </>
  );
};

export default Home;
