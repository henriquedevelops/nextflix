import mockData from "./mock-data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const importMockData = async () => {
  for (const movie of mockData) {
    await prisma.movie.create({
      data: {
        title: movie.title,
        description: movie.description,
        genre: movie.genre,
      },
    });
  }
  console.log("Data successfully imported! ✔");
};

const deleteData = async () => {
  try {
    await prisma.movie.deleteMany();
    console.log("Data successfully deleted! ✔");
  } catch (err) {
    console.log(err);
  }
  await prisma.$disconnect();
};

if (process.argv[2] === "--import") {
  importMockData()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

if (process.argv[2] === "--delete") {
  deleteData()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
