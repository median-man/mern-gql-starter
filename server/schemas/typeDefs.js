const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    createUser(email: String!, password: String!, username: String!): User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
  }

  """
  Describes data required for authenticating a user.
  """
  type AuthData {
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
