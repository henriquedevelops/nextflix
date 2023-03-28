import { GetServerSidePropsContext } from "next";
import { FunctionComponent as FC } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

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
