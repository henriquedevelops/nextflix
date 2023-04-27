import axios from "@/utils/axios";
import { useMessageAlert } from "@/utils/contexts";
import { AdminPanelProps, Movie } from "@/utils/types";
import { validateAndCropImage } from "@/utils/validators";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { FunctionComponent as FC, useEffect, useState } from "react";

/* 
This modal component contains panel that allows the admin to create, update
and delete movies directly from the index page
*/

const AdminPanel: FC<AdminPanelProps> = ({
  selectedAction,
  setSelectedAction,
  selectedMovie,
  setSelectedMovie,
  setMoviesRendered,
}) => {
  const [title, setTitle] = useState(selectedMovie?.title || "");
  const [url, setUrl] = useState(selectedMovie?.url || "");
  const [genre, setGenre] = useState(selectedMovie?.genre || "");
  const [description, setDescription] = useState(
    selectedMovie?.description || ""
  );
  const [uploadedImage, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { setMessageAlert } = useMessageAlert();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateAndCropImage(event, setImage, setMessageAlert);
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (
      selectedAction === "Create" &&
      (!title || !url || !genre || !description || !uploadedImage)
    ) {
      setMessageAlert("All fields are required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    title && formData.append("title", title);
    url && formData.append("url", url);
    genre && formData.append("genre", genre);
    description && formData.append("description", description);
    uploadedImage && formData.append("image", uploadedImage);

    try {
      if (selectedAction === "Create") {
        await axios.post("/movies", formData);

        setMessageAlert(
          `Movie "${title}" successfully created.
        `
        );
      }

      if (selectedAction === "Update") {
        const response = await axios.patch<Movie>(
          `/movies/${selectedMovie?.id}`,
          formData
        );
        const updatedMovie = response.data;

        setMoviesRendered((previousMovies) => {
          return previousMovies.map((movie) => {
            if (movie.id === updatedMovie.id) {
              return updatedMovie;
            }
            return movie;
          });
        });

        resetStates();

        setMessageAlert(
          `Movie "${updatedMovie.title}" successfully updated.
        `
        );
      }
    } catch (error: any) {
      setMessageAlert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  const handleDeleteMovie = async () => {
    setLoading(true);

    try {
      await axios.delete(`/movies/${selectedMovie?.id}`);
      setMoviesRendered((previousMovies) => [
        ...previousMovies.filter((movie) => movie.id !== selectedMovie?.id),
      ]);
      setMessageAlert(`Movie "${selectedMovie?.title}" successfully deleted!`);

      resetStates();
    } catch (error) {
      setLoading(false);
      setMessageAlert(
        "Error deleting movie, please check your internet connection"
      );
    }
  };

  const handleCloseAdminDialog = () => {
    setSelectedAction("");
    setSelectedMovie(undefined);
  };

  const resetStates = () => {
    setTitle("");
    setGenre("");
    setDescription("");
    setUrl("");
    setImage(null);
    setSelectedAction("");
  };

  return (
    <>
      <Dialog
        open={Boolean(selectedAction)}
        onClose={handleCloseAdminDialog}
        maxWidth={false}
      >
        <Stack
          spacing={2}
          sx={{
            width: "500px",
            padding: 2.5,
          }}
        >
          {selectedAction === "Delete" ? (
            <Alert variant="outlined" severity="warning">
              Are you sure you want to delete movie &quot;{selectedMovie?.title}
              &quot;?
            </Alert>
          ) : (
            <>
              <TextField
                required
                label="Title"
                size="small"
                name="title"
                disabled={loading}
                value={title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(event.target.value);
                }}
              />
              <TextField
                required
                label="URL"
                size="small"
                name="url"
                value={url}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUrl(event.target.value);
                }}
                disabled={loading}
              />

              <TextField
                required
                select
                label="Genre"
                size="small"
                value={genre}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setGenre(event.target.value);
                }}
                disabled={loading}
              >
                {[
                  "Action",
                  "Comedy",
                  "Documentary",
                  "Science-fiction",
                  "Horror",
                  "Drama",
                ].map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                multiline
                label="Description"
                name="description"
                id="outlined-multiline-static"
                rows={7}
                value={description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDescription(event.target.value);
                }}
                disabled={loading}
              />
              {uploadedImage && (
                <Typography color={"primary"}>
                  Image uploaded: {uploadedImage.name}
                </Typography>
              )}
              <Button variant="outlined" component="label" disabled={loading}>
                Upload image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageUpload}
                  disabled={loading}
                />
              </Button>
            </>
          )}
          <LoadingButton
            fullWidth
            variant="contained"
            onClick={
              selectedAction === "Delete" ? handleDeleteMovie : handleSubmit
            }
            loading={loading}
          >
            {selectedAction} movie
          </LoadingButton>
        </Stack>
      </Dialog>
    </>
  );
};

export default AdminPanel;
