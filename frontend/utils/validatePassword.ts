export default (
  password: string | undefined,
  passwordConfirm: string | undefined,
  setPasswordError: (message: string) => void,
  setLoading: (loading: boolean) => void
): boolean => {
  if (!password || !passwordConfirm || password !== passwordConfirm) {
    setPasswordError("Passwords don't match.");
    setLoading(false);
    return false;
  } else {
    if (password?.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      setLoading(false);
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  }
};
