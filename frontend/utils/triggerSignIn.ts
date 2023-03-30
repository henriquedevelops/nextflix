import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default async (
  email: string | undefined,
  password: string | undefined,
  setLoading: (loading: boolean) => void
) => {
  const responseFromSignIn = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (responseFromSignIn?.error) {
    setLoading(false);
    toast.error("Invalid email address or password");
    return;
  }

  setLoading(false);
};
