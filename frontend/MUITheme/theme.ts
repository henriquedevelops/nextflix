import { createTheme } from "@mui/material/";

export default createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ededed",
    },
    background: {
      default: "black",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "black",
        },
      },
    },
  },
});
