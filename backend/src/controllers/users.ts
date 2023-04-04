import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import tryCatch from "../error-handling/tryCatch";
import { hash, compare } from "bcrypt";
import CustomError from "../error-handling/customError";

export const createUser = tryCatch(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const emailIsValid =
    email && /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

  if (!emailIsValid) throw new CustomError("Invalid email address.", 400);
  if (password.length < 8)
    throw new CustomError("Password must have at least 8 characters.", 400);

  const hashedPassword = await hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
    },
  });

  res.sendStatus(200);
});

export const deleteUser = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {
      id,
    },
  });
  res.sendStatus(204);
});
