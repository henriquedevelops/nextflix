import LoginForm from "@/components/auth-page/LoginForm";
import RegisterForm from "@/components/auth-page/RegisterForm";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { useCallback, useState } from "react";

/* 
This page displays a login or register form depending on the selected form state
and it also includes server-side logic for redirecting users who have a valid 
access token to the homepage.
*/

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
          src="/images/Logo1.png"
          alt="Logo"
          style={{
            marginTop: "4px",
            marginBottom: "80px",
            marginRight: "auto",
            marginLeft: "auto",
            height: "256px",
            width: "256px",
          }}
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
