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

const DeleteMovieForm: FC = () => {
  return (
    <>
      <Stack spacing={2}>
        <TextField
          label="ID"
          required
          size="small"
          sx={{ marginBottom: 35.4 }}
        />

        <Button variant="contained">Delete movie</Button>
      </Stack>
    </>
  );
};

export default DeleteMovieForm;
