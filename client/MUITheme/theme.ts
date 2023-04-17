import { createTheme } from "@mui/material/";
import { red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxl: true;
  }
}

export default createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#D5D5D5",
    },
    secondary: {
      main: red.A700,
      light: red[500],
    },
    background: {
      default: "#060606",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: { paper: { backgroundColor: "#060606" } },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.80)", // Change the value here to the desired color
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#040404",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#040404",
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1885,
    },
  },
});
