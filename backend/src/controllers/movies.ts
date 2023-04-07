import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import tryCatch from "../error-handling/tryCatch";
import { CreateMovieRequestData } from "../utils/types";

/* This function retrieves movies from the database based on the 
optional query parameter "selectedGenre". If it is provided, it 
returns only the movies that belong to that genre. Otherwise, it 
returns all the movies in the database. The result is sent back 
as a JSON response with HTTP status code 201. */
export const getMovies = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const genre = req.query.genre?.toString();
    const skip = req.query.skip
      ? parseInt(req.query.skip?.toString())
      : undefined;

    const moviesFound = await prisma.movie.findMany({
      where: genre
        ? {
            genre,
          }
        : undefined,
      skip,
      take: 8,
    });

    const amountOfMoviesFound = await prisma.movie.count({
      where: genre
        ? {
            genre,
          }
        : undefined,
    });

    res.status(201).json({ moviesFound, amountOfMoviesFound });
  }
);

/* This function creates a new movie in the database using data from the 
request body as arguments. Once the movie is created, it responds with a 
201 HTTP status code and the JSON representation of the newly created movie. */
export const createMovie = tryCatch(async (req: Request, res: Response) => {
  const { title, url, description, genre }: CreateMovieRequestData = req.body;

  if (!title || !url || !genre || !description || !req.file) {
    throw new Error("errou");
  }

  await prisma.movie.create({
    data: {
      title,
      genre,
      description,
      image: req.file.path,
      url,
    },
  });

  res.sendStatus(201);
});

/* This function retrieves a single movie from the database based on the 
id parameter passed in the request URL and then returns the movie as a JSON 
response with status code 201. */
export const getMovieById = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const movieFound = await prisma.movie.findUnique({
      where: { id },
    });

    res.status(201).json(movieFound);
  }
);

/* This function receives the movie id in the request parameters and the 
updated movie data in the request body. It uses the Prisma update method 
to update the movie in the database and returns the updated movie in the 
response. */
export const updateMovie = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description, genre } = req.body;

  const updatedMovie = await prisma.movie.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      genre,
    },
  });

  res.status(201).json(updatedMovie);
});

/* This function receives the movie id in the request parameters and uses the 
Prisma delete method to delete the movie from the database. It returns a 204 
status code in the response, indicating that the request was successful but 
there is no content to return. */
export const deleteMovie = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.movie.delete({
    where: {
      id,
    },
  });
  res.sendStatus(204);
});
