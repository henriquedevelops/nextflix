export default (
  email: string | undefined,
  setError: (message: string) => void,
  setLoading: (loading: boolean) => void
): boolean => {
  const isValid =
    email && /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

  if (!isValid) {
    setError("Invalid email address");
    setLoading(false);
    return false;
  } else {
    setError("");
    return true;
  }
};

export const emailErrorToBoolean = (error: string): boolean => {
  return (
    error === "Invalid email address" || error === "Email address unavailable"
  );
};
