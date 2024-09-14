import { GraphQLObjectType, GraphQLList } from "graphql";

import { PrismaClient } from "@prisma/client";
import { UserType } from "../types/UserType";

const prisma = new PrismaClient();

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        return await prisma.user.findMany();
      },
    },
  },
});
