import theme from "@/MUITheme/theme";
import { AdminPanelProps } from "@/utils/types";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList } from "@mui/lab";
import {
  Dialog,
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

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        open={adminModalIsOpen}
        onClose={handleOpenCloseAdminModal}
        maxWidth={false}
        fullScreen={isSmallScreen}
        PaperProps={{
          sx: {
            position: "absolute",
            top: { xs: 0, sm: "15vh" },
            paddingBottom: 1,
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
              <TabList
                onChange={(_, newValue) => {
                  setSelectedAction(newValue);
                }}
              >
                <Tab label="Create" value="Create" />
                <Tab label="Update" value="Update" />
                <Tab label="Delete" value="Delete" />
              </TabList>
            </TabContext>

            <Box
              display="flex"
              justifyContent="flex-end"
              paddingTop={1}
              paddingRight={1}
            >
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
