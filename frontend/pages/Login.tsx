import InputField from "@/components/InputField";
import { FunctionComponent as FC } from "react";

const Login: FC = () => {
  return (
    <>
      <nav className="px-12 py-5">
        <img
          className="w-56 h-56 mx-auto mt-3 mb-8"
          src="/images/Logo1.png"
          alt="Logo"
        />
      </nav>
      <div className="flex justify-center">
        <div className="bg-neutral-200 px-8 py-8 self-center lg:w-2/5 lg:max-w-md rounded-md w-full ">
          <h2 className="text-neutral-800 text-2xl mb-font-semibold">
            Sign in
          </h2>
          <div className="flex flex-col gap-4">
            <InputField />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
