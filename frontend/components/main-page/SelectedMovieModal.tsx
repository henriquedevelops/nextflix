import { SelectedMovieModalProps } from "@/utils/types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FunctionComponent as FC } from "react";
declare var webkit: any;

const SelectedMovieModal: FC<SelectedMovieModalProps> = ({
  selectedMovie,
  setSelectedMovie,
}) => {
  return (
    <>
      {selectedMovie && (
        <Dialog
          open={Boolean(selectedMovie)}
          onClose={() => setSelectedMovie(undefined)}
          maxWidth={false}
        >
          <Box
            sx={{
              backgroundColor: "black",
              width: { sm: "600px", md: "900px" },
            }}
          >
            <Stack direction="row" color="primary">
              <CardMedia
                component="img"
                image={`http://localhost:80/${selectedMovie.image}`}
                sx={{ height: { sm: "400px", md: "650px" } }}
              />
              <Stack spacing={1} padding={4}>
                <DialogContent sx={{ padding: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {selectedMovie.title}
                  </Typography>
                  <Typography paddingBottom={1} color={"primary"}>
                    {selectedMovie.genre}
                  </Typography>
                  <Typography color={"primary"}>
                    {selectedMovie.description}
                  </Typography>
                </DialogContent>
                <DialogActions sx={{ padding: 0 }}>
                  <Button fullWidth variant="contained" color="secondary">
                    play
                  </Button>
                </DialogActions>
              </Stack>
            </Stack>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default SelectedMovieModal;
