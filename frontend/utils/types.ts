export interface User {
  email: string;
  id: string;
  isAdmin: boolean;
}

export interface Movie {
  title: string;
  url: string;
  genre: string;
  description: string;
  image: string;
}

export interface formValues {
  title: string;
  url: string;
  genre: string;
  description: string;
  image: File | undefined;
}
