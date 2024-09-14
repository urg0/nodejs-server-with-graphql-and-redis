import { graphqlHTTP } from "express-graphql";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { schema } from "./graphql/schema";
import logger from "./config/logger";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});
