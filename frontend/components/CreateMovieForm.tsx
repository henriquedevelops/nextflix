import { PhotoCamera } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FunctionComponent as FC, useState } from "react";

const CreateMovieForm: FC = () => {
  const [genre, setGenre] = useState("");

  const handleChangeGenre = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };

  return (
    <>
      <Stack spacing={2}>
        <TextField label="Title" required size="small" />
        <TextField label="URL" required size="small" />
        <FormControl fullWidth>
          <InputLabel size="small" sx={{ marginBottom: 1 }} required>
            Genre
          </InputLabel>
          <Select
            label="Genre"
            required
            size="small"
            value={genre}
            onChange={handleChangeGenre}
          >
            <MenuItem>Ten</MenuItem>
            <MenuItem>Twenty</MenuItem>
            <MenuItem>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          required
          multiline
          rows={3}
        />
        <Button variant="outlined">Upload image</Button>

        <Button variant="contained">Create movie</Button>
      </Stack>
    </>
  );
};

export default CreateMovieForm;
