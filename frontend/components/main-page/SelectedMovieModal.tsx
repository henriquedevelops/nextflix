import { SelectedMovieModalProps } from "@/utils/types";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FunctionComponent as FC } from "react";
import { alpha } from "@mui/material/styles";

const SelectedMovieModal: FC<SelectedMovieModalProps> = ({
  selectedMovie,
  setSelectedMovie,
}) => {
  return (
    <>
      {selectedMovie && (
        <Modal
          open={Boolean(selectedMovie)}
          onClose={() => setSelectedMovie(undefined)}
          onBackdropClick={() => setSelectedMovie(undefined)}
          sx={{
            backdropFilter: "blur(6px)",
          }}
        >
          <Box
            display="flex"
            width={{ xs: "100%", sm: "600px", md: "900px" }}
            height={{ xs: "100%", sm: "400px", md: "700px" }}
            bgcolor="#262626"
            borderRadius={1.2}
          >
            <Stack direction={{ xs: "column", sm: "row" }}>
              <CardMedia
                component="img"
                image={`http://localhost:80/${selectedMovie.image}`}
                sx={{ maxHeight: "100%", maxWidth: "100%" }}
              />
              <Stack direction={"column"} padding={4} spacing={1}>
                <Typography gutterBottom variant="h5" component="div">
                  {selectedMovie.title}
                </Typography>
                <Typography variant="body2">
                  {selectedMovie.description}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default SelectedMovieModal;
