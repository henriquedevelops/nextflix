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

export const getMovies = tryCatch(async (req: Request, res: Response) => {
  const genre = req.query.genre?.toString();
  if (genre && !allowedGenres.includes(genre))
    throw new CustomError("Invalid genre", 400);

  const skip = validateSkip(req.query.skip);

  const title = req.query.title?.toString();

  const oneSliceOfMovies = await prisma.movie.findMany({
    where: {
      AND: [
        genre ? { genre } : {},
        title ? { title: { contains: title, mode: "insensitive" } } : {},
      ],
    },
    skip,
    take: 18,
  });

  if (oneSliceOfMovies.length === 0) res.sendStatus(204);

  const totalAmountOfMovies = await prisma.movie.count({
    where: {
      AND: [
        genre ? { genre } : {},
        title ? { title: { contains: title, mode: "insensitive" } } : {},
      ],
    },
  });

  res.status(200).json({ oneSliceOfMovies, totalAmountOfMovies });
});

export const createMovie = tryCatch(async (req: Request, res: Response) => {
  const { title, url, description, genre }: CreateUpdateMovieRequestBody =
    req.body;
  const file = req.file;

  if (!title || !url || !genre || !description || !file)
    throw new CustomError("All fields are required", 400);

  validateMovie({ title, url, genre, description, file });

  await prisma.movie.create({
    data: {
      title,
      genre,
      description,
      image: file.path,
      url,
    },
  });

  res.sendStatus(201);
});

export const updateMovie = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) throw new CustomError("A movie id is required", 400);

  const { title, url, genre, description }: CreateUpdateMovieRequestBody =
    req.body;
  const file = req.file;

  if (!title && !url && !genre && !description && !file)
    throw new CustomError("No changes to be made", 400);

  validateMovie({ title, url, genre, description, file });

  const updatedMovie = await prisma.movie.update({
    where: {
      id,
    },
    data: {
      title,
      url,
      genre,
      description,
      image: file?.path,
    },
  });

  res.status(200).json(updatedMovie.title);
});

export const getMovieById = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) throw new CustomError("A movie id is required", 400);

  const movieFound = await prisma.movie.findUnique({
    where: { id },
  });

  res.status(200).json(movieFound);
});

export const deleteMovie = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) throw new CustomError("A movie id is required", 400);

  await prisma.movie.delete({
    where: {
      id,
    },
  });

  res.sendStatus(204);
});
