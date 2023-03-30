import triggerSignIn from "@/utils/triggerSignIn";
import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";
import { FunctionComponent as FC, useState } from "react";
import toast from "react-hot-toast";
import axios from "../pages/api/axios";

type RegisterFormProps = {
  toggleSelectedForm: () => void;
};

const RegisterForm: FC<RegisterFormProps> = ({ toggleSelectedForm }) => {
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    const passwordConfirm = data.get("password-confirm")?.toString();

    const emailIsValid = validateEmail(email, setEmailError, setLoading);
    const passwordIsValid = validatePassword(
      password,
      passwordConfirm,
      setPasswordError,
      setLoading
    );

    if (!emailIsValid || !passwordIsValid) return;

    const responseFromPostRequest = await axios.post("/users", {
      email,
      password,
    });

    if (!responseFromPostRequest?.data) {
      setLoading(false);
      toast.error("Invalid email or password");
      return;
    }

    await triggerSignIn(email, password, setLoading);

    router.push("/");
  };

  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        align="left"
        marginTop={4}
        marginBottom={1}
      >
        Create your account
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="dense"
          required
          fullWidth
          label="Email Address"
          size="small"
          name="email"
          type="email"
          helperText={emailError}
          error={Boolean(emailError)}
          disabled={loading}
        />
        <TextField
          margin="dense"
          required
          fullWidth
          label="Password"
          type="password"
          size="small"
          name="password"
          error={Boolean(passwordError)}
          disabled={loading}
        />
        <TextField
          margin="dense"
          required
          fullWidth
          label="Confirm password"
          type="password"
          size="small"
          name="password-confirm"
          error={Boolean(passwordError)}
          helperText={passwordError}
          disabled={loading}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ backgroundColor: "red" }}
          sx={{
            mt: 3,
            mb: 2,
            color: "#ffffff",
          }}
        >
          SIGN UP
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography
              variant="body2"
              onClick={toggleSelectedForm}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#87CEFA",
              }}
            >
              Already have an account? Sign in
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RegisterForm;
