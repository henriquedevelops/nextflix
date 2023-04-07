import axios from "@/utils/axios";
import { useLoggedUser } from "@/utils/loggedUserContext";
import { SidebarProps } from "@/utils/types";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { FunctionComponent as FC, useState } from "react";
import AdminPanel from "../admin-panel/AdminPanel";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Container from "@mui/material/Container";

const Sidebar: FC<SidebarProps> = ({
  setSelectedGenre,
  selectedGenre,
  setMoviesList,
  searchTitle,
  setSearchTitle,
}) => {
  const { loggedUser } = useLoggedUser();
  const [adminModalIsOpen, setAdminModalIsOpen] = useState<boolean>(false);
  const nextRouter = useRouter();

  const selectNewGenre = async (newGenre: string) => {
    if (
      (newGenre === "All movies" && selectedGenre === "") ||
      newGenre === selectedGenre
    )
      return;

    setMoviesList([]);

    newGenre === "All movies"
      ? setSelectedGenre("")
      : setSelectedGenre(newGenre);
  };

  const handleSearchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoviesList([]);
    setSearchTitle(event.target.value);
  };

  const handleOpenCloseAdminModal = (): void =>
    setAdminModalIsOpen(!adminModalIsOpen);

  const handleSignOut = async () => {
    try {
      await axios.delete("/auth");
    } catch (err) {
      console.error(err);
    }

    nextRouter.push("/auth");
  };

  return (
    <>
      <Box>
        <Box role="presentation">
          <CardMedia
            component="img"
            sx={{
              width: "240px",
              marginLeft: 1.8,
              marginTop: 2,
              marginBottom: 3,
              display: { xs: "none", sm: "block" },
            }}
            image="/images/logo2.png"
          />

          <List>
            {[
              "All movies",
              "Action",
              "Comedy",
              "Documentary",
              "Science-fiction",
              "Horror",
              "Drama",
            ].map((text, index) => (
              <ListItem sx={{ color: "#CFCFCF" }} key={text} disablePadding>
                <ListItemButton
                  selected={text === selectedGenre}
                  onClick={() => selectNewGenre(text)}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            <FormControl
              sx={{ ml: 1.9, mt: 1, width: "235px" }}
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
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </List>
          <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
            <ListItem
              disablePadding
              sx={{
                display: loggedUser.isAdmin ? "block" : "none",
                color: "#CFCFCF",
              }}
            >
              <ListItemButton onClick={handleOpenCloseAdminModal}>
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admin panel" />
              </ListItemButton>
            </ListItem>

            <AdminPanel
              adminModalIsOpen={adminModalIsOpen}
              handleOpenCloseAdminModal={handleOpenCloseAdminModal}
            />
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
