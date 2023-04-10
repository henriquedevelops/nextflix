import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import tryCatch from "../error-handling/tryCatch";

export const getMyList = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const moviesFound = await prisma.movieFromUserList.findMany({
      where: { userId },
      include: { movie: true },
    });

    res.status(201).json(moviesFound);
  }
);

export const addToMyList = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const movieId = req.params.movieId;

    const movieFound = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    movieFound &&
      (await prisma.movieFromUserList.create({
        data: {
          movieId,
          userId,
          movieTitle: movieFound.title,
        },
      }));

    res.sendStatus(201);
  }
);

export const deleteFromMyList = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const movieId = req.params.movieId;

    await prisma.movieFromUserList.deleteMany({
      where: { userId, movieId },
    });

    res.sendStatus(204);
  }
);
