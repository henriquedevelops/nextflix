import { Container, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { FunctionComponent as FC } from "react";

type RegisterFormProps = {
  toggleSelectedForm: () => void;
};

const RegisterForm: FC<RegisterFormProps> = ({ toggleSelectedForm }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    const passwordConfirm = data.get("password-confirm");

    console.log(password === passwordConfirm);
  };

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        align="left"
        marginTop={4}
        marginBottom={1}
      >
        Register
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
        />
        <TextField
          margin="dense"
          required
          fullWidth
          label="Password"
          type="password"
          size="small"
          name="password"
        />
        <TextField
          margin="dense"
          required
          fullWidth
          label="Confirm password"
          type="password"
          size="small"
          name="password-confirm"
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
