import axios from "@/utils/axios";
import { Movie, ResponseFromGetMovies } from "@/utils/types";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  CardMedia,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import { FunctionComponent as FC, useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import Sidebar from "./Sidebar";

const Main: FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [totalAmountOfMovies, setTotalAmountOfMovies] = useState(1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, searchTitle]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get<ResponseFromGetMovies>(
        `/movies?genre=${selectedGenre}&skip=${moviesList.length}&title=${searchTitle}`
      );
      const moviesFromResponse = response.data.moviesFound;
      const amountOfMoviesFound = response.data.amountOfMoviesFound;

      setMoviesList([...moviesList, ...moviesFromResponse]);
      setTotalAmountOfMovies(amountOfMoviesFound);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 270;

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
            image="/images/logo2.png"
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
            setMoviesList={setMoviesList}
            searchTitle={searchTitle}
            setSearchTitle={setSearchTitle}
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
            setMoviesList={setMoviesList}
            searchTitle={searchTitle}
            setSearchTitle={setSearchTitle}
          />
        </Drawer>
      </Box>

      <MoviesList
        moviesList={moviesList}
        drawerWidth={drawerWidth}
        totalAmountOfMovies={totalAmountOfMovies}
        fetchMovies={fetchMovies}
      />
    </Box>
  );
};

export default Main;
