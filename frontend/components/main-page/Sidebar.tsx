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
import AdminPanel from "../admin-panel/AdminPanel";

const Sidebar: FC<SidebarProps> = ({
  setSelectedGenre,
  selectedGenre,
  setMoviesRendered,
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

    setMoviesRendered([]);

    newGenre === "All movies"
      ? setSelectedGenre("")
      : setSelectedGenre(newGenre);
  };

  const handleSearchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoviesRendered([]);
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
            image="/images/Logo2.png"
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
              "My list",
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
              sx={{ ml: 1.8, mt: 0, width: "237px" }}
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
