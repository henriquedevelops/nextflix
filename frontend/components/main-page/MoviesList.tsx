import { MoviesListProps } from "@/utils/types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FunctionComponent as FC } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

const MoviesList: FC<MoviesListProps> = ({
  moviesList,
  drawerWidth,
  totalAmountOfMovies,
  fetchMovies,
}) => {
  return (
    <>
      <CssBaseline />

      <Container
        maxWidth={false}
        sx={{
          marginTop: { xs: 6.2, sm: 0 },
          padding: { xs: 0 },
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <InfiniteScroll
          dataLength={moviesList.length}
          next={async () => await fetchMovies()}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <Grid container spacing={{ xs: 4, sm: 1 }}>
            {moviesList.map((movie) => (
              <Grid item key={movie.id} xs={16} sm={12} md={6} lg={4} xl={3}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={`http://localhost:80/${movie.image}`}
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

export default MoviesList;
