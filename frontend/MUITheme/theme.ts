import { createTheme } from "@mui/material/";

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
});
