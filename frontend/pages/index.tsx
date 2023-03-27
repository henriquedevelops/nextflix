import { GetServerSideProps } from "next";
import { FunctionComponent as FC } from "react";

interface DecodedToken {
  user: {
    id: string;
    email: string;
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
