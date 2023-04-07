import axios from "@/utils/axios";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FunctionComponent as FC, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const CreateMovieForm: FC = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 1024 * 1024 || file.type !== "image/jpeg") {
        console.log("erro");

        toast.error("Image must be jpeg format and 1 MB max");
        return;
      }
      setImage(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!title || !url || !genre || !description) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    if (!uploadedImage) {
      toast.error("A movie must have an image cover");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("url", url);
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("image", uploadedImage);

    try {
      await axios.post("/movies", formData);
      setTitle("");
      setUrl("");
      setGenre("");
      setDescription("");
      setImage(null);
      setLoading(false);
      toast.success("New movie created");
    } catch (error) {
      setLoading(false);
      toast.error("Error creating movie");
    }
  };

  return (
    <>
      <Toaster />
      <Stack spacing={2} component="form" onSubmit={handleSubmit} noValidate>
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
          <MenuItem value="Action">Action</MenuItem>
          <MenuItem value="Comedy">Comedy</MenuItem>
          <MenuItem value="Documentary">Documentary</MenuItem>
          <MenuItem value="Science-fiction">Science-fiction</MenuItem>
          <MenuItem value="Horror">Horror</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
        </TextField>

        <TextField
          required
          multiline
          label="Description"
          name="description"
          id="outlined-multiline-static"
          rows={3}
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

        <Button variant="contained" type="submit">
          Create movie
        </Button>
      </Stack>
    </>
  );
};

export default CreateMovieForm;
