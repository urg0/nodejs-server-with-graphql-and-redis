import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLFloat,
} from "graphql";
import GraphQLJSON from "graphql-type-json";

import { UserType } from "../types/UserType";
import { PrismaClient } from "@prisma/client";
import redisClient from "../../config/redis";

const prisma = new PrismaClient();

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        isAdmin: { type: GraphQLBoolean },
        preferences: { type: GraphQLJSON },
        posts: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, args) {
        const { name, email, isAdmin, preferences, posts } = args;

        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            isAdmin,
            preferences,
            posts,
          },
        });
        await redisClient.del("users");

        return newUser;
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        isAdmin: { type: GraphQLBoolean },
        preferences: { type: GraphQLJSON },
        posts: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, args) {
        const { id, name, email, isAdmin, preferences, posts } = args;

        const updatedUser = await prisma.user.update({
          where: { id },
          data: {
            name,
            email,
            isAdmin,
            preferences,
            posts,
          },
        });
        await redisClient.del("users");

        return updatedUser;
      },
    },
  },
});
