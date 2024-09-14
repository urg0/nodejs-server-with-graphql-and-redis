import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";
import GraphQLJSON from "graphql-type-json";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    preferences: { type: GraphQLJSON },
    createdAt: { type: GraphQLString },
    posts: { type: new GraphQLList(GraphQLString) },
  }),
});
