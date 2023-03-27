import { FunctionComponent as FC } from "react";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
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
  return (
    <>
      <h1 className="text2xl text-gray-200">NEXTFLIX</h1>
    </>
  );
};

export default Home;
