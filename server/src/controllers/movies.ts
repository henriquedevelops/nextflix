import { Request, Response } from "express";
import prisma from "../../prisma/client";
import tryCatch from "../error-handling/tryCatch";
import { CreateUpdateMovieRequestBody } from "../utils/types";
import CustomError from "../error-handling/customError";
import {
  allowedGenres,
  validateMovie,
  validateSkip,
} from "../utils/validators";

/* Retrieve a slice of movies from the database based on filters and sends 
it to the client, along with the total amount of movies that match the filters. */
export const getMovies = tryCatch(async (req: Request, res: Response) => {
  const genre = req.query.genre?.toString();
  if (genre && !allowedGenres.includes(genre))
    throw new CustomError("Invalid genre", 400);

  const skip = validateSkip(req.query.skip);

  const title = req.query.title?.toString();

  const totalAmountOfMovies = await prisma.movie.count({
    where: {
      AND: [
        genre ? { genre } : {},
        title ? { title: { contains: title, mode: "insensitive" } } : {},
      ],
    },
  });

  if (totalAmountOfMovies === 0) return res.sendStatus(204);

  const oneSliceOfMoviesRaw = await prisma.movie.findMany({
    where: {
      AND: [
        genre ? { genre } : {},
        title ? { title: { contains: title, mode: "insensitive" } } : {},
      ],
    },
    skip,
    take: 18,
  });

  const oneSliceOfMovies = oneSliceOfMoviesRaw.map((movie) => {
    const base64Image = movie.image.toString("base64");
    return { ...movie, image: base64Image };
  });

  res.status(200).json({ oneSliceOfMovies, totalAmountOfMovies });
});

/* Create a new movie in the database based on the request body, including 
the movie image in binary format. */
export const createMovie = tryCatch(async (req: Request, res: Response) => {
  const { title, url, description, genre }: CreateUpdateMovieRequestBody =
    req.body;
  const image = req.file?.buffer;

  if (!title || !url || !genre || !description || !image)
    throw new CustomError("All fields are required", 400);

  validateMovie({ title, url, genre, description });

  const alreadyExistingMovie = await prisma.movie.findUnique({
    where: { title },
  });

  if (alreadyExistingMovie)
    throw new CustomError(
      `There is a movie with the title "${title}" already.`,
      409
    );

  await prisma.movie.create({
    data: {
      title,
      genre,
      description,
      image,
      url,
    },
  });

  res.sendStatus(201);
});

/* Update an existing movie in the database based on the request body, including 
the movie image in binary format.  */
export const updateMovie = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) throw new CustomError("Invalid movie ID", 400);

  const { title, url, genre, description }: CreateUpdateMovieRequestBody =
    req.body;
  const image = req.file?.buffer;

  if (!title && !url && !genre && !description && !image)
    throw new CustomError("No changes to be made", 400);

  validateMovie({ title, url, genre, description });

  const updatedMovie = await prisma.movie.update({
    where: {
      id,
    },
    data: {
      title,
      url,
      genre,
      description,
      image,
    },
  });
  const base64Image = updatedMovie.image.toString("base64");

  res.status(200).json({ ...updatedMovie, image: base64Image });
});

/* Retrieve a movie by ID from the database and send it to the client, 
including the movie image in string format. */
export const getMovieById = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) throw new CustomError("Invalid movie ID", 400);

  const movieFound = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movieFound) return res.sendStatus(204);

  const base64Image = movieFound.image.toString("base64");

  res.status(200).json({ ...movieFound, image: base64Image });
});

export const deleteMovie = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) throw new CustomError("Invalid movie ID", 400);

  await prisma.movie.delete({
    where: {
      id,
    },
  });

  res.sendStatus(204);
});
