import appendToFormData from "@/utils/appendToFormData";
import axios from "@/utils/axios";
import validateImage from "@/utils/validateImage";
import { DialogActions, DialogContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FunctionComponent as FC, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UpdateMovieForm: FC = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateImage(event, setImage);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) {
      toast.error("Please enter a movie ID");
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
      await axios.patch(`/movies/${id}`, formData);
      setTitle("");
      setUrl("");
      setGenre("");
      setDescription("");
      setId("");
      setImage(null);
      setLoading(false);
      toast.success("Movie succesfully updated");
    } catch (error) {
      setLoading(false);
      toast.error("Error updating movie");
    }
  };

  return (
    <>
      <Toaster />
      <DialogContent
        sx={{
          width: { xs: "100%", sm: "535px" },
          paddingBottom: 0,
        }}
      >
        <Stack spacing={2} component="form" onSubmit={handleSubmit} noValidate>
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
        <Button variant="contained" type="submit" fullWidth>
          Update movie
        </Button>
      </DialogActions>
    </>
  );
};

export default UpdateMovieForm;
