import { FunctionComponent as FC } from "react";

const InputField: FC = () => {
  return (
    <div className="relative">
      <input
        id="email"
        className="
            block
            rounded-md
            px-3
            pt-6
            pb-1
            w-full
            text-md
            text-neutral-800
            bg-neutral-200
            border-solid
            border-
            appearance-none
            focus:outline-none
            focus:ring-0
            peer
            invalid:border-b-1
            "
        placeholder=" "
      ></input>
      <label
        className="            
            absolute 
            text-md
            text-zinc-400
            duration-150 
            transform 
            -translate-y-3 
            scale-75 
            top-4 
            z-10 
            origin-[0] 
            left-6
            peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75
            peer-focus:-translate-y-3
            "
        htmlFor="email"
      >
        eai suave
      </label>
    </div>
  );
};

export default InputField;
