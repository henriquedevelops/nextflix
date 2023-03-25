import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const getAllMovies = async (req: Request, res: Response) => {
  const { genre } = req.query;
  let movies;

  if (genre) {
    movies = await prisma.movie.findMany({
      where: {
        genre: {
          equals: genre.toString(),
        },
      },
    });
  } else {
    movies = await prisma.movie.findMany();
  }

  res.json(movies);
};
