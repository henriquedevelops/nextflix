import { FunctionComponent as FC } from "react";

const Login: FC = () => {
  return (
    <>
      <div className="flex justify-center">
        <div
          className="px-16 py-16 self-center mt-2
                    lg:w-2/5 lg:max-w-md rounded-md w-full"
        >
          <h2
            className="
          text-white 
          text-4xl 
          mb-8 
          font-semibold
          "
          >
            Sign in
          </h2>
        </div>
      </div>
    </>
  );
};

export default Login;
