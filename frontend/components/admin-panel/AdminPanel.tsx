import theme from "@/MUITheme/theme";
import { AdminPanelProps } from "@/utils/types";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList } from "@mui/lab";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Snackbar,
  Tab,
  ThemeProvider,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import { FunctionComponent as FC, useState, useEffect } from "react";
import CreateMovieForm from "./CreateMovieForm";
import DeleteMovieForm from "./DeleteMovieForm";
import UpdateMovieForm from "./UpdateMovieForm";

const AdminPanel: FC<AdminPanelProps> = ({
  adminModalIsOpen,
  handleOpenCloseAdminModal,
}) => {
  const [selectedAction, setSelectedAction] = useState<string>("Create");
  const [messageAlert, setMessageAlert] = useState<string>("");
  const [messageAlertIsOpen, setMessageAlertIsOpen] = useState(false);

  useEffect(() => {
    messageAlert && setMessageAlertIsOpen(true);
  }, [messageAlert]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        fullScreen={isSmallScreen}
        PaperProps={{
          sx: {
            position: "absolute",
            top: { xs: 0, sm: "15vh" },
            paddingBottom: 1,
          },
        }}
      >
        <ThemeProvider theme={createTheme()}>
          <Snackbar
            open={messageAlertIsOpen}
            autoHideDuration={2500}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            onClose={() => setMessageAlertIsOpen(false)}
            TransitionProps={{ onExited: () => setMessageAlert("") }}
          >
            <Alert
              severity={messageAlert.includes("success") ? "success" : "error"}
              sx={{ width: "100%" }}
              variant="filled"
            >
              {messageAlert}
            </Alert>
          </Snackbar>
        </ThemeProvider>
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

        {selectedAction === "Create" && (
          <CreateMovieForm setMessageAlert={setMessageAlert} />
        )}
        {selectedAction === "Update" && (
          <UpdateMovieForm setMessageAlert={setMessageAlert} />
        )}
        {selectedAction === "Delete" && (
          <DeleteMovieForm setMessageAlert={setMessageAlert} />
        )}
      </Dialog>
    </>
  );
};

export default AdminPanel;
