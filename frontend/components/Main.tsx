import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FunctionComponent as FC, useEffect, useState } from "react";
import axios from "@/utils/axios";
import { Movie } from "@/utils/types";
import Sidebar from "./Sidebar";
import CardMedia from "@mui/material/CardMedia";
import MoviesList from "./MoviesList";

const newMain: FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre]);

  const fetchMovies = async () => {
    try {
      const { data: moviesFromResponse } = await axios.get(
        `/movies?genre=${selectedGenre}`
      );

      setMoviesList(moviesFromResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 300;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        color="transparent"
        position="fixed"
        sx={{
          backgroundColor: "black",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: { sm: "none" } }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <CardMedia
            component="img"
            sx={{ width: "200px", marginTop: "1px" }}
            image="/images/logo3.png"
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Sidebar
            setSelectedGenre={setSelectedGenre}
            selectedGenre={selectedGenre}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
            },
          }}
          open
        >
          <Sidebar
            setSelectedGenre={setSelectedGenre}
            selectedGenre={selectedGenre}
          />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <MoviesList moviesList={moviesList} />
      </Box>
    </Box>
  );
};

export default newMain;
