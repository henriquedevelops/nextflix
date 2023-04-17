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

export interface CreateUpdateMovieRequestBody {
  title: string | undefined;
  url: string | undefined;
  genre: string | undefined;
  description: string | undefined;
}

export interface validateMovieArgument {
  title: string | undefined;
  url: string | undefined;
  genre: string | undefined;
  description: string | undefined;
}

export interface GetMoviesRequest extends Request {
  query: {
    page: string;
    perPage: string;
    genre?: string;
  };
}
