import theme from "@/MUITheme/theme";
import { AdminPanelProps } from "@/utils/types";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Tab,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import { FunctionComponent as FC, useState } from "react";
import CreateMovieForm from "./CreateMovieForm";
import DeleteMovieForm from "./DeleteMovieForm";
import UpdateMovieForm from "./UpdateMovieForm";

const AdminPanel: FC<AdminPanelProps> = ({
  adminModalIsOpen,
  handleOpenCloseAdminModal,
}) => {
  const [selectedAction, setSelectedAction] = useState<string>("Create");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangeSelectedAction = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setSelectedAction(newValue);
  };

  return (
    <>
      <Dialog
        open={adminModalIsOpen}
        onClose={handleOpenCloseAdminModal}
        maxWidth={false}
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            position: "absolute",
            top: { xs: 0, sm: "16vh" },
          },
        }}
      >
        <DialogTitle sx={{ padding: 0 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <TabContext value={selectedAction}>
              <TabList onChange={handleChangeSelectedAction}>
                <Tab label="Create" value="Create" />
                <Tab label="Update" value="Update" />
                <Tab label="Delete" value="Delete" />
              </TabList>
            </TabContext>

            <Box display="flex" justifyContent="flex-end" pt={1} pr={1}>
              <IconButton onClick={handleOpenCloseAdminModal}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>

        {selectedAction === "Create" && <CreateMovieForm />}
        {selectedAction === "Update" && <UpdateMovieForm />}
        {selectedAction === "Delete" && <DeleteMovieForm />}
      </Dialog>
    </>
  );
};

export default AdminPanel;
