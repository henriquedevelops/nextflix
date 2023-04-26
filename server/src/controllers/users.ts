import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import tryCatch from "../error-handling/tryCatch";
import { hash, compare } from "bcrypt";
import CustomError from "../error-handling/customError";
import { CreateUserRequestBody } from "../utils/types";

/* Create a new user by extracting username and password from the request body, 
hash the password, and save the user to the database with the hashed password. */
export const createUser = tryCatch(async (req: Request, res: Response) => {
  const { username, password }: CreateUserRequestBody = req.body;

  if (!username || username.length < 4)
    throw new CustomError("Username must be at least 4 characters.", 400);
  if (!password || password.length < 8)
    throw new CustomError("Password must be at least 8 characters", 400);

  const alreadyExistingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (alreadyExistingUser) throw new CustomError("Username unavailable.", 409);

  const hashedPassword = await hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  res.sendStatus(200);
});

export const deleteUser = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) throw new CustomError("A user id is required", 400);

  await prisma.user.delete({
    where: {
      id,
    },
  });
  res.sendStatus(204);
});
