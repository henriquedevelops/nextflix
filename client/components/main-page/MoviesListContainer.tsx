import { Movie, MoviesListContainerProps } from "@/utils/types";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { FunctionComponent as FC, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import SelectedMovieModal from "./SelectedMovieModal";

/* 
This component contains only one of three things: the movies that are 
currently being rendered, a loading sign circle or a message saying 
that no movie was found.
*/

const MoviesListContainer: FC<MoviesListContainerProps> = ({
  moviesRendered,
  drawerWidth,
  totalAmountOfMovies,
  fetchMovies,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(
    undefined
  );

  return (
    <>
      {selectedMovie && (
        <SelectedMovieModal
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
      <Container
        maxWidth={false}
        sx={{
          marginTop: { xs: 6.2, sm: 1 },
          padding: { xs: 0 },
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <InfiniteScroll
          dataLength={moviesRendered.length}
          next={async () => await fetchMovies()}
          hasMore={totalAmountOfMovies > moviesRendered.length}
          loader={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: moviesRendered.length > 0 ? "350px" : "100vh",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          }
          endMessage={
            moviesRendered.length < 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "350px",
                  width: "100%",
                }}
              >
                <Typography variant="h5">No movies found</Typography>
              </Box>
            )
          }
        >
          <Grid container spacing={{ xs: 4, sm: 4, md: 1 }}>
            {moviesRendered.map((movie) => (
              <Grid
                item
                key={movie.id}
                xs={16}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                xxl={2}
              >
                <Card sx={{ height: "100%" }}>
                  <CardActionArea
                    disableTouchRipple
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <CardMedia
                      component="img"
                      image={`data:image/jpeg;base64,${movie.image}`}
                    />

                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        sx={{ fontSize: "1.0rem" }}
                      >
                        {movie.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.9rem" }}
                      >
                        {movie.genre}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Container>
    </>
  );
};

export default MoviesListContainer;
