import axios from "@/utils/axios";
import { Movie, ResponseDataFromFetchMovies } from "@/utils/types";
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
import MoviesListContainer from "./MoviesListContainer";
import Sidebar from "./Sidebar";

const Main: FC = () => {
  const [moviesRendered, setMoviesRendered] = useState<Movie[]>([]);
  const [totalAmountOfMoviesFoundInDb, setTotalAmountOfMoviesFoundInDb] =
    useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, searchTitle]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get<ResponseDataFromFetchMovies>(
        selectedGenre === "My list"
          ? `/myList?skip=${moviesRendered.length}&title=${searchTitle}`
          : `/movies?genre=${selectedGenre}&skip=${moviesRendered.length}&title=${searchTitle}`
      );

      const moviesFromResponse = response.data.moviesFound;
      const amountOfMoviesFound = response.data.amountOfMoviesFound;

      setMoviesRendered([...moviesRendered, ...moviesFromResponse]);
      setTotalAmountOfMoviesFoundInDb(amountOfMoviesFound);
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
            setMoviesRendered={setMoviesRendered}
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
            setMoviesRendered={setMoviesRendered}
            searchTitle={searchTitle}
            setSearchTitle={setSearchTitle}
          />
        </Drawer>
      </Box>

      <MoviesListContainer
        moviesRendered={moviesRendered}
        drawerWidth={drawerWidth}
        totalAmountOfMoviesFoundInDb={totalAmountOfMoviesFoundInDb}
        fetchMovies={fetchMovies}
      />
    </Box>
  );
};

export default Main;
