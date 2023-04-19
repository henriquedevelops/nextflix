import axios from "@/utils/axios";
import { useMessageAlert } from "@/utils/contexts";
import { Movie } from "@/utils/types";
import { LoadingButton } from "@mui/lab";
import Alert from "@mui/material/Alert";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FunctionComponent as FC, useState } from "react";

const DeleteMovieForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const [confirmationIsOpen, setShowConfirmation] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");
  const { setMessageAlert } = useMessageAlert();

  const handleChangeSelectedMovieId = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedMovieId(event.target.value);
  };

  const handleOpenConfirmation = async () => {
    if (!selectedMovieId) {
      setMessageAlert("Please enter a movie ID");
      return;
    }
    setLoading(true);
    try {
      const { data: movieFound } = await axios.get<Movie>(
        `/movies/${selectedMovieId}`
      );
      setSelectedMovieTitle(movieFound.title);
      setShowConfirmation(true);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setMessageAlert(error.response.data.message);
    }
  };

  const handleDeleteMovie = async () => {
    setLoading(true);
    setShowConfirmation(false);

    try {
      await axios.delete(`/movies/${selectedMovieId}`);
      setMessageAlert(`Movie "${selectedMovieTitle}" successfully deleted!`);
      setLoading(false);
      setSelectedMovieId("");
      setSelectedMovieTitle("");
    } catch (error) {
      setLoading(false);
      setMessageAlert(
        "Error deleting movie, please check your internet connection"
      );
    }
  };

  return (
    <>
      <DialogContent
        sx={{ width: { xs: "100%", sm: "535px" }, paddingBottom: 0 }}
      >
        <Stack paddingTop={3}>
          <TextField
            label="ID"
            required
            size="small"
            value={selectedMovieId}
            onChange={handleChangeSelectedMovieId}
            disabled={loading}
          />
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          width: { xs: "100%", sm: "535px" },
          paddingX: 3,
          paddingBottom: 2,
          paddingTop: 0,
        }}
      >
        <Stack spacing={2} paddingTop={2} width={"100%"}>
          {confirmationIsOpen && (
            <Alert variant="outlined" severity="warning">
              Are you sure you want to delete movie "{selectedMovieTitle}"? This
              action can't be undone!
            </Alert>
          )}
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={
              !confirmationIsOpen ? handleOpenConfirmation : handleDeleteMovie
            }
            fullWidth
          >
            {confirmationIsOpen ? "Confirm" : "Delete movie"}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </>
  );
};

export default DeleteMovieForm;
