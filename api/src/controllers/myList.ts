import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import tryCatch from "../error-handling/tryCatch";
import { validateSkip } from "../utils/validators";
import CustomError from "../error-handling/customError";

export const getMyList = tryCatch(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const skip = validateSkip(req.query.skip);

  const title = req.query.title?.toString();

  const totalAmountOfMovies = await prisma.myList.count({
    where: {
      AND: [
        { userId },
        title ? { movieTitle: { contains: title, mode: "insensitive" } } : {},
      ],
    },
  });

  if (totalAmountOfMovies === 0) return res.sendStatus(204);

  const oneSliceOfMoviesRaw = (
    await prisma.myList.findMany({
      where: {
        AND: [
          { userId },
          title ? { movieTitle: { contains: title, mode: "insensitive" } } : {},
        ],
      },
      include: { movie: true },
      skip,
      take: 18,
    })
  ).map(({ movie }) => movie);

  const oneSliceOfMovies = oneSliceOfMoviesRaw.map((movie) => {
    const base64Image = movie.image.toString("base64");
    return { ...movie, image: base64Image };
  });

  res.status(200).json({ oneSliceOfMovies, totalAmountOfMovies });
});

export const getMyListIds = tryCatch(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const moviesIdsFound = (
    await prisma.myList.findMany({
      where: { userId },
      include: { movie: { select: { id: true } } },
    })
  ).map(({ movie }) => movie.id);

  if (moviesIdsFound.length === 0) return res.sendStatus(204);

  res.status(200).json({ moviesIdsFound });
});

export const addToMyList = tryCatch(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const movieId = req.body.movieId;

  if (!userId) throw new CustomError("User ID required", 400);
  if (!movieId) throw new CustomError("Movie ID required", 400);

  const movieFound = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  movieFound &&
    (await prisma.myList.create({
      data: {
        movieId,
        userId,
        movieTitle: movieFound.title,
      },
    }));

  res.sendStatus(201);
});

export const deleteFromMyList = tryCatch(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const movieId = Number(req.params.movieId);

    if (!userId) throw new CustomError("User ID required", 400);
    if (!movieId) throw new CustomError("Movie ID required", 400);

    await prisma.myList.deleteMany({
      where: { userId, movieId },
    });

    res.sendStatus(204);
  }
);
