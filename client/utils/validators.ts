export const validateCredentialsLength = (
  username: string | undefined,
  password: string | undefined,
  setError: (message: string) => void,
  setLoading: (loading: boolean) => void
): boolean => {
  if (!username || username?.length < 4) {
    setError("Username must be at least 4 characters");
    setLoading(false);
    return false;
  }

  if (!password || password?.length < 8) {
    setError("Password must be at least 8 characters");
    setLoading(false);
    return false;
  }

  setError("");
  return true;
};

export const validatePasswordsMatch = (
  password: string | undefined,
  passwordConfirm: string | undefined,
  setError: (message: string) => void,
  setLoading: (loading: boolean) => void
): boolean => {
  if (!password || !passwordConfirm || password !== passwordConfirm) {
    setError("Passwords don't match");
    setLoading(false);
    return false;
  }

  setError("");
  return true;
};

export const usernameErrorToBoolean = (error: string): boolean => {
  return (
    error === "Username must be at least 4 characters" ||
    error === "Username unavailable"
  );
};

export const passwordErrorToBoolean = (error: string): boolean => {
  return (
    error === "Passwords don't match" ||
    error === "Invalid credentials" ||
    error === "Password must be at least 8 characters"
  );
};

export const genericErrorAlert =
  "Something went wrong! Please check your internet connection";

export const validateAndCropImage = (
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

    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const aspectRatio = 3 / 4;
        let width = image.width;
        let height = image.height;

        if (width / height > aspectRatio) {
          width = height * aspectRatio;
        } else {
          height = width / aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;

        if (!context) return;
        context.drawImage(
          image,
          (image.width - width) / 2,
          (image.height - height) / 2,
          width,
          height,
          0,
          0,
          width,
          height
        );

        canvas.toBlob((blob) => {
          if (!blob) return;
          const croppedFile = new File([blob], file.name, {
            type: blob.type,
          });

          setImage(croppedFile);
        }, "image/jpeg");
      };

      image.src = event?.target?.result as string;
    };

    reader.readAsDataURL(file);
  }
};
