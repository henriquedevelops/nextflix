import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FunctionComponent as FC, useState } from "react";
import { TabList, TabContext } from "@mui/lab";
import { Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

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
            height: { xs: "100%", sm: "100%", md: 500 },
            boxShadow: 24,

            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <TabContext value={selectedAction}>
              <Box>
                <TabList
                  aria-label="Tabs example"
                  onChange={handleChangeSelectedAction}
                >
                  <Tab label="Create" value="1" />
                  <Tab label="Update" value="2" />
                  <Tab label="delete" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">Panel one</TabPanel>
              <TabPanel value="2">Panel two</TabPanel>
              <TabPanel value="3">Panel three</TabPanel>
            </TabContext>
          </Box>
          {/*           <Box component="form" onSubmit={() => {}} noValidate padding={4}>
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
          </Box> */}
        </Box>
      </Modal>
    </>
  );
};

export default AdminPanel;
