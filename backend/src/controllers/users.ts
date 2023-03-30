import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import tryCatch from "../error-handling/tryCatch";
import { hash, compare } from "bcrypt";
import { signToken } from "../auth/jwtToken";
import CustomError from "../error-handling/customError";

export const login = tryCatch(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) throw new CustomError("Invalid email address.", 401);

  const passwordIsCorrect = await compare(password, user.password);
  if (!passwordIsCorrect) throw new CustomError("Wrong password.", 401);
  const { password: _, ...loggedUser } = user;

  const accessToken = signToken(user);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
  });

  res.status(200).json({ loggedUser });
});

export const createUser = tryCatch(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const emailIsValid =
    email && /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

  if (!emailIsValid) throw new CustomError("Invalid email address.", 401);
  if (password.length < 8)
    throw new CustomError("Password must have at least 8 characters.", 401);

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
  req.user = newUser;

  res.status(200).json({ newUser });
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
