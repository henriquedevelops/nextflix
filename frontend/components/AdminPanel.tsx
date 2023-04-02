import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FunctionComponent as FC, useState } from "react";
import { TabList, TabContext } from "@mui/lab";
import { Dialog, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import CreateMovieForm from "./CreateMovieForm";
import DeleteMovieForm from "./DeleteMovieForm";

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
            top="20vh"
            width="500px"
            bgcolor="#202020"
            borderRadius={1.2}
          >
            <TabContext value={selectedAction}>
              <Box>
                <TabList onChange={handleChangeSelectedAction}>
                  <Tab label="Create" value="Create" />
                  <Tab label="Delete" value="Delete" />
                </TabList>
              </Box>
            </TabContext>{" "}
            <Box padding={3}>
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
