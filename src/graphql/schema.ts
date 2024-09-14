import { GraphQLSchema } from "graphql";
import { RootQuery } from "./resolvers/Query";
import { Mutation } from "./resolvers/Mutation";

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
