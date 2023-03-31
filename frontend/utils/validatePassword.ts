export default (
  password: string | undefined,
  passwordConfirm: string | undefined,
  setError: (message: string) => void,
  setLoading: (loading: boolean) => void
): boolean => {
  if (!password || password?.length < 8) {
    setError("Password must be at least 8 characters");
    setLoading(false);
    return false;
  }

  if (!password || !passwordConfirm || password !== passwordConfirm) {
    setError("Passwords don't match");
    setLoading(false);
    return false;
  }

  setError("");
  return true;
};

export const passwordErrorToBoolean = (error: string): boolean => {
  return (
    error === "Passwords don't match" ||
    error === "Invalid credentials" ||
    error === "Password must be at least 8 characters"
  );
};
