import axios from 'axios'
import { Movie, ResponseDataFromFetchMovies } from '../utils/types'
import { Menu as MenuIcon } from '@mui/icons-material'
import {
  AppBar,
  Box,
  CardMedia,
  Drawer,
  IconButton,
  Toolbar,
} from '@mui/material'
import { FunctionComponent as FC, useEffect, useRef, useState } from 'react'
import MoviesList from './MoviesList'
import Sidebar from './Sidebar'
import { AddRemoveToMyListContext, useMessageAlert } from '../utils/contexts'
import { genericErrorAlert } from '../utils/validators'
import AdminPanel from './AdminPanel'

/* 
This component contains the entire content of the index page, except only for the notifications system.
*/

const Main: FC = () => {
  const [moviesRendered, setMoviesRendered] = useState<Movie[]>([])
  const [totalAmountOfMovies, setTotalAmountOfMovies] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState<string>('All movies')
  const [searchTitle, setSearchTitle] = useState<string>('')
  const [infiniteLoader, setInfiniteLoader] = useState<number>(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setMessageAlert } = useMessageAlert()
  const [adminSelectedAction, setAdminSelectedAction] = useState<string>('')
  const previousController: any = useRef()
  const [adminSelectedMovie, setAdminSelectedMovie] = useState<
    Movie | undefined
  >(undefined)

  useEffect(() => {
    const fetchMovies = async () => {
      if (previousController.current) {
        previousController.current.abort()
      }

      // A new instance of the AbortController is created before making the API request
      const controller = new AbortController()

      // grab a reference to its associated AbortSignal object using the AbortController.signal property
      const signal = controller.signal

      previousController.current = controller
      try {
        const response = await axios.get<ResponseDataFromFetchMovies>(
          `api/${selectedGenre === 'My list' ? 'myList' : 'movies'}?skip=${
            moviesRendered.length
          }&genre=${selectedGenre === 'All movies' ? '' : selectedGenre}${
            searchTitle && '&title=' + searchTitle
          }`,
          {
            signal,
            withCredentials: true,
          }
        )

        if (response.status === 204) {
          setTotalAmountOfMovies(0)
          return
        }

        const newSliceOfMovies = response.data.oneSliceOfMovies
        const totalAmount = response.data.totalAmountOfMovies

        setMoviesRendered([...moviesRendered, ...newSliceOfMovies])
        setTotalAmountOfMovies(totalAmount)
      } catch (error: any) {
        if (!axios.isCancel(error)) {
          setMessageAlert(genericErrorAlert)
          setTotalAmountOfMovies(0)
          console.error(error)
        }
      }
    }

    fetchMovies()
  }, [selectedGenre, searchTitle, infiniteLoader, setMessageAlert])

  const drawerWidth = 270

  return (
    <AddRemoveToMyListContext.Provider
      value={{ setMoviesRendered, setTotalAmountOfMovies, selectedGenre }}
    >
      <Box sx={{ display: 'flex' }}>
        <AppBar
          color="transparent"
          position="fixed"
          sx={{
            backgroundColor: 'black',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar sx={{ display: { sm: 'none' } }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={() => {
                setMobileOpen(!mobileOpen)
              }}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <CardMedia
              component="img"
              sx={{ width: '200px', marginTop: '1px' }}
              image="/images/Logo2.png"
            />
          </Toolbar>
        </AppBar>
        {adminSelectedAction && (
          <AdminPanel
            selectedAction={adminSelectedAction}
            setSelectedAction={setAdminSelectedAction}
            selectedMovie={adminSelectedMovie}
            setSelectedMovie={setAdminSelectedMovie}
            setMoviesRendered={setMoviesRendered}
          />
        )}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => {
              setMobileOpen(!mobileOpen)
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <Sidebar
              setSelectedGenre={setSelectedGenre}
              selectedGenre={selectedGenre}
              setMoviesRendered={setMoviesRendered}
              searchTitle={searchTitle}
              setSearchTitle={setSearchTitle}
              setTotalAmountOfMovies={setTotalAmountOfMovies}
              setAdminSelectedAction={setAdminSelectedAction}
            />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                borderRight: 'none',
              },
            }}
            open
          >
            <Sidebar
              setSelectedGenre={setSelectedGenre}
              selectedGenre={selectedGenre}
              setMoviesRendered={setMoviesRendered}
              searchTitle={searchTitle}
              setSearchTitle={setSearchTitle}
              setTotalAmountOfMovies={setTotalAmountOfMovies}
              setAdminSelectedAction={setAdminSelectedAction}
            />
          </Drawer>
        </Box>
        <MoviesList
          moviesRendered={moviesRendered}
          drawerWidth={drawerWidth}
          totalAmountOfMovies={totalAmountOfMovies}
          setInfiniteLoader={setInfiniteLoader}
          setAdminSelectedMovie={setAdminSelectedMovie}
          setAdminSelectedAction={setAdminSelectedAction}
        />
      </Box>
    </AddRemoveToMyListContext.Provider>
  )
}

export default Main
