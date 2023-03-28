import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";
import { FunctionComponent as FC, useState } from "react";

type LoginFormProps = {
  toggleSelectedForm: () => void;
};

const LoginForm: FC<LoginFormProps> = ({ toggleSelectedForm }) => {
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

    if (!email || !isValidEmail(email.toString())) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prevState) => ({ ...prevState, email: "" }));
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setLoading(false);
      router.push("/");
    } catch (error: any) {
      console.error(error.message);
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
        Welcome back
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="dense"
          required
          fullWidth
          label="Email Address"
          name="email"
          size="small"
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
          name="password"
          size="small"
          disabled={loading}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
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
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Typography
              variant="body2"
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#87CEFA",
              }}
            >
              Forgot your password?
            </Typography>
          </Grid>
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
              Don't have an account? Sign Up
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginForm;
