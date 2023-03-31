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
import { signOut } from "next-auth/react";
import { FunctionComponent as FC, useState } from "react";
import AdminPanel from "./AdminPanel";

interface Props {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (value: boolean) => void;
  userIsAdmin: boolean;
}

const Sidebar: FC<Props> = ({
  sidebarIsOpen,
  setSidebarIsOpen,
  userIsAdmin,
}) => {
  const [adminModalIsOpen, setAdminModalIsOpen] = useState<boolean>(false);
  const handleOpenCloseAdminModal = (): void =>
    setAdminModalIsOpen(!adminModalIsOpen);

  return (
    <>
      <Drawer
        anchor="left"
        open={sidebarIsOpen}
        onClose={() => setSidebarIsOpen(false)}
        variant="temporary"
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
            <ListItem
              disablePadding
              sx={{ display: userIsAdmin ? "block" : "none" }}
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
              <ListItemButton onClick={() => signOut()}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
