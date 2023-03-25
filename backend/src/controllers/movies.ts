import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const getAllMovies = async (req: Request, res: Response) => {
  const { selectedGenre, page = 1, pageSize = 10 } = req.query;

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
};

export const createMovie = async (req: Request, res: Response) => {
  const { title, genre, description } = req.body;

  try {
    const newMovie = await prisma.movie.create({
      data: {
        title,
        genre,
        description,
      },
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create movie." });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
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
};
