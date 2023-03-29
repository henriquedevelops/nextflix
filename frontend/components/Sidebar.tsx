import Drawer from "@mui/material/Drawer";
import { FunctionComponent as FC } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";

interface Props {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (value: boolean) => void;
}

const Sidebar: FC<Props> = ({ sidebarIsOpen, setSidebarIsOpen }) => {
  return (
    <>
      <Drawer
        anchor="left"
        open={sidebarIsOpen}
        onClose={() => setSidebarIsOpen(false)}
        variant="temporary"
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          /*  onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)} */
        >
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ bottom: 0 }}>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box>
            <ListItem disablePadding sx={{ position: "absolute", bottom: 0 }}>
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