import axios from "@/utils/axios";
import { User } from "@/utils/types";
import {
  passwordErrorToBoolean,
  usernameErrorToBoolean,
  usernameHelperTextToBoolean,
  validateCredentialsLength,
  validatePasswordsMatch,
} from "@/utils/validators";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [helperText, setHelperText] = useState("");
  const [loading, setLoading] = useState(false);
  const nextRouter = useRouter();

  useEffect(() => resetStates(), [selectedForm]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!username) {
      setHelperText(
        `Please enter ${selectedForm === "Sign in" ? "your" : "a"} username`
      );
      setLoading(false);
      return;
    }

    const credentialsLengthIsValid = validateCredentialsLength(
      username,
      password,
      selectedForm,
      setHelperText,
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
        setHelperText("Invalid credentials");
        return;
      }
    }

    if (selectedForm === "Sign up") {
      formData.append("password-confirm", passwordConfirm);

      const passwordsMatch = validatePasswordsMatch(
        password,
        passwordConfirm,
        setHelperText,
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
          setHelperText("Username unavailable");
        } else {
          console.log(error);
          setHelperText("Invalid credentials");
        }

        setLoading(false);
        return;
      }
    }

    nextRouter.push("/");
  };

  const resetStates = () => {
    setHelperText("");
    setLoading(false);
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
        <Typography component="h1" variant="h4" alignSelf="flex-start">
          {selectedForm === "Sign in" ? "Welcome back" : "Create your account"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="dense"
            required
            fullWidth
            label="Username"
            name="username"
            size="small"
            type="username"
            helperText={usernameHelperTextToBoolean(helperText) && helperText}
            error={usernameErrorToBoolean(helperText)}
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
              passwordErrorToBoolean(helperText) &&
              helperText
            }
            error={passwordErrorToBoolean(helperText)}
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
              error={passwordErrorToBoolean(helperText)}
              helperText={passwordErrorToBoolean(helperText) && helperText}
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
              my: 1,
            }}
            color="secondary"
            loading={loading}
          >
            {selectedForm}
          </LoadingButton>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography
              variant="body2"
              onClick={() =>
                setSelectedForm((currentForm) =>
                  currentForm === "Sign in" ? "Sign up" : "Sign in"
                )
              }
              style={{
                cursor: "pointer",
              }}
              color={"primary"}
            >
              {selectedForm === "Sign in"
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Typography>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 12, mb: 1 }}
        >
          Henrique Buzon, 2023
        </Typography>
        <Stack direction={"row"}>
          <IconButton
            disableRipple
            onClick={() => window.open("https://github.com/henriquebuzon")}
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
          <IconButton
            disableRipple
            onClick={() =>
              window.open("https://www.linkedin.com/in/henriquebuzon/")
            }
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default Auth;
