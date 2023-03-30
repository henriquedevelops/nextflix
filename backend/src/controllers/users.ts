import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import tryCatch from "../error-handling/tryCatch";
import { hash, compare } from "bcrypt";
import { signToken } from "../auth/jwtToken";

export const login = tryCatch(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const passwordMatches = await compare(password, user.password);

  if (!passwordMatches) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const accessToken = signToken(user);

  const { password: _, ...loggedUser } = user;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
  });

  res.status(200).json({ loggedUser });
});

export const createUser = tryCatch(async (req: Request, res: Response) => {
  const { email, password } = req.body;
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

  /*   const token = signToken(newUser); */
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
