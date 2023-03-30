export default (
  email: string | undefined,
  setEmailError: (message: string) => void,
  setLoading: (loading: boolean) => void
): boolean => {
  const isValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValid) {
    setEmailError("Please enter a valid email address.");
    setLoading(false);
    return false;
  } else {
    setEmailError("");
    return true;
  }
};
