import { FunctionComponent as FC } from "react";

const InputField: FC = () => {
  return (
    <div className="relative">
      <input
        id="email"
        className="
            block
            rounded-sm
            p-1
            px-3
            py-1
            mt-6
            mb-1
            w-full
            text-md
            text-neutral-800
            bg-neutral-200
            appearance-none
            "
        placeholder=" "
      ></input>
      <label
        className="
            absolute 
            text-md
            text-zinc-400
            "
        htmlFor="email"
      >
        eai suave
      </label>
    </div>
  );
};

export default InputField;
