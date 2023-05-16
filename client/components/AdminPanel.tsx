import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Dialog,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { FunctionComponent as FC, useState } from "react";
import axios from "../utils/axios";
import { useAddRemoveToMyList, useMessageAlert } from "../utils/contexts";
import { AdminPanelProps, Movie } from "../utils/types";
import { validateAndCropImage } from "../utils/validators";
import theme from "@/MUITheme/theme";

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
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { setMessageAlert } = useMessageAlert();
  const { setTotalAmountOfMovies } = useAddRemoveToMyList();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async () => {
    setLoading(true);

    if (
      selectedAction === "Add" &&
      (!title || !url || !genre || !description || !image)
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
    image && formData.append("image", image);

    try {
      if (selectedAction === "Add") {
        await axios.post("/movies", formData);

        setMessageAlert(
          `Movie "${title}" successfully added
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

        setSelectedAction("");
        setMessageAlert(
          `Movie "${title}" successfully updated
        `
        );
      }

      resetStates();
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
      setTotalAmountOfMovies((previousValue) => previousValue - 1);
      setMessageAlert(`Movie "${title}" successfully deleted`);

      setSelectedAction("");
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
    resetStates();
  };

  const resetStates = () => {
    setTitle("");
    setGenre("");
    setDescription("");
    setUrl("");
    setImage(null);
    setLoading(false);
    setSelectedMovie(undefined);
  };

  return (
    <>
      <Dialog
        open={Boolean(selectedAction)}
        onClose={handleCloseAdminDialog}
        maxWidth={false}
        fullWidth={isSmallScreen}
      >
        <Stack
          spacing={2}
          sx={{
            width: { xs: "100%", sm: "500px" },
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
              {image && (
                <Typography color={"primary"}>
                  Image uploaded: {image.name}
                </Typography>
              )}
              <Button variant="outlined" component="label" disabled={loading}>
                Upload image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    validateAndCropImage(event, setImage, setMessageAlert)
                  }
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
