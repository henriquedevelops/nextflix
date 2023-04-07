export interface User {
  email: string;
  id: string;
  isAdmin: boolean;
}

export interface Movie {
  id: string;
  title: string;
  url: string;
  genre: string;
  description: string;
  image: string;
}

export interface FormValues {
  title: string;
  url: string;
  genre: string;
  description: string;
  image: File | undefined;
}

export interface LoggedUserContextType {
  loggedUser: User;
}

export interface MoviesListProps {
  moviesList: Movie[];
  drawerWidth: number;
  totalAmountOfMovies: number;
  fetchMovies: () => Promise<void>;
}

export interface ResponseFromGetMovies {
  moviesFound: Movie[];
  amountOfMoviesFound: number;
}

export interface SidebarProps {
  setSelectedGenre: (value: string) => void;
  selectedGenre: string | null;
  setMoviesList: (previousMovies: Movie[]) => void;
  searchTitle: string;
  setSearchTitle: (newSearchTitle: string) => void;
}

export interface AdminPanelProps {
  adminModalIsOpen: boolean;
  handleOpenCloseAdminModal: () => void;
}
