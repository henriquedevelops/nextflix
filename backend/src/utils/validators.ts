import CustomError from "../error-handling/customError";
import { validateMovieArgument } from "./types";

export const allowedGenres = [
  "Action",
  "Comedy",
  "Documentary",
  "Science-fiction",
  "Horror",
  "Drama",
];

export const validateMovie = ({
  title,
  url,
  genre,
  description,
  file,
}: validateMovieArgument) => {
  if (title && title.length > 35)
    throw new CustomError("Title must be 35 characters max", 400);

  if (genre && !allowedGenres.includes(genre))
    throw new CustomError("Invalid genre", 400);

  if (url && !url.startsWith("https://"))
    throw new CustomError("Invalid URL", 400);

  if (description && description.length > 450)
    throw new CustomError("Description must be 450 characters max", 400);

  if (file && file.size > 1024 * 1024)
    throw new CustomError("Image must be 1 MB max", 400);
};

export const validateSkip = (skipValue: any): number => {
  if (!skipValue) {
    return 0;
  }

  const validSkip = parseInt(skipValue.toString());

  if (isNaN(validSkip) || validSkip < 0)
    throw new CustomError("Invalid skip value", 400);

  return validSkip;
};
