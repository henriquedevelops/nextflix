import axios from "@/utils/axios";
import { useLoggedUser } from "@/utils/contexts";
import { SidebarProps } from "@/utils/types";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Box,
  CardMedia,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { FunctionComponent as FC, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const Sidebar: FC<SidebarProps> = ({
  setSelectedGenre,
  selectedGenre,
  setMoviesRendered,
  searchTitle,
  setSearchTitle,
  setTotalAmountOfMovies,
  setAdminSelectedAction,
}) => {
  const { loggedUser } = useLoggedUser();
  const nextRouter = useRouter();

  const selectNewGenre = async (newGenre: string) => {
    if (newGenre === selectedGenre) return;

    setMoviesRendered([]);
    setTotalAmountOfMovies(1);
    setSelectedGenre(newGenre);
  };

  const handleSearchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoviesRendered([]);
    setSearchTitle(event.target.value);
  };

  const handleOpenCloseAdminModal = () => setAdminSelectedAction("Create");

  const handleSignOut = async () => {
    try {
      await axios.delete("/auth");
    } catch (err) {
      console.error(err);
    }

    nextRouter.push("/login");
  };

  return (
    <>
      <Box role="presentation">
        <CardMedia
          component="img"
          sx={{
            width: "240px",
            marginLeft: 1.8,
            marginTop: 1.8,
            marginBottom: 3,
            display: { xs: "none", sm: "block" },
          }}
          image="/images/Logo2.png"
        />

        <List sx={{ padding: 1 }}>
          {[
            "All movies",
            "Action",
            "Comedy",
            "Documentary",
            "Science-fiction",
            "Horror",
            "Drama",
            "My list",
          ].map((text, index) => (
            <ListItem sx={{ color: "#CFCFCF" }} key={text} disablePadding>
              <ListItemButton
                selected={
                  text === selectedGenre && selectedGenre !== "All movies"
                }
                onClick={() => selectNewGenre(text)}
                sx={{ borderRadius: 1 }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}

          <FormControl
            sx={{ ml: 1.8, width: "226px", marginBottom: 4 }}
            variant={"standard"}
          >
            <InputLabel>Search</InputLabel>
            <Input
              value={searchTitle}
              onChange={handleSearchTitle}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon color="primary" />
                </InputAdornment>
              }
            />
          </FormControl>
          {loggedUser.isAdmin && (
            <ListItem
              disablePadding
              sx={{
                color: "#CFCFCF",
              }}
            >
              <ListItemButton
                onClick={handleOpenCloseAdminModal}
                sx={{
                  borderRadius: 1,
                }}
              >
                <ListItemIcon>
                  <AddIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary={"Add new movie"} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: { xs: "auto", sm: "#060606" },
            zIndex: 1,
            padding: 1,
          }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={handleSignOut} sx={{ borderRadius: 1 }}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
