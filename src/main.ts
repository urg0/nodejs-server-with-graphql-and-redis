import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "./config/logger";
import { getOrSetCache } from "./middlewares/cache";

dotenv.config();

const port = process.env.PORT;
const prisma = new PrismaClient();

const app = express();
app.use(cors());

type User = {
  id: number;
  name: string;
  email: string;
};

app.get("/test-db", async (req, res) => {
  try {
    const users = await getOrSetCache<User[]>("users", () => {
      return prisma.user.findMany();
    });

    res.json(users);
  } catch (err) {
    logger.error(`Error connecting to database: ${err}`);
    res.status(500).send("Error connecting to database");
  }
});

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});
