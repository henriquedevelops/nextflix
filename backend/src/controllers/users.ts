import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import tryCatch from "../error-handling/tryCatch";
import { hash } from "bcrypt";
import { sendToken } from "../auth/jwtToken";

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

  sendToken(newUser, 201, res);
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
