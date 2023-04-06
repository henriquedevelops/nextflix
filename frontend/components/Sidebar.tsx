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

interface Props {
  setSidebarIsOpen: (value: boolean) => void;
  sidebarIsOpen: boolean;
  setSelectedGenre: (value: string) => void;
  selectedGenre: string | null;
}

const Sidebar: FC<Props> = ({
  sidebarIsOpen,
  setSidebarIsOpen,
  setSelectedGenre,
  selectedGenre,
}) => {
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
      <Drawer
        anchor="left"
        open={sidebarIsOpen}
        onClose={() => setSidebarIsOpen(false)}
        variant="temporary"
        PaperProps={{
          sx: {
            backgroundColor: "black",
          },
        }}
      >
        <Box>
          <Box sx={{ width: 275 }} role="presentation">
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
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => selectNewGenre(text)}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
              <ListItem
                disablePadding
                sx={{ display: loggedUser.isAdmin ? "block" : "none" }}
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
      </Drawer>
    </>
  );
};

export default Sidebar;
