import axios from "@/utils/axios";
import { Movie, ResponseDataFromFetchMovies } from "@/utils/types";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  CardMedia,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import { FunctionComponent as FC, useEffect, useState } from "react";
import MoviesListContainer from "./MoviesListContainer";
import Sidebar from "./Sidebar";
import { AddRemoveToMyListContext, useMessageAlert } from "@/utils/contexts";
import { genericErrorAlert } from "@/utils/validators";

const Main: FC = () => {
  const [moviesRendered, setMoviesRendered] = useState<Movie[]>([]);
  const [totalAmountOfMovies, setTotalAmountOfMovies] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setMessageAlert } = useMessageAlert();

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, searchTitle]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get<ResponseDataFromFetchMovies>(
        `/${selectedGenre === "My list" ? "myList" : "movies"}?skip=${
          moviesRendered.length
        }&genre=${selectedGenre}&title=${searchTitle}`
      );

      if (response.status === 204) {
        setTotalAmountOfMovies(0);
        return;
      }

      const newSliceOfMovies = response.data.oneSliceOfMovies;
      const totalAmount = response.data.totalAmountOfMovies;

      setMoviesRendered([...moviesRendered, ...newSliceOfMovies]);
      setTotalAmountOfMovies(totalAmount);
    } catch (error) {
      setMessageAlert(genericErrorAlert);
      setTotalAmountOfMovies(0);
      console.error(error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 270;

  return (
    <AddRemoveToMyListContext.Provider
      value={{ setMoviesRendered, setTotalAmountOfMovies, selectedGenre }}
    >
      <Box sx={{ display: "flex" }}>
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
              image="/images/Logo2.png"
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
          totalAmountOfMovies={totalAmountOfMovies}
          fetchMovies={fetchMovies}
        />
      </Box>
    </AddRemoveToMyListContext.Provider>
  );
};

export default Main;
