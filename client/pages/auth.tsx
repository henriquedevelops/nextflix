import axios from "@/utils/axios";
import { User } from "@/utils/types";
import {
  passwordErrorToBoolean,
  usernameErrorToBoolean,
  validateCredentialsLength,
  validatePasswordsMatch,
} from "@/utils/validators";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useCallback, useEffect, useState } from "react";

export async function getServerSideProps(context: NextPageContext) {
  const { ["accessToken-Nextflix"]: accessToken } = parseCookies(context);

  if (accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { userIsLoggedIn: true } };
}

const Auth = () => {
  const [selectedForm, setSelectedForm] = useState("Sign in");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const nextRouter = useRouter();

  useEffect(() => {
    setError("");
    setLoading(false);
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
  }, [selectedForm]);

  const toggleSelectedForm = useCallback(() => {
    setSelectedForm((currentForm) =>
      currentForm === "Sign in" ? "Sign up" : "Sign in"
    );
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    if (!username) {
      setError(
        `Please enter ${selectedForm === "Sign in" ? "your" : "a"} username`
      );
      setLoading(false);
      return;
    }

    const credentialsLengthIsValid = validateCredentialsLength(
      username,
      password,
      selectedForm,
      setError,
      setLoading
    );
    if (!credentialsLengthIsValid) return;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    if (selectedForm === "Sign in") {
      try {
        await axios.post("/auth", {
          username,
          password,
        });
      } catch (error) {
        console.log(error, "Invalid credentials");
        setLoading(false);
        setError("Invalid credentials");
        return;
      }
    }

    if (selectedForm === "Sign up") {
      formData.append("password-confirm", passwordConfirm);

      const passwordsMatch = validatePasswordsMatch(
        password,
        passwordConfirm,
        setError,
        setLoading
      );
      if (!passwordsMatch) return;

      try {
        await axios.post("/users", {
          username,
          password,
        });

        await axios.post<User>("/auth", {
          username,
          password,
        });
      } catch (error: any) {
        if (error.response?.status === 409) {
          setError("Username unavailable");
          setLoading(false);
          return;
        }
        console.log(error);
        setError("Invalid credentials");
        setLoading(false);
        return;
      }
    }

    nextRouter.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          src="/images/Logo1.png"
          alt="Logo"
          sx={{
            marginTop: 6,
            marginBottom: 8,
            marginRight: "auto",
            marginLeft: "auto",
            width: "245px",
          }}
        />
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography component="h1" variant="h4" align="left" marginBottom={1}>
            {selectedForm === "Sign in"
              ? "Welcome back"
              : "Create your account"}
          </Typography>
          <TextField
            margin="dense"
            required
            fullWidth
            label="Username"
            name="username"
            size="small"
            type="username"
            helperText={
              (error === "Please enter your username" ||
                error === "Please enter a username" ||
                error === "Username must be at least 4 characters" ||
                error === "Username unavailable") &&
              error
            }
            error={usernameErrorToBoolean(error)}
            disabled={loading}
            value={username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            margin="dense"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            size="small"
            helperText={
              selectedForm === "Sign in" &&
              passwordErrorToBoolean(error) &&
              error
            }
            error={passwordErrorToBoolean(error)}
            disabled={loading}
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
          />
          {selectedForm === "Sign up" && (
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
              value={passwordConfirm}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPasswordConfirm(event.target.value);
              }}
            />
          )}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              mb: 1.5,
            }}
            color="secondary"
            loading={loading}
            onClick={handleSubmit}
          >
            {selectedForm}
          </LoadingButton>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography
              variant="body2"
              onClick={toggleSelectedForm}
              style={{
                cursor: "pointer",
              }}
            >
              {selectedForm === "Sign in"
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 12, mb: 4 }}
      >
        Copyright © Nextflix 2023
      </Typography>
    </Container>
  );
};

export default Auth;
