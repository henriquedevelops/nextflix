import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FunctionComponent as FC } from "react";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import UpdateIcon from "@mui/icons-material/Update";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  adminModalIsOpen: boolean;
  setAdminModalIsOpen: (value: boolean) => void;
  handleOpenCloseAdminModal: () => void;
}

const AdminPanel: FC<Props> = ({
  adminModalIsOpen,
  setAdminModalIsOpen,
  handleOpenCloseAdminModal,
}) => {
  return (
    <>
      <Modal
        open={adminModalIsOpen}
        onClose={handleOpenCloseAdminModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Drawer anchor="left" variant="permanent">
            <Box sx={{ width: 250 }} role="presentation">
              <List>
                <ListItem disablePadding sx={{ bottom: 0 }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <NoteAddOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ bottom: 0 }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <UpdateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Update" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ bottom: 0 }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ClearIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Box marginLeft={31} component="form" onSubmit={() => {}} noValidate>
            <TextField
              required
              margin="dense"
              id="basic-required"
              fullWidth
              label="Title"
              type="text"
              size="small"
              name="title"
            />
            <TextField
              required
              margin="dense"
              id="outlined-required"
              fullWidth
              label="Title"
              type="text"
              size="small"
              name="title"
            />
            <TextField
              required
              margin="dense"
              id="outlined-required"
              fullWidth
              label="Title"
              type="text"
              size="small"
              name="title"
            />
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "red" }}
              sx={{
                mt: 2,
                mb: 2,
                color: "#FFFFFF",
              }}
            >
              Create movie
            </Button>
            <Grid container>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AdminPanel;
