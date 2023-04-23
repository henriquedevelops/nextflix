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
import CreateUpdateForm from "./CreateUpdateForm";
import DeleteForm from "./DeleteForm";

/* 
This modal component contains panel that allows the admin to create, update
and delete movies directly from the index page
*/

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
            top: { xs: 0, sm: "13vh" },
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
        {(selectedAction === "Create" || selectedAction === "Update") && (
          <CreateUpdateForm selectedAction={selectedAction} />
        )}
        {selectedAction === "Delete" && <DeleteForm />}
      </Dialog>
    </>
  );
};

export default AdminPanel;
