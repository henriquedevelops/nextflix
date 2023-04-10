declare global {
  namespace Express {
    export interface Request {
      user: { isAdmin: Boolean; id: string };
    }
  }
}

export interface decodedToken {
  email: string;
  id: string;
  isAdmin: boolean;
}

export interface CreateMovieRequestData {
  title: string;
  genre: string;
  description: string;
  image: string;
  url: string;
}

export interface UpdateMovieRequestData {
  title: string | undefined;
  genre: string | undefined;
  description: string | undefined;
  image: string | undefined;
  url: string | undefined;
}

export interface GetMoviesRequest extends Request {
  query: {
    page: string;
    perPage: string;
    genre?: string;
  };
}
