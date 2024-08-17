const express = require("express");
const { ApolloServer } = require("@apollo/server");
const bodyParser = require("body-parser");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const { default: axios } = require("axios");

const { USERS } = require("./Users");
const { TODOS } = require("./ToDo");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type User {
            id: ID!,
            name: String!,
            username: String!
            email: String!
        }
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
								user: User
            }

            type Query {
                getToDos: [Todo]
								getAllUsers: [User]
								getUser(id: ID!): User
            }
        `,
    resolvers: {
      Todo: {
        user: (todo) => USERS.find((e) => e.id === todo.id),
      },
      Query: {
        getToDos: () => TODOS,
        getAllUsers: () => USERS,
        getUser: async (parent, { id }) => USERS.find((e) => e.id === id),
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => console.log("Server started at PORT 8000"));
}

startServer();
