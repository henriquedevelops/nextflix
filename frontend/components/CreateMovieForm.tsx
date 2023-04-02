import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FunctionComponent as FC, useState } from "react";

const CreateMovieForm: FC = () => {
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const handleChangeGenre = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenre(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (image) data.append("image", image);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();
    const description = data.get("description")?.toString();
    const imageRec = data.get("image");
    console.log(title, imageRec);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField required label="Title" size="small" name="title" />
          <TextField required label="URL" size="small" name="url" />

          <TextField
            required
            select
            label="Genre"
            size="small"
            value={genre}
            onChange={handleChangeGenre}
          >
            <MenuItem value="Action">Action</MenuItem>
            <MenuItem value="Comedy">Comedy</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
          </TextField>

          <TextField
            required
            multiline
            label="Description"
            name="description"
            id="outlined-multiline-static"
            rows={3}
          />
          {image && <Typography>Image selected: {image.name}</Typography>}
          <Button variant="outlined" component="label">
            Upload image
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
          </Button>

          <Button variant="contained" type="submit">
            Create movie
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default CreateMovieForm;
