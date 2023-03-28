import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";
import { FunctionComponent as FC, useState } from "react";
import axios from "../pages/api/axios";

type RegisterFormProps = {
  toggleSelectedForm: () => void;
};

const RegisterForm: FC<RegisterFormProps> = ({ toggleSelectedForm }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    const passwordConfirm = data.get("password-confirm");

    if (!email || !isValidEmail(email.toString())) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prevState) => ({ ...prevState, email: "" }));
    }

    if (!password || !passwordConfirm || password !== passwordConfirm) {
      setErrors((prevState) => ({
        ...prevState,
        passwordConfirm: "Passwords don't match.",
      }));
    } else {
      setErrors((prevState) => ({ ...prevState, passwordConfirm: "" }));
    }

    try {
      await axios.post("/users", {
        email,
        password,
      });

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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
          helperText={errors.email}
          error={Boolean(errors.email)}
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
          error={Boolean(errors.passwordConfirm)}
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
          error={Boolean(errors.passwordConfirm)}
          helperText={errors.passwordConfirm}
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
