import { createTheme } from "@mui/material/";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

export default createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#CFCFCF",
    },
    secondary: {
      main: "#202020",
    },
    background: {
      default: "black",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: { paper: { backgroundColor: "black" } },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1800,
    },
  },
});
