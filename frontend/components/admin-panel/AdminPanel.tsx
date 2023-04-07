import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FunctionComponent as FC, useState } from "react";
import { TabList, TabContext } from "@mui/lab";
import { Dialog, IconButton, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import CreateMovieForm from "./CreateMovieForm";
import DeleteMovieForm from "./DeleteMovieForm";
import CloseIcon from "@mui/icons-material/Close";
import { AdminPanelProps } from "@/utils/types";

const AdminPanel: FC<AdminPanelProps> = ({
  adminModalIsOpen,
  handleOpenCloseAdminModal,
}) => {
  const [selectedAction, setSelectedAction] = useState<string>("Create");

  const handleChangeSelectedAction = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setSelectedAction(newValue);
  };

  return (
    <>
      <Modal
        open={adminModalIsOpen}
        onClose={handleOpenCloseAdminModal}
        onBackdropClick={handleOpenCloseAdminModal}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          position="relative"
        >
          <Box
            position="absolute"
            top={{ xs: 0, sm: "20vh" }}
            width={{ xs: "100%", sm: "500px" }}
            height={{ xs: "100vh", sm: "fit-content" }}
            bgcolor="#262626"
            borderRadius={1.2}
            display="flex"
            flexDirection="column"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <TabContext value={selectedAction}>
                <TabList onChange={handleChangeSelectedAction}>
                  <Tab label="Create" value="Create" />
                  <Tab label="Delete" value="Delete" />
                </TabList>
              </TabContext>
              <Box display="flex" justifyContent="flex-end" pt={1} pr={1}>
                <IconButton onClick={handleOpenCloseAdminModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <Box padding={3} flexGrow={1}>
              {selectedAction === "Create" && <CreateMovieForm />}
              {selectedAction === "Delete" && <DeleteMovieForm />}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AdminPanel;
