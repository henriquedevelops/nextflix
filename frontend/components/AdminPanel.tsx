import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FunctionComponent as FC, useState } from "react";
import { TabList, TabContext } from "@mui/lab";
import { Tab } from "@mui/material";
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
      <Modal open={adminModalIsOpen} onClose={handleOpenCloseAdminModal}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "100%", sm: "100%", md: 500 },
            height: 472,
            boxShadow: 24,
            bgcolor: "#202020",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <TabContext value={selectedAction}>
              <Box>
                <TabList
                  aria-label="Tabs example"
                  onChange={handleChangeSelectedAction}
                >
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
