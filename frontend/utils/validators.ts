export const validateEmail = (
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

export const validateImage = (
  event: React.ChangeEvent<HTMLInputElement>,
  setImage: React.Dispatch<React.SetStateAction<File | null>>,
  setMessageAlert: (newMessage: string) => void
) => {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    if (file.size > 1024 * 1024 || file.type !== "image/jpeg") {
      setMessageAlert("Image must be jpeg format and 1 MB max");
      return;
    }
    setImage(file);
  }
};

export const validatePassword = (
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
