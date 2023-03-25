import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import {
  BadRequestError,
  NotFoundError,
} from "../error-handling/appErrorClass";
import tryCatch from "../error-handling/tryCatch";

export const getMovies = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { selectedGenre } = req.query;

    let moviesResponse;

    if (selectedGenre) {
      moviesResponse = await prisma.movie.findMany({
        where: {
          genre: {
            equals: selectedGenre.toString(),
          },
        },
      });
    } else {
      moviesResponse = await prisma.movie.findMany();
    }

    res.json(moviesResponse);
  }
);

export const createMovie = tryCatch(async (req: Request, res: Response) => {
  const { title, genre, description } = req.body;

  const newMovie = await prisma.movie.create({
    data: {
      title,
      genre,
      description,
    },
  });

  res.status(201).json(newMovie);
});

export const getMovieById = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const requestedMovie = await prisma.movie.findUnique({
      where: { id },
    });

    res.json(requestedMovie);
  }
);

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

  res.json(updatedMovie);
});

export const deleteMovie = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.movie.delete({
    where: {
      id,
    },
  });
  res.sendStatus(204);
});
