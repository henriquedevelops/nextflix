import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default async (
  email: string | undefined,
  password: string | undefined,
  setError: (message: string) => void,
  setLoading: (loading: boolean) => void
): Promise<void> => {
  console.log("EAAAAAAAAAAAAAAAAAAAAAI");

  const responseFromSignIn = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  console.log(responseFromSignIn);
  console.log("EAAAAAAAAAAAAAAAAAAAAAI");
  if (responseFromSignIn?.error) {
    setLoading(false);
    setError("Invalid credentials");
    return;
  }

  setLoading(false);
  setError("");
  return;
};
