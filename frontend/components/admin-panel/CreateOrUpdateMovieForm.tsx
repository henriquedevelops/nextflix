import appendToFormData from "@/utils/appendToFormData";
import axios from "@/utils/axios";
import { AdminPanelFormProps } from "@/utils/types";
import { DialogActions, DialogContent, Typography } from "@mui/material";
import { Button, MenuItem, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FunctionComponent as FC, useState } from "react";
import { validateAndCropImage } from "@/utils/validators";
import { useMessageAlert } from "@/utils/contexts";
import { AxiosError } from "axios";

const CreateOrUpdateMovieForm: FC<AdminPanelFormProps> = ({
  selectedAction,
}) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { setMessageAlert } = useMessageAlert();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateAndCropImage(event, setImage, setMessageAlert);
  };

  const handleSubmit = async () => {
    if (selectedAction === "Update" && !id) {
      setMessageAlert("Please enter a movie ID");
      return;
    }

    setLoading(true);

    if (
      selectedAction === "Create" &&
      (!title || !url || !genre || !description)
    ) {
      setMessageAlert("All fields are required");
      setLoading(false);
      return;
    }

    if (selectedAction === "Create" && !uploadedImage) {
      setMessageAlert("An image is required");
      setLoading(false);
      return;
    }

    const formData = appendToFormData(
      title,
      url,
      genre,
      description,
      uploadedImage
    );

    try {
      let updatedMovieTitle: string | undefined;

      if (selectedAction === "Create") await axios.post("/movies", formData);
      if (selectedAction === "Update") {
        const response = await axios.patch<string>(`/movies/${id}`, formData);
        updatedMovieTitle = response.data;
      }

      setMessageAlert(
        `Movie "${updatedMovieTitle || title}" successfully ${
          selectedAction === "Create" ? "created" : "updated"
        }`
      );
      setId("");
      setTitle("");
      setUrl("");
      setGenre("");
      setDescription("");
      setImage(null);
      setLoading(false);
    } catch (error: any) {
      setMessageAlert(error.response.data.message);
      setLoading(false);
      console.log(error);
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
          {selectedAction === "Update" && (
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
          )}
          <TextField
            required={selectedAction === "Create"}
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
            required={selectedAction === "Create"}
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
            required={selectedAction === "Create"}
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
            ].map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </TextField>

          <TextField
            required={selectedAction === "Create"}
            multiline
            label="Description"
            name="description"
            id="outlined-multiline-static"
            rows={selectedAction === "Create" ? 8 : 5}
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
        </Stack>
      </DialogContent>

      <DialogActions sx={{ paddingX: 3, paddingY: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {selectedAction} movie
        </Button>
      </DialogActions>
    </>
  );
};

export default CreateOrUpdateMovieForm;
