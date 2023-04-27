import { Dispatch, SetStateAction } from "react";

export interface User {
  username: string;
  id: string;
  isAdmin: boolean;
  myListIds: string[];
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

export interface MyListIdsContextType {
  myListIds: string[];
  setMyListIds: Dispatch<SetStateAction<string[]>>;
}

export interface MoviesListProps {
  moviesRendered: Movie[];
  drawerWidth: number;
  totalAmountOfMovies: number;
  setInfiniteLoader: Dispatch<SetStateAction<number>>;
  setAdminSelectedMovie: Dispatch<SetStateAction<Movie | undefined>>;
  setAdminSelectedAction: Dispatch<SetStateAction<string>>;
}

export interface ResponseDataFromFetchMovies {
  oneSliceOfMovies: Movie[];
  totalAmountOfMovies: number;
}

export interface SidebarProps {
  setSelectedGenre: (value: string) => void;
  selectedGenre: string | null;
  setMoviesRendered: (previousMovies: Movie[]) => void;
  searchTitle: string;
  setSearchTitle: (newSearchTitle: string) => void;
  setTotalAmountOfMovies: (newTotal: number) => void;
  setAdminSelectedAction: Dispatch<SetStateAction<string>>;
}

export interface AdminPanelProps {
  selectedAction: string;
  setSelectedAction: Dispatch<SetStateAction<string>>;
  selectedMovie: Movie | undefined;
  setSelectedMovie: Dispatch<SetStateAction<Movie | undefined>>;
  setMoviesRendered: Dispatch<SetStateAction<Movie[]>>;
}

export interface LoginFormProps {
  toggleSelectedForm: () => void;
  selectedForm: string;
}

export interface SelectedMovieProps {
  selectedMovie: Movie;
  setSelectedMovie: (value: Movie | undefined) => void;
}

export interface AdminPanelFormProps {
  selectedAction: string;
}

export interface ResponseDataFromFetchMyListIds {
  moviesIdsFound: string[];
}

export interface AddRemoveToMyListContextType {
  setMoviesRendered: Dispatch<SetStateAction<Movie[]>>;
  setTotalAmountOfMovies: Dispatch<SetStateAction<number>>;
  selectedGenre: string;
}

export interface MessageAlertContextType {
  setMessageAlert: (newMessageAlert: string) => void;
}

export interface RegisterFormProps {
  toggleSelectedForm: () => void;
}

export interface FetchMoviesArguments {
  selectedGenre: string;
  moviesRendered: Movie[];
  searchTitle: string | undefined;
  setTotalAmountOfMovies: (newTotal: number) => void;
  setMoviesRendered: (newMoviesRendered: Movie[]) => void;
  setMessageAlert: (newMessageAlert: string) => void;
}
