import appendToFormData from "@/utils/appendToFormData";
import axios from "@/utils/axios";
import { AdminPanelFormProps } from "@/utils/types";
import { DialogActions, DialogContent, Typography } from "@mui/material";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { FunctionComponent as FC, useState } from "react";
import { validateImage } from "@/utils/validators";
import { useMessageAlert } from "@/utils/contexts";

const UpdateMovieForm: FC<AdminPanelFormProps> = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { setMessageAlert } = useMessageAlert();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateImage(event, setImage, setMessageAlert);
  };

  const handleSubmit = async () => {
    if (!id) {
      setMessageAlert("Please enter a movie ID");
      return;
    }

    setLoading(true);

    const formData = appendToFormData(
      title,
      url,
      genre,
      description,
      uploadedImage
    );

    try {
      const { data: updatedMovieTitle } = await axios.patch<string>(
        `/movies/${id}`,
        formData
      );
      setMessageAlert(`Movie "${updatedMovieTitle}" successfully updated`);
      setUrl("");
      setGenre("");
      setDescription("");
      setId("");
      setTitle("");
      setImage(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessageAlert(
        "Error updating movie, please check your internet connection"
      );
    }
  };

  return (
    <>
      <DialogContent
        sx={{
          width: { xs: "100%", sm: "535px" },
          paddingBottom: 0,
        }}
      >
        <Stack spacing={2} paddingTop={3}>
          <TextField
            label="ID"
            required
            size="small"
            value={id}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setId(event.target.value);
            }}
            disabled={loading}
          />

          <TextField
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
            select
            label="Genre"
            size="small"
            value={genre}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setGenre(event.target.value);
            }}
            disabled={loading}
          >
            <MenuItem value="Action">Action</MenuItem>
            <MenuItem value="Comedy">Comedy</MenuItem>
            <MenuItem value="Documentary">Documentary</MenuItem>
            <MenuItem value="Science-fiction">Science-fiction</MenuItem>
            <MenuItem value="Horror">Horror</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
          </TextField>

          <TextField
            multiline
            label="Description"
            name="description"
            id="outlined-multiline-static"
            rows={5}
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
          <Button variant="outlined" component="label">
            Upload image
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
              disabled={loading}
            />
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ paddingX: 3, paddingY: 2 }}>
        <Button
          disabled={loading}
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          Update movie
        </Button>
      </DialogActions>
    </>
  );
};

export default UpdateMovieForm;
