import { RegisterFormProps, User } from "@/utils/types";
import {
  emailErrorToBoolean,
  passwordErrorToBoolean,
  validateEmail,
  validatePassword,
} from "@/utils/validators";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { FunctionComponent as FC, useState } from "react";
import axios from "../../utils/axios";

const RegisterForm: FC<RegisterFormProps> = ({ toggleSelectedForm }) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const nextRouter = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    const passwordConfirm = data.get("password-confirm")?.toString();

    const emailIsValid = validateEmail(email, setError, setLoading);
    if (!emailIsValid) return;

    const passwordIsValid = validatePassword(
      password,
      passwordConfirm,
      setError,
      setLoading
    );
    if (!passwordIsValid) return;

    try {
      await axios.post("/users", {
        email,
        password,
      });

      await axios.post<User>("/auth", {
        email,
        password,
      });
    } catch (error: any) {
      if (error.response?.data?.statusCode === 409) {
        setError("Email address unavailable");
        setLoading(false);
        return;
      }
      console.log(error);
      setError("Invalid credentials");
      setLoading(false);
      return;
    }

    nextRouter.push("/");
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
          helperText={emailErrorToBoolean(error) && error}
          error={emailErrorToBoolean(error) || error === "Invalid credentials"}
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
          error={passwordErrorToBoolean(error)}
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
          error={passwordErrorToBoolean(error)}
          helperText={passwordErrorToBoolean(error) && error}
          disabled={loading}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
          }}
          color="secondary"
          loading={loading}
        >
          SIGN UP
        </LoadingButton>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography
              variant="body2"
              onClick={toggleSelectedForm}
              style={{
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
