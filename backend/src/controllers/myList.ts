import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import tryCatch from "../error-handling/tryCatch";

export const getMyList = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const skip = req.query.skip
      ? parseInt(req.query.skip?.toString())
      : undefined;

    const moviesFound = (
      await prisma.movieFromUserList.findMany({
        where: { userId },
        include: { movie: true },
        skip,
        take: 18,
      })
    ).map(({ movie }) => movie);

    const amountOfMoviesFound = await prisma.movieFromUserList.count({
      where: { userId },
    });

    res.status(201).json({ moviesFound, amountOfMoviesFound });
  }
);

export const getMyListIds = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const moviesIdsFound = (
      await prisma.movieFromUserList.findMany({
        where: { userId },
        include: { movie: { select: { id: true } } },
      })
    ).map(({ movie }) => movie.id);

    res.status(201).json({ moviesIdsFound });
  }
);

export const addToMyList = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const movieId = req.body.movieId;

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
