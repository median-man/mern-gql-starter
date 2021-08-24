const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    createUser(email: String!, password: String!, username: String!): User
    login(email: String!, password: String!): User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
  }
`;

module.exports = typeDefs;
