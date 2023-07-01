import { Movie, MoviesListProps } from '@/utils/types'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { FunctionComponent as FC, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import InfiniteScroll from 'react-infinite-scroll-component'
import SelectedMovie from './SelectedMovie'
import EditIcon from '@mui/icons-material/Edit'
import { useLoggedUser } from '@/utils/contexts'
import theme from '@/MUITheme/theme'

/* 

This component contains one of three things: the movie cards that are 
currently being rendered, a loading sign circle or a message saying 
that no movie was found.

*/

const MoviesList: FC<MoviesListProps> = ({
  moviesRendered,
  drawerWidth,
  totalAmountOfMovies,
  setInfiniteLoader,
  setAdminSelectedMovie,
  setAdminSelectedAction,
}) => {
  const { loggedUser } = useLoggedUser()
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(
    undefined
  )
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleOpenAdminDialog = (
    adminSelectedAction: string,
    adminSelectedMovie: Movie | undefined
  ) => {
    setAdminSelectedMovie(adminSelectedMovie)
    setAdminSelectedAction(adminSelectedAction)
  }

  return (
    <>
      <Dialog
        open={Boolean(selectedMovie)}
        onClose={() => setSelectedMovie(undefined)}
        maxWidth={false}
        fullScreen={isSmallScreen}
      >
        {selectedMovie && (
          <SelectedMovie
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />
        )}
      </Dialog>
      <Container
        maxWidth={false}
        sx={{
          marginY: { xs: 6.2, sm: 0, md: 1 },
          marginRight: { xs: 0, sm: 0, md: 1 },
          padding: { xs: 0 },
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <InfiniteScroll
          dataLength={moviesRendered.length}
          next={() => setInfiniteLoader((previousValue) => previousValue + 1)}
          hasMore={totalAmountOfMovies > moviesRendered.length}
          loader={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: moviesRendered.length > 0 ? '350px' : '100vh',
                width: '100%',
              }}
            >
              <CircularProgress />
            </Box>
          }
          endMessage={
            moviesRendered.length < 1 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  width: '100%',
                }}
              >
                <Typography variant="h5">No movies found.</Typography>
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
                <Card
                  sx={{ height: '100%', cursor: 'pointer' }}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <Box style={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      image={`data:image/jpeg;base64,${movie.image}`}
                    />
                    <Stack
                      direction={'row'}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.70)',
                        margin: 1,
                        borderRadius: 1,
                        zIndex: 1,
                      }}
                    >
                      {loggedUser.isAdmin && (
                        <>
                          <IconButton
                            disableRipple
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                              event.stopPropagation()
                              handleOpenAdminDialog('Update', movie)
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            disableRipple
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                              event.stopPropagation()
                              handleOpenAdminDialog('Delete', movie)
                            }}
                          >
                            <ClearIcon />
                          </IconButton>
                        </>
                      )}
                    </Stack>
                  </Box>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{ fontSize: '1.0rem' }}
                    >
                      {movie.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: '0.9rem' }}
                    >
                      {movie.genre}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Container>
    </>
  )
}

export default MoviesList
