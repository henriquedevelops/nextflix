import axios from "@/utils/axios";
import { Movie } from "@/utils/types";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FunctionComponent as FC, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const DeleteMovieForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");

  const handleChangeSelectedMovieId = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedMovieId(event.target.value);
  };

  const handleShowConfirmation = async () => {
    if (!selectedMovieId) {
      toast.error("Please enter a movie ID");
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
    } catch (error) {
      setLoading(false);
      toast.error("Invalid movie ID");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setShowConfirmation(false);

    if (!selectedMovieId) {
      setLoading(false);
      toast.error("Please enter a movie id");
      return;
    }

    try {
      await axios.delete(`/movies/${selectedMovieId}`);
      setLoading(false);
      setSelectedMovieId("");
      setSelectedMovieTitle("");
      toast.success("Movie successfully deleted!");
    } catch (error) {
      setLoading(false);
      toast.error("Error deleting movie");
    }
  };

  return (
    <>
      <Toaster />
      <Stack spacing={2} component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="ID"
          required
          size="small"
          value={selectedMovieId}
          onChange={handleChangeSelectedMovieId}
          disabled={loading}
        />

        {showConfirmation ? (
          <>
            <Alert variant="outlined" severity="warning">
              Are you sure you want to delete movie "{selectedMovieTitle}"? This
              action can't be undone!
            </Alert>
            <Button variant="contained" type="submit" disabled={loading}>
              Confirm
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            disabled={loading}
            onClick={handleShowConfirmation}
          >
            Delete movie
          </Button>
        )}
      </Stack>
    </>
  );
};

export default DeleteMovieForm;
