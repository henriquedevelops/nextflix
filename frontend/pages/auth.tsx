import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";

const Auth = () => {
  const [selectedForm, setSelectedForm] = useState("login");

  const toggleSelectedForm = useCallback(() => {
    setSelectedForm((current) => (current === "login" ? "register" : "login"));
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          className="w-64 h-64 mx-auto mt-1 mb-20"
          src="/images/Logo1.png"
          alt="Logo"
        />
        {selectedForm === "login" ? (
          <LoginForm toggleSelectedForm={toggleSelectedForm} />
        ) : (
          <RegisterForm toggleSelectedForm={toggleSelectedForm} />
        )}
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 8, mb: 4 }}
      >
        Copyright © Nextflix 2023
      </Typography>
    </Container>
  );
};

export default Auth;
