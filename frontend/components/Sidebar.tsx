import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FunctionComponent as FC, useState } from "react";
import AdminPanel from "./AdminPanel";
import { useRouter } from "next/router";
import axios from "@/utils/axios";
import { useLoggedUser } from "@/utils/loggedUserContext";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface Props {
  setSelectedGenre: (value: string) => void;
  selectedGenre: string | null;
}

const Sidebar: FC<Props> = ({ setSelectedGenre, selectedGenre }) => {
  const { loggedUser } = useLoggedUser();
  const [adminModalIsOpen, setAdminModalIsOpen] = useState<boolean>(false);
  const nextRouter = useRouter();

  const selectNewGenre = (newGenre: string) => {
    newGenre === "All movies"
      ? setSelectedGenre("")
      : setSelectedGenre(newGenre);
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
              width: "233px",
              margin: "18px",
              display: { xs: "none", sm: "block" },
            }}
            image="/images/logo3.png"
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
                  sx={{ paddingLeft: 2.4 }}
                  selected={text === selectedGenre}
                  onClick={() => selectNewGenre(text)}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
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
              setAdminModalIsOpen={setAdminModalIsOpen}
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
