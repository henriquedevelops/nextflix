import axios from "@/utils/axios";
import { LoginFormProps } from "@/utils/types";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { FunctionComponent as FC, useState } from "react";

const LoginForm: FC<LoginFormProps> = ({ toggleSelectedForm }) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const nextRouter = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if (!username) {
      setError("Please enter you username");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Please enter you password");
      setLoading(false);
      return;
    }

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
        Welcome back
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
          helperText={error === "Please enter you username" && error}
          error={
            error === "Please enter you username" ||
            error === "Invalid credentials"
          }
          disabled={loading}
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
            (error === "Invalid credentials" ||
              error === "Please enter you password") &&
            error
          }
          error={
            error === "Invalid credentials" ||
            error === "Please enter you password"
          }
          disabled={loading}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
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
          Sign In
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
              Don't have an account? Sign Up
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginForm;
